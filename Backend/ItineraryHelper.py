from fastapi import FastAPI
from pydantic import BaseModel
 
# Basic Itinerary Class for testing
class Itinerary(BaseModel):
    imageCode: str | None = None
    itineraryId: str
    activity: str
    
class ItineraryHelper():
    itins : Dict[str, Itinerary] = {} 

    # Dummy function to upload an Itinerary to the DB
    def uploadItinerary(self, itin: Itinerary):
        # In reality this should add to a db but whatever

        self.itins[itin.itineraryId]=  itin
        
    def getItinerary(self, itinId: str) -> Itinerary:
        # In Reality this should look up from a db but whatever

        if (itinId in self.itins):
            return self.itins[itinId]
        else:
            return None
