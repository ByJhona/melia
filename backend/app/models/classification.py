def classify_email(text: str):
    """
    Função simples (mock) para classificar o email.
    Aqui depois entra a integração com o OpenAI API.
    """
    if any(word in text.lower() for word in ["erro", "suporte", "problema", "atualização"]):
        category = "Produtivo"
        response = "Seu pedido foi recebido e será processado em breve."
    else:
        category = "Improdutivo"
        response = "Agradecemos sua mensagem!"
    return category, response
