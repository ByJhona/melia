from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import aiofiles, os


app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/submit-text")
async def submit_text(email: str = Form(...)):
    print("Recebido texto:", email)
    return {"message": "Texto recebido com sucesso!", "content": email}

@app.post("/api/submit-file")
async def submit_file(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"
    print("Arquivo: ", file)
    print("Recebido arquivo:", file.filename)

    contents = await file.read()  
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(contents)

    return {"message": "Arquivo recebido com sucesso!", "filename": file.filename}

