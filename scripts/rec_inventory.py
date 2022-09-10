import requests
from pymongo import MongoClient
from time import sleep

start = 0
SIZE = 100
total = 10000
DATABASE_NAME = "nature"

client = MongoClient('mongodb://localhost:27017/')
outings_collection = client.outings

REC_SEARCH_URL = f"https://www.recreation.gov/api/search?exact=false&size={SIZE}&start={start}"
# REC_SEARCH_URL = "https://randomfox.ca/floof/"
print(REC_SEARCH_URL)

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-IN,en;q=0.9",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
}

while start < total:
    resp = requests.get(REC_SEARCH_URL, headers, allow_redirects=False)
    print(resp.content)
    data = resp.json()

    for outing in data["results"]:
        outings_collection.insert_one(outing).inserted_id
    start = start + SIZE
    total = resp.total
    sleep(5)

print("All done")
