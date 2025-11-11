import re
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import nltk


# Baixa as stopwords
nltk.download('stopwords')

# Baixa o stemmer RSLP
nltk.download('rslp')

STOPWORDS = set(stopwords.words("portuguese"))
STEMMER = SnowballStemmer("portuguese")

import re
import unicodedata
import nltk
from nltk.corpus import stopwords
from nltk.stem import RSLPStemmer

# Baixar stopwords se ainda não tiver
try:
    STOPWORDS = set(stopwords.words("portuguese"))
except LookupError:
    import nltk
    nltk.download("stopwords")
    STOPWORDS = set(stopwords.words("portuguese"))

STEMMER = RSLPStemmer()

def clean_text(text: str) -> str:
    """
    Faz pré-processamento simples do texto:
    - Normaliza acentos
    - Converte para minúsculas
    - Remove URLs, emails e números
    - Remove pontuação
    - Remove stopwords
    - Aplica stemming
    """
    # Normaliza acentos
    text = unicodedata.normalize("NFKD", text).encode("ASCII", "ignore").decode("utf-8")
    
    # Minúsculas
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)
    
    # Remove emails
    text = re.sub(r"\S+@\S+", "", text)
    
    
    # Remove pontuação
    text = re.sub(r"[^\w\s]", "", text)
    
    # Tokenização simples
    words = text.split()
    
    # Remove stopwords e aplica stemming
    cleaned = " ".join(STEMMER.stem(word) for word in words if word not in STOPWORDS)
    
    return cleaned
