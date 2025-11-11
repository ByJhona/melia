import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

    IMAP_HOST: str = os.getenv("IMAP_HOST")
    IMAP_USER: str = os.getenv("IMAP_USER")
    IMAP_PASS: str = os.getenv("IMAP_PASS")

    SMTP_HOST: str = os.getenv("SMTP_HOST")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER: str = os.getenv("SMTP_USER")
    SMTP_PASS: str = os.getenv("SMTP_PASS")

    EMAIL_CHECK_INTERVAL:int = int(os.getenv("EMAIL_CHECK_INTERVAL", 300))
    
settings = Settings()
