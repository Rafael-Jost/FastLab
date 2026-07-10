import fastapi
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "FastLab!"}

@app.get("/basic")
async def basic():
    return {"message": "OK"}