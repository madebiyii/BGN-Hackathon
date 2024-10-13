from fastapi import FastAPI
from pydantic import BaseModel
import sqlalchemy
from google.cloud.sql.connector import Connector, IPTypes
from sqlalchemy import Column, Date, Integer, LargeBinary, MetaData, String, Table, create_engine
from sqlalchemy import MetaData as md
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

# Basic Itinerary Class for testing
class Itinerary(BaseModel):
    imageCode: str | None = None
    itineraryId: str
    activity: str
    
class ItineraryHelper():
    itins  = {} 

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





url = URL.create(
    drivername="postgresql",
    username="postgres",
    host="34.134.154.18",
    database="itinerary",
    password="0Ea/Cs+qm=BxYBjb"
)

engine = create_engine(url)
metadata = md()
conn = engine.connect()

if sqlalchemy.inspect(engine).has_table("itinerary") == False:
    print("Creating Itinerary Table")
    itin = Table('itinerary ', metadata,
                Column('id', String(32), primary_key=True),
                Column('image', LargeBinary(), nullable=True),
                Column('name', String(200), nullable=True),
                Column('start_date', Date(), nullable=True),
                Column('end_date', Date(), nullable=True),
                Column('holiday_type', String(200), nullable=True),
                Column('location', String(200), nullable=True),
                Column('accom', String(200), nullable=True),
                Column('transport', String(200), nullable=True),
                Column('rating', Integer(), nullable=True),
                )
    
    metadata.create_all(engine)
    print("Created Table")
else:
    print("=Table exists=")
