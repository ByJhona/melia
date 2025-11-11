from fastapi import APIRouter, UploadFile, File, Form
from app.services.email_service import process_text_with_ai, process_file_with_ai
from app.models.text_model import TextAnalysisResponse

router = APIRouter(prefix="/api", tags=["emails"])

@router.post("/submit-text", response_model=TextAnalysisResponse)
async def submit_text(email: str = Form(...)):
    return process_text_with_ai(email)

@router.post("/submit-file", response_model=TextAnalysisResponse)
async def submit_file(file: UploadFile = File(...)):
    try:
        return await process_file_with_ai(file)
    except ValueError as e:
        return {
            "original": "",
            "cleaned": "",
            "category": "Improdutivo",
            "response": str(e),
            "filename": None
        }
