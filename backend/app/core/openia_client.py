from openai import OpenAI
import os
from app.core.config import settings

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY não encontrada no ambiente!")

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_text(prompt: str, model: str = "gpt-5-nano") -> str:
    response = client.responses.create(
        model=model,
        input=prompt,
        store=True,
    )
    return response.output_text
