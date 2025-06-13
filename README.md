# 🛍️ ShopEasy WebSite

ShopEasy WebSite é a interface web do sistema de e-commerce ShopEasy , desenvolvida para fornecer uma experiência moderna, intuitiva e responsiva para os usuários. O projeto foi construído utilizando **React.js**, **TypeScript** e **Tailwind CSS**, consumindo a ShopEasy API para gerenciar produtos, carrinho de compras, pedidos e autenticação de usuários.

---

## 🚀 Funcionalidades

- ✅ Listagem de produtos integrados à API
- ✅ Visualização detalhada dos produtos
- ✅ Autenticação de usuários (login)
- ✅ Adição e remoção de itens no carrinho
- ✅ Finalização de pedidos
- ✅ Página de pedidos realizados
- ✅ Interface responsiva (web e mobile)
- ✅ Integração com autenticação JWT

---

## 🛠️ Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

- React.js
- TypeScript
- Tailwind CSS
- ShopEasy API

---

## 📁 Estrutura do Projeto

```bash
ShopEasy/
├── backend/
│   ├── manage.py
│   └── shopeasy/
│       ├── __init__.py
│       ├── settings.py
│       ├── urls.py
│       └── shop/
│           ├── __init__.py
│           ├── models.py
│           ├── views.py
│           ├── serializers.py
│           ├── admin.py
│           ├── apps.py
│           ├── tests.py
│           └── migrations/
├── frontend/
│   ├── src/
│   │   ├── app/            # Rotas (App Router)
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── context/        # Contextos de autenticação/carrinho
│   │   ├── hooks/          # Hooks customizados
│   │   ├── services/       # Comunicação com a API
│   │   ├── styles/         # Estilos globais (Tailwind)
│   │   ├── utils/          # Utilitários
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── README.md
```

---

## ⚙️ Como rodar o projeto

```bash
# Configure e rode o backend
cd backend

# Crie e ative o ambiente virtual (venv)
# No Windows
python -m venv venv
venv\Scripts\activate

# No Linux/macOS
python3 -m venv venv
source venv/bin/activate

# Instale as dependências do backend
pip install -r requirements.txt

# Rode as migrações
python manage.py migrate

# Inicie o servidor backend
python manage.py runserver

#Configure e rode o frontend Abra um novo terminal para rodar o frontend

cd ../frontend

# Instale as dependências
npm install

# Configure o arquivo .env.local com a URL da API (exemplo incluso em .env.example)

# Rode o projeto em ambiente de desenvolvimento
npm run dev



```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Integração com a API

Certifique-se de que a ShopEasy API (backend) esteja rodando e atualize a variável de ambiente `NEXT_PUBLIC_API_URL` no `.env.local` com a URL correta da API.

Exemplo de `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1/
```

---

## 🧪 Testes

Você pode utilizar ferramentas como o Swagger, Postman ou Insomnia para testar diretamente a API. No front-end, recomenda-se testar os fluxos de compra, autenticação e visualização de pedidos.

---

## 📚 Documentação

- Documentação da API: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

## 💻 Deploy

O projeto pode ser facilmente implantado na [Vercel](https://vercel.com/) ou em qualquer serviço que suporte aplicações React (Next.js).

---
