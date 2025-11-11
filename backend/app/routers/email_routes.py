from fastapi import APIRouter, UploadFile, File, Form
from app.services.email_service import process_text, process_file
from app.models.text_model import TextAnalysisResponse

router = APIRouter(prefix="/api", tags=["emails"])

@router.post("/submit-text", response_model=TextAnalysisResponse)
async def submit_text(email: str = Form(...)):
    result =  process_text(email)
    return result

@router.post("/submit-file", response_model=TextAnalysisResponse)
async def submit_file(file: UploadFile = File(...)):
    
    try:
        result = await process_file(file)
        return result
    except ValueError as e:
        return {"original": "", "cleaned": "", "category": "Neutro", "response": str(e), "filename": None}


