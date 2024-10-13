import datetime
from fastapi import FastAPI
from pydantic import BaseModel
import sqlalchemy
from google.cloud.sql.connector import Connector, IPTypes
from sqlalchemy import Column, Date, Integer, LargeBinary, MetaData, String, Table, create_engine
from sqlalchemy import insert, select
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

# Basic Itinerary Class for testing
class Itinerary(BaseModel):
    image: str                | None = None
    id: str                         
    name: str                 | None = None
    start_date: datetime.date | None = None
    end_date: datetime.date   | None = None
    holiday_type: str         | None = None
    location: str             | None = None
    accom: str                | None = None
    transport: str            | None = None
    rating: int           | None = None
    
class ItineraryHelper():
    itins  = {} 

    url = URL.create(
    drivername="postgresql",
    username="postgres",
    host="34.134.154.18",
    database="itinerary",
    password="0Ea/Cs+qm=BxYBjb"
    )

    engine = create_engine(url)
    metadata = MetaData()
    conn = engine.connect()
    itin_table = None
    if sqlalchemy.inspect(engine).has_table("itinerary") == False:
        print("Creating Itinerary Table")
        itin = Table('itinerary', metadata,
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
        itin_table = itin
        metadata.create_all(engine)
        print("Created Table")
    else:
        print("Found Itinerary Table")
        itin_table = sqlalchemy.Table("itinerary", metadata, autoload_with=engine)


    def uploadItinerary(self, itin: Itinerary):
        stmt = insert(self.itin_table).values(
            image = itin.image,
            id = itin.id ,
            name = itin.name, 
            start_date = itin.start_date,
            end_date = itin.end_date,
            holiday_type = itin.holiday_type,
            location = itin.location,
            accom = itin.accom,
            transport = itin.transport,
            rating = itin.rating)
        print(stmt)
        with self.engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()
        
    def getItinerary(self, itinId: str) -> Itinerary:
        stmt = select(self.itin_table).where(self.itin_table.c.id == itinId)
        with self.engine.connect() as conn:
            result = conn.execute(stmt)
            for row in result:
                i_dict = row._mapping
                return Itinerary(image = i_dict['image'],
                          id = i_dict['id'],
                          name = i_dict['name'],
                          start_date = i_dict['start_date'],
                          end_date = i_dict['end_date'],
                          holiday_type = i_dict['holiday_type'],
                          location = i_dict['location'],
                          accom = i_dict['accom'],
                          transport = i_dict['transport'],
                          rating = i_dict['rating'])

        return None
