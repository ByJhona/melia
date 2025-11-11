import json
from io import BytesIO
from fastapi import UploadFile
import PyPDF2
from .text_processing import clean_text
from app.core.openia_client import generate_text
from app.models.text_model import TextAnalysisResponse

def process_text_with_ai(text: str) -> TextAnalysisResponse:
    cleaned = clean_text(text)

    # Prompt avançado
    prompt = f"""
    Você é a Mél.IA, uma assistente virtual para automatizar o processamento
    de emails de uma grande empresa financeira.

    Contexto:
    - Emails podem ser: solicitações de suporte, atualizações de casos, 
      compartilhamento de arquivos ou mensagens improdutivas (felicitações, agradecimentos, perguntas irrelevantes).
    - Objetivo: classificar cada email em **Produtivo** ou **Improdutivo**.
    - Emails Produtivos: requerem ação ou resposta.
    - Emails Improdutivos: não requerem ação.

    Regras:
    1. Retorne **SOMENTE JSON válido**:
       {{
         "category": "...",
         "response": "..."
       }}
    2. category deve ser "Produtivo" ou "Improdutivo".
    3. response deve ser um texto claro, educado e profissional, adequado ao email.
    4. Não inclua explicações extras fora do JSON.

    Exemplos de Emails e Respostas:

    Email: "Olá, estou com um problema no sistema desde ontem, preciso de ajuda urgente."
    Output: {{
        "category": "Produtivo",
        "response": "Olá! Recebemos seu pedido de suporte e já estamos verificando. Retornaremos em breve com uma solução."
    }}

    Email: "Feliz Natal! Que vocês tenham ótimas festas!"
    Output: {{
        "category": "Improdutivo",
        "response": "Olá! Agradecemos sua mensagem e desejamos ótimas festas também!"
    }}

    Email a analisar:
    {cleaned}
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
        filename=None,
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

    return process_text_with_ai(text)
