from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient as MongoClient
# import json
from dotenv import load_dotenv
load_dotenv()
import os
from urllib.parse import unquote
import math

app = FastAPI()

uri = os.getenv("MONGODB_ATLAS_URI")
client = None
db = None
collection = None
unique_res_data = set()
total_count_located = 0

#set cors policy to allow frontend to access the data
app.add_middleware(
    CORSMiddleware,
    allow_origins=[f'{os.getenv("FRONTEND_URL")}'],  # Adjust based on frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers, including "Content-Type"
)

# Connect to the database when the application starts up and create indexes
@app.on_event("startup")
async def startup():
    global client
    global db, collection
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["ZomatoData"]
    collection = db["CompleteRestaurantData"]
    
    # Script to create geojson object and 2dsphere index on location field
#     collection.update_many(
#     {},
#     [
#         {
#             "$set": {
#                 "location_query": {
#                     "type": "Point",
#                     "coordinates": [
#                         {"$toDouble": "$restaurant.location.longitude"},
#                         {"$toDouble": "$restaurant.location.latitude"}
#                     ]
#                 }
#             }
#         }
#     ]
# )

    # collection.update_many({}, {"$unset": {"location_query" : 1}})
    
    # indexes = await collection.index_information()
    # print(indexes)
    # collection.drop_index("Location_2dsphere")
    # if("restaurant.location_2dsphere" not in indexes):
    # collection.create_index([("location_query", "2dsphere")])

# Close the connection to the database when the application is shutdown
@app.on_event("shutdown")
async def shutdown():
    global client
    if client:
        client.close()

@app.get("/")
def read_root():
    return {"Welcome Zomato Restaurant Data": "API"}

# Use this endpoint to get restaurant data by restaurant id
@app.get("/api/restaurant/{restaurant_id}")
async def read_restaurant_data(restaurant_id: int):
    try:
        id = str(restaurant_id)
        restaurant_data = await collection.find_one({"restaurant.id": id}, {"_id": 0}) 
        if restaurant_data: return {"restaurantData": restaurant_data}
        else: return {"error": "Restaurant not found"}
    except Exception as e:
        return {"error": str(e)}

# Use this endpoint to get restaurant data by restaurant name
@app.get("/api/restaurant/name/{restaurant_name}")
async def read_restaurant_data(restaurant_name: str):
    try:
        restaurant_name = (restaurant_name.strip())
        res_name = unquote(restaurant_name)
        restaurant_data = await collection.find({"restaurant.name": {"$regex": res_name, "$options": "i"}}, {"_id": 0}).to_list(None)
        res_data = list({r["restaurant"]["id"]: r for r in restaurant_data}.values())
        if len(res_data) > 0 : return {"restaurantData": res_data}
        else: return {"error": "Restaurant not found"}
    except Exception as e:
        return {"error": str(e)}

# Use this endpoint to get all the restaurants data
@app.get("/api/restaurants")
async def read_restaurants_data(
    limit: int = Query(10, description="limit for restuarants count"), 
    page: int = Query(1, description="page number to fetch data")
):
    try:
        skip = max((page - 1) * limit, 0)
        restaurants_data = await collection.find({},{"_id":0}).skip(skip).limit(limit).to_list(limit)
        # data = await json.dumps(restaurants_data, default=str)
        return {"page": page, "totalRestaurants": await collection.count_documents({}), "restaurantData": restaurants_data}
    except Exception as e:
        return {"error": str(e)}

# Use this endpoint to get restaurant data by location
@app.get("/api/restaurants/location")
async def read_restaurants_data_using_location(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    page: int = Query(1, description="page number to fetch data")
):
    global unique_res_data, total_count_located
    count = 0
    restaurant_data = []
    try:
        if page == 1:
            restaurants_data = await collection.find(
            {
                "location_query": {
                    "$near": {
                        "$geometry": {
                            "type": "Point",
                            "coordinates": [longitude, latitude]
                        },
                        "$maxDistance": 3000,  # Maximum distance in meters
                    }
                }
            },
            {"_id": 0}
            ).to_list(None)
            normal_res_data = {str(r["restaurant"]["id"]): 1 for r in restaurants_data}
            count = len(normal_res_data)
            total_count_located = math.ceil(count/10)
            restaurant_data = restaurants_data[0:10]
            print("Total count located", total_count_located, "Total count", count)
        else:
            skip = max((page - 1) * 10, 0)
            restaurants_data = await collection.find(
            {
                "location_query": {
                    "$near": {
                        "$geometry": {
                            "type": "Point",
                            "coordinates": [longitude, latitude]
                        },
                        "$maxDistance": 3000,  # Maximum distance in meters
                    }
                }
            },
            {"_id": 0}
            ).skip(skip).limit(10).to_list(10)
            count = None
            restaurant_data = restaurants_data
        
        res_data = []
        for r in restaurant_data:
            if r["restaurant"]["id"] not in unique_res_data:
                res_data.append(r)
                unique_res_data.add(r["restaurant"]["id"]) 
        
        if page == total_count_located: 
            unique_res_data = {} 
            total_count_located = 0
            
        if len(res_data) > 0 : return {"restaurantData": res_data, "totalRestaurants": count}
        else: return {"message": "Restaurant not found"}
    except Exception as e:
        return {"error": str(e)}