from fastapi import FastAPI, HTTPException
from ItineraryHelper import ItineraryHelper, Itinerary

SpotChaseApp = FastAPI()
ItinServer = ItineraryHelper()

@SpotChaseApp.get("/")
def read_root():
    return {"message": "Welcome to SpotChaseApp!"}

@SpotChaseApp.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@SpotChaseApp.post("/itin/add")
def add_itin(itin : Itinerary):
    ItinServer.uploadItinerary(itin)
    return 200

@SpotChaseApp.get("/itin/get/{itin_id}")
def get_itin(itin_id: str):
    itin = ItinServer.getItinerary(itin_id)
    if (itin != None):
        return itin
    else:
        raise HTTPException(status_code=404, detail="Item not found")

