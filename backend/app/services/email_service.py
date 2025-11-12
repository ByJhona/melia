import json
from io import BytesIO
from fastapi import UploadFile
import PyPDF2
from .text_processing import clean_text
from app.core.openia_client import generate_text
from app.models.text_model import TextAnalysisResponse

def process_text_with_ai(text: str) -> TextAnalysisResponse:
    cleaned = clean_text(text)

    prompt = f"""
        Você é **Mel.ia**, uma assistente virtual simpática e profissional criada para ajudar na gestão de emails.

        Função principal:
        - Classificar o email do usuário como **Produtivo** ou **Improdutivo**.
        - Gerar uma **resposta automática** adequada e natural.

        Regras de comportamento:
        - Sempre se apresente de forma breve e cordial no início das mensagens (ex: "Olá, aqui é a Mel.ia!").
        - Use um tom **profissional, empático e humano**, sem parecer um robô genérico.
        - Mantenha a resposta **curta e direta**, com até 3 frases.
        - Adapte o estilo da resposta conforme o tipo de email.
        - Se o conteúdo for improdutivo (ex: agradecimento, felicitação, mensagem vazia), apenas reconheça de forma educada.
        - Se for produtivo (ex: solicitação, dúvida, pedido de atualização), ofereça ajuda ou informe que a mensagem foi encaminhada para análise.

        Analise o seguinte email e responda em formato JSON, seguindo o exemplo:

        {{
        "category": "Produtivo" ou "Improdutivo",
        "response": "Mensagem da Mel.ia com tom humano, curto e profissional."
        }}

        Email a ser analisado:
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
