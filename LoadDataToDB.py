#import required libraries
import kagglehub
from pymongo.mongo_client import MongoClient
import pandas as pd


try:
    # download the dataset from kaggle    
    path = kagglehub.dataset_download("shrutimehta/zomato-restaurants-data")
    print("Path to dataset files:", path)
    
    # Connect to MongoDB and select the database and collection
    uri = "mongodb+srv://dsakethsurya:saketh1234@merncluster.c3k9g.mongodb.net/?w=majority&appName=MernCluster"
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["ZomatoData"]
    collection = db["RestaurantData"]
    
    # read the data from csv file and insert into MongoDB
    data = f"{path}/zomato.csv"
    records = pd.read_csv(data, encoding="ISO-8859-1", on_bad_lines='skip').to_dict("records")
    collection.insert_many(records)
    
    print("Data loaded successfully to MongoDB")
    
except Exception as e:
    # print the error message
    print("Error:", e)
