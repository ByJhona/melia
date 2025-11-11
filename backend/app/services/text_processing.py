import re
import string
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import nltk

nltk.download("stopwords")

STOPWORDS = set(stopwords.words("portuguese"))
STEMMER = SnowballStemmer("portuguese")

def clean_text(text: str) -> str:
    """
    Limpa e normaliza o texto:
    - Remove HTML
    - Remove URLs
    - Remove pontuação
    - Converte para minúsculas
    - Remove stopwords
    - Aplica stemming
    """
    # Remove HTML tags
    text = re.sub(r"<[^>]+>", " ", text)
    # Remove URLs
    text = re.sub(r"http\S+|www.\S+", " ", text)
    # Remove pontuação
    text = text.translate(str.maketrans("", "", string.punctuation))
    # Minusculo
    text = text.lower()
    # Tokeniza e remove stopwords
    tokens = [word for word in text.split() if word not in STOPWORDS]
    # Aplica stemming
    tokens = [STEMMER.stem(word) for word in tokens]
    return " ".join(tokens)
