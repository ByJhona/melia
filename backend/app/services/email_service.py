import json
from io import BytesIO
from fastapi import UploadFile
import PyPDF2
from .text_processing import clean_text
from app.core.openia_client import generate_text
from app.models.text_model import TextAnalysisResponse

def process_text_with_ai(text: str, filename:str = None) -> TextAnalysisResponse:
    cleaned = clean_text(text)

    prompt = f"""
        Você é Mel.ia, uma assistente virtual simpática, natural e profissional.  
        Seu papel é analisar o conteúdo de um email e responder conforme as instruções abaixo.

        **Tarefas:**
        1. Classifique o email em uma das categorias:
        - "Produtivo" → requer ação ou resposta (ex.: dúvidas, solicitações, atualizações de casos, pedidos de ajuda);
        - "Improdutivo" → não requer ação imediata (ex.: agradecimentos, felicitações, mensagens genéricas).
        2. Sugira uma resposta curta e educada, coerente com o tom do email e sua categoria.

        **Formato de saída (JSON obrigatório):**
        {{
        "category": "<Produtivo ou Improdutivo>",
        "response": "<mensagem de resposta gerada pela Mel.ia>"
        }}

        **Exemplo:**
        Email: "Oi Mel.ia, poderia me ajudar com um erro que apareceu no sistema?"
        Saída:
        {{
        "category": "Produtivo",
        "response": "Claro! Poderia me contar qual erro está aparecendo para que eu possa te ajudar?"
        }}

        Agora analise o seguinte texto do email:
        \"\"\"{cleaned}\"\"\"
"""


    ai_response = generate_text(prompt)

    try:
        data = json.loads(ai_response)
        category = data.get("category", "Improdutivo")
        response_text = data.get("response", "")
    except json.JSONDecodeError:
        category = "Improdutivo"
        response_text = ai_response

    return TextAnalysisResponse(
        filename=filename,
        original=text,
        cleaned=cleaned,
        category=category,
        response=response_text
    )

async def process_file_with_ai(file: UploadFile) -> TextAnalysisResponse:
    filename = file.filename.lower()
    contents = await file.read()

    if filename.endswith(".txt"):
        text = contents.decode("utf-8", errors="ignore")
    elif filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(BytesIO(contents))
        text = "".join(page.extract_text() or "" for page in reader.pages)
    else:
        raise ValueError("Arquivo deve ser .txt ou .pdf")

    return process_text_with_ai(text, filename)
