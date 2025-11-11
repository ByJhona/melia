from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from app.routers import email_routes
from app.core.email_monitor import process_new_emails  
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan handler para iniciar o agendador quando a aplicação sobe.
    """
    async def scheduler():
        while True:
            try:
                print("Verificando novos e-mails...")
                process_new_emails() 
            except Exception as e:
                print("Erro ao processar e-mails:", e)
            await asyncio.sleep(settings.EMAIL_CHECK_INTERVAL)
    task = asyncio.create_task(scheduler())
    yield
    task.cancel()  

app = FastAPI(
    title="Email Classifier API",
    lifespan=lifespan
)

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
    return {"message": "Mel.ia Classifier API está rodando 🚀"}

@app.get("/ping")
async def ping():
    return {"status": "alive"}
