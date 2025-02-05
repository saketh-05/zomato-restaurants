from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
import json

# I am using direct URI of my mongodb Atlas cluster to connect to the database 
# Since this is an assignment and I am not worried about security

app = FastAPI()
uri = "mongodb+srv://dsakethsurya:saketh1234@merncluster.c3k9g.mongodb.net/?w=majority&appName=MernCluster"
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
db = client["ZomatoData"]
collection = db["RestaurantData"]

#set cors policy to allow frontend to access the data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust based on frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers, including "Content-Type"
)

@app.get("/")
def read_root():
    return {"Welcome Zomato Restaurant Data": "API"}

# Use this endpoint to get restaurant data by restaurant id
@app.get("/restaurant/{restaurant_id}")
def read_restaurant_data(restaurant_id: int):
    try:
        collection.create_index([("Restaurant ID", 1)])
        restaurant_data = collection.find_one({"Restaurant ID": restaurant_id}, {"_id": 0}) 
        return {"Restaurant Data": restaurant_data}
    except Exception as e:
        return {"error": str(e)}

# Use this endpoint to get restaurant data by restaurant name
@app.get("/restaurant/name/{restaurant_name}")
def read_restaurant_data(restaurant_name: str):
    try:
        restaurant_name = str(restaurant_name.strip())
        collection.create_index([("Restaurant Name", 1)])
        restaurant_data = collection.find_one({"Restaurant Name": {"$regex": f"^{restaurant_name}$", "$options": "i"}}, {"_id": 0}) 
        return {"Restaurant Data": restaurant_data}
    except Exception as e:
        return {"error": str(e)}

# Use this endpoint to get all the restaurants data
@app.get("/restaurants")
def read_restaurants_data(
    limit: int = Query(10, description="limit for restuarants count"), 
    page: int = Query(1, description="page number to fetch data")
):
    try:
        skip = (page - 1) * limit > 0 and (page - 1) * limit or 0
        restaurants_data = list(collection.find({},{"_id":0}).skip(skip).limit(limit))
        data = json.dumps(restaurants_data, default=str)
        return {"Restaurants Data": data,"Total Restaurants": collection.count_documents({})}
    except Exception as e:
        return {"error": str(e)}

# I used this endpoint to update location object in the database
# @app.patch("/update_location")
# def update_location_data():
#     try:
#         collection.update_many({},[
#             {"$set": 
#                 {"Location": 
#                     {"type": "Point", 
#                     "coordinates": 
#                         ["$Longitude", 
#                         "$Latitude"]
#                     }
#                 }
#             }
#         ])  
#         return {"Success": "Location data updated successfully"}
#     except Exception as e:
#         return {"Error": str(e)}

# Use this endpoint to get restaurant data by location
@app.get("/restaurants/location")
async def read_restaurants_data_using_location(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location")
):
    try:
        collection.create_index([('Location', '2dsphere')])
        restaurants_data = collection.find(
        {
            "Location": {
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
        )

        restaurants_data = list(restaurants_data)
        return {"Restaurants Data": restaurants_data, "Total_Rts_in_radius_3km": len(restaurants_data)}
    except Exception as e:
        return {"error": str(e)}
    
# Use this endpoint to get restaurant data by cuisine 
# I have created endpoint but not used it in the UI (Time constraint)
 
# @app.get("/restaurants/cuisine")
# async def read_restaurants_data_using_cuisine(
#     cuisine: str = Query(..., description="Cuisine Name to filter restaurants"), 
#     limit: int = Query(10, description="limit for restuarants count"), 
#     page: int = Query(1, description="page number")
# ):
    
#     try:
#         skip = (page - 1) * limit > 0 and (page - 1) * limit or 0
#         collection.create_index([("Cuisines", 1)])
#         restaurants_data = collection.find({"Cuisines": {"$regex": cuisine, "$options": "i"}},{"_id":0}).skip(skip).limit(limit)
#         restaurants_data = list(restaurants_data)
#         return {"Restaurants Data": restaurants_data,"Total Restaurants": len(restaurants_data)}
#     except Exception as e:
#         return {"Error": str(e)}