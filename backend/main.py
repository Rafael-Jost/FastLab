import fastapi

app = fastapi.FastAPI()

@app.get("/")
async def root():
    return {"message": "FastLab!"}

@app.get("/basic")
async def basic():
    return {"message": "OK"}