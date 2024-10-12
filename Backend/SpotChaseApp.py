from fastapi import FastAPI

SpotChaseApp = FastAPI()

@SpotChaseApp.get("/")
def read_root():
    return {"message": "Welcome to SpotChaseApp!"}

@SpotChaseApp.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
