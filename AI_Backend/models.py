from typing import List
from pydantic import BaseModel


class User(BaseModel):
    budget: str
    start_date: str
    end_date: str
    diet: List[str]

preamble = """You are an expert trip planner.
              I will give you a json-formatted list of a user's preferences (budget, dates, desired activities etc),
              when thinking about diet and prefereces, specify that in the place to eat.
              return a json formatted list of trip itineraries, with the following format:
              Destination, Budget, and tagline for trip,
              List of day objects ( 3 activities per day, estimated cost for the day) - parameter should be an array called day\n
              Ensure the JSON output is a raw array, and not some object, always follow the format."""