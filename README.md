#  Mel.ia — Sua assistente inteligente de e-mails

> “Transformando e-mails em produtividade com um toque de inteligência artificial.”

---

##  Sobre o Projeto

A **Mel.ia** é uma aplicação web que **classifica e responde e-mails automaticamente** usando inteligência artificial.  
Ela foi criada para entender o conteúdo das mensagens e sugerir respostas coerentes, ajudando pessoas e equipes a ganharem tempo no dia a dia.

O sistema é dividido em dois módulos principais:

-  **Frontend (Angular)** — Interface moderna, modo escuro/claro, histórico local e envio de arquivos `.pdf` e `.txt`.
-  **Backend (FastAPI + OpenAI)** — Processa e classifica o conteúdo do e-mail e gera respostas automáticas personalizadas.

---

##  Funcionalidades

###  Inteligência Artificial
- Classificação de e-mails nas categorias:
  - **Produtivo** → requer ação ou resposta.
  - **Improdutivo** → mensagens informativas ou sociais.
- Sugestão de resposta automática com tom natural e coerente.

###  Interface Web (Angular)
- Upload de **arquivos PDF e TXT** (com validação de formato e tamanho).
- Envio direto de **texto para análise**.
- **Histórico local** de análises (armazenado via `localStorage`).
- **Modo escuro e modo claro**.
- Sistema de **toasts** para feedback instantâneo (erro, sucesso e aviso).

###  Integração com E-mail
- Servidor **IMAP/SMTP** que:
  - Lê a **caixa de entrada** a cada 5 minutos.
  - Gera respostas automáticas personalizadas.
- (Atualmente disponível apenas em ambiente local devido a restrições de hospedagem SMTP).

## 🛠️ Tecnologias Utilizadas

### 🌐 Frontend
- [Angular 19](https://angular.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### ⚙️ Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [OpenAI API](https://platform.openai.com/)
- [Python 3.11+](https://www.python.org/)
- [IMAPClient / aiosmtplib](https://pypi.org/project/aiosmtplib/)
  
# Mel.ia — Execução Local

Este guia descreve como executar o projeto **Mel.ia** localmente. O monorepo contém duas partes principais: frontend (Angular) e backend (FastAPI).

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- Angular CLI
- Python 3.10+
- pip e venv
- Git


## Backend (FastAPI)

Acesse a pasta do backend:  
`cd backend`  

Crie e ative um ambiente virtual:  
`python -m venv venv`  
`source venv/bin/activate` (Linux/Mac) ou `venv\Scripts\activate` (Windows)

Crie um arquivo `.env` na pasta do backend com as seguintes variáveis:

OPENAI_API_KEY=sk-...
IMAP_HOST=imap.exemplo.com
IMAP_PORT=993
IMAP_USER=usuario@exemplo.com

IMAP_PASS=senha
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=usuario@exemplo.com

SMTP_PASS=senha
CHECK_INTERVAL_SECONDS=300

Instale as dependências:  
`pip install -r requirements.txt`

Inicie o servidor:  
`uvicorn app.main:app --reload`  

O backend estará disponível em: [http://localhost:8000](http://localhost:8000)

## Frontend (Angular)

Acesse a pasta do frontend:  
`cd ../frontend`  

Instale as dependências:  
`npm install`  

Inicie o servidor de desenvolvimento:  
`npm start`  

O frontend estará disponível em: [http://localhost:4200](http://localhost:4200)

## Integração Frontend ↔ Backend

O frontend está configurado para consumir a API local em [http://localhost:8000](http://localhost:8000). Certifique-se de que o backend esteja em execução antes de iniciar o frontend.


