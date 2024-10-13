from fastapi import FastAPI, Request
from models import User
import google.generativeai as genai
import os
from models import preamble
genai.configure(api_key="AIzaSyDJ12I8qdTvBf0RDQ4DFl26gjXEZgjs7bY")

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/user_itin")
async def getItineraries(request: Request):
    model = genai.GenerativeModel("gemini-1.5-flash")
    json_prefs = await request.body()

    response = model.generate_content(preamble + json_prefs.decode("utf-8"))
    formatted_resp = response.text.split("```")[1].strip("json").replace('\n', '')
    print(response.text)
    return formatted_resp