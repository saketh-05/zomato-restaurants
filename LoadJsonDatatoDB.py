from pymongo.mongo_client import MongoClient
import os
import json
import traceback
from dotenv import load_dotenv
load_dotenv()

try:
    # Connect to MongoDB
    uri = os.getenv("MONGODB_ATLAS_URI")
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["ZomatoData"]
    collection = db["CompleteRestaurantData"]
    print("Connected to MongoDB")

    # Read and insert data from JSON files
    path = "C:/Users/raisi/Downloads/archive"
    for i in range(1, 6):
        jsonData = f"{path}/file{i}.json"
        if not os.path.exists(jsonData):
            print(f"File {jsonData} not found")
            continue

        with open(jsonData) as f:
            data = json.load(f)

        # Ensure data is a list
        if not isinstance(data, list):
            print(f"Warning: {jsonData} does not contain a list at the top level. Skipping.")
            continue

        total_inserted = 0
        for item in data:
            records = item.get("restaurants")  # Use `.get()` to prevent KeyError
            
            if not records:  # If 'restaurants' is missing or empty
                print(f"Warning: No valid records found in {jsonData}. Skipping.")
                continue

            collection.insert_many(records)
            total_inserted += len(records)

        print(f"Inserted {total_inserted} records from {jsonData}")

    print("Data loaded successfully to MongoDB")

    client.close()

except Exception as e:
    print("Error:", e)
    traceback.print_exc()
