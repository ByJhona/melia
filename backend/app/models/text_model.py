# backend/app/models/text_models.py

from pydantic import BaseModel
from enum import Enum
from typing import Optional

class Category(str, Enum):
    produtivo = "Produtivo"
    improdutivo = "Improdutivo"

class TextAnalysisResponse(BaseModel):
    original: str
    cleaned: str
    category: Category
    response: str
    filename: Optional[str] = None 
