from io import BytesIO
from fastapi import UploadFile
import PyPDF2
from ..models.classification import classify_email
from .text_processing import clean_text

UPLOAD_DIR = "uploads"

def process_text(content: str):
    """
    Recebe texto puro, faz NLP e retorna já pronto pra classificação
    """
    cleaned = clean_text(content)
    category, response = classify_email(cleaned)  # stub
    return {
        "original": content,
        "cleaned": cleaned,
        "category": category,
        "response": response
    }

async def process_file(file: UploadFile):
    filename = file.filename.lower()
    contents = await file.read()

    if filename.endswith(".txt"):
        text = contents.decode("utf-8", errors="ignore")
    elif filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(BytesIO(contents))
        text = "".join(page.extract_text() or "" for page in reader.pages)
    else:
        raise ValueError("Arquivo deve ser .txt ou .pdf")

    cleaned = clean_text(text)
    category, response = classify_email(cleaned)
    return {
        "filename": file.filename,
        "original": text,
        "cleaned": cleaned,
        "category": category,
        "response": response
    }
