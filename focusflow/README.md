# FocusFlow 🕐

Sistema moderno de gerenciamento de tempo e tarefas. Interface elegante, fundo escuro, detalhes em verde neon.

---

## Stack

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** — estilização
- **Supabase** — banco de dados e autenticação
- **React Router** — roteamento
- **Lucide React** — ícones
- **date-fns** — formatação de datas

---

## Instalação e configuração

### 1. Clone e instale dependências

```bash
git clone <url-do-repositorio>
cd focusflow
npm install
```

---

### 2. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **New project**
3. Preencha o nome, senha do banco e região
4. Aguarde o projeto ser criado (pode demorar alguns instantes)

---

### 3. Execute o schema SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Cole o conteúdo do arquivo `schema.sql`
4. Clique em **Run** para executar

Isso criará:
- A tabela `tasks`
- Row Level Security (RLS) habilitado
- Policies de segurança para cada usuário ver apenas suas tarefas

---

### 4. Configure o arquivo `.env`

Copie o `.env.example` e preencha com as credenciais do seu projeto Supabase:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

**Onde encontrar essas chaves:**
- No painel Supabase, vá em **Settings → API**
- Copie a **Project URL** e a **anon/public key**

---

### 5. Rodando localmente

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## Deploy na Vercel

### Opção A: via CLI

```bash
npm install -g vercel
vercel
```

### Opção B: via GitHub

1. Faça push do projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → **New Project**
3. Importe o repositório
4. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em **Deploy**

### Importante para o Vercel

Crie um arquivo `vercel.json` na raiz (já incluído no projeto):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Isso garante que as rotas do React Router funcionem corretamente.

---

## Funcionalidades

- ✅ Cadastro e login com email/senha
- ✅ Recuperação de senha por email
- ✅ Rotas protegidas
- ✅ Dashboard com estatísticas
- ✅ Criar, editar e excluir tarefas
- ✅ Status: Pendente, Em andamento, Concluído
- ✅ Prioridade: Baixa, Média, Alta
- ✅ Filtros por status, prioridade e busca textual
- ✅ Barra de progresso geral
- ✅ Design responsivo (desktop, tablet, mobile)
- ✅ Segurança com RLS no Supabase

---

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # AuthContext (autenticação)
├── hooks/          # useTasks (lógica de tarefas)
├── layouts/        # AuthLayout, DashboardLayout
├── lib/            # Cliente Supabase
├── pages/          # Login, Register, ForgotPassword, Dashboard
├── services/       # taskService (CRUD Supabase)
├── types/          # TypeScript interfaces
└── utils/          # Helpers e constantes
```

---

## Licença

MIT
