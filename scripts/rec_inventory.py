import requests
from pymongo import MongoClient

start = 0
SIZE = 100
total = 10000
DATABASE_NAME = "nature"

client = MongoClient('mongodb://localhost:27017/')
outings_collection = client.outings

REC_SEARCH_URL = f"https://www.recreation.gov/api/search?exact=false&size={SIZE}&start={start}"

while start < total:
    resp = requests.get(REC_SEARCH_URL).json()

    for outing in resp.results:
        outings_collection.insert_one(outing).inserted_id
