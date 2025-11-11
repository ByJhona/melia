from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import email_routes

app = FastAPI(title="Email Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(email_routes.router)

@app.get("/")
async def root():
    return {"message": "Email Classifier API está rodando 🚀"}
