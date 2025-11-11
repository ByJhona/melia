import imaplib
import email
import smtplib
from email.message import EmailMessage
from app.services.email_service import process_text_with_ai
from app.core.config import settings

def extract_body(msg):
    """Extrai o corpo de texto do e-mail, ignorando None"""
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                payload = part.get_payload(decode=True)
                if payload:
                    body += payload.decode(errors="ignore")
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            body = payload.decode(errors="ignore")
    return body or ""  

def check_inbox():

    mail = imaplib.IMAP4_SSL(settings.IMAP_HOST)
    mail.login(settings.IMAP_USER, settings.IMAP_PASS)
    print("Logado com sucesso!")
    
    mail.select("inbox")
    _, messages = mail.search(None, "(UNSEEN)")
    email_ids = messages[0].split()
    print(f"{len(email_ids)} e-mails não lidos encontrados.")
    
    new_emails = []

    for e_id in email_ids:
        _, msg_data = mail.fetch(e_id, "(RFC822)")
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                subject = msg.get("subject", "(sem assunto)")
                from_email = msg.get("from", "")
                body = extract_body(msg)
                print(f"Extraído e-mail de {from_email} com assunto: {subject}")
                new_emails.append({"from": from_email, "subject": subject, "body": body})

    mail.logout()
    print("Desconectado do IMAP.")
    return new_emails

def send_email(to_email: str, subject: str, body: str):
    """Envia e-mail via SMTP"""
    print(f"Enviando e-mail para {to_email} com assunto: {subject}")
    msg = EmailMessage()
    msg["From"] = settings.SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.send_message(msg)
    print(f"E-mail enviado para {to_email}!")

def process_new_emails():
    """Processa e-mails, analisa e envia respostas se forem produtivos"""
    emails = check_inbox()
    if not emails:
        print("Nenhum e-mail novo para processar.")
        return

    for mail_item in emails:
        print(f"Analisando e-mail de {mail_item['from']}...")
        analysis = process_text_with_ai(mail_item["body"])
        print(f"Categoria identificada: {analysis.category}")
        if analysis.category == "Produtivo":
            send_email(
                mail_item["from"],
                f"Re: {mail_item['subject']}",
                analysis.response
            )
        else:
            print("E-mail classificado como improdutivo, sem resposta enviada.")
