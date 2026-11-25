# AITAM College AI Chatbot 🎓

An AI-powered virtual assistant for **Aditya Institute of Technology and Management (AITAM), Tekkali**. The chatbot helps students, parents, faculty, and visitors find college-related information through a conversational interface powered by Google Gemini.

<p align="center">
  <img src="Public/favicon.png" alt="AITAM Logo" width="100" />
</p>

<p align="center">
  **Your AI-powered guide to AITAM**
</p>

---

## 📌 About the Project

The AITAM College AI Chatbot is designed to make college information easier to access. Instead of manually searching through multiple pages, users can ask questions in natural language and receive relevant answers.

The assistant uses a structured college knowledge base and a retrieval mechanism to provide context to the AI model before generating responses.

It is built with a modern web stack, with Supabase handling authentication and conversation storage.

## ✨ Features

- **AI-powered conversations:** Ask questions about AITAM using natural language.
- **College knowledge base:** Access information about the institution, departments, courses, admissions, facilities and other college-related topics.
- **Faculty information:** Retrieve available faculty details across 12 departments.
- **Smart knowledge retrieval:** Uses keyword-based relevance scoring to find information related to the user's question.
- **Source-grounded responses:** Instructs the AI to avoid inventing information when verified context is unavailable.
- **User authentication:** Sign in and create accounts using Supabase authentication.
- **Google sign-in:** Google authentication support.
- **Chat history:** Create, revisit, rename and delete conversations.
- **Streaming responses:** Receive AI responses as they are generated.
- **Responsive interface:** Designed for desktop and mobile screens.
- **Light and dark themes:** Switch between visual themes.
- **AITAM branding:** Uses the institutional logo and college-inspired colour palette.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Framework | TanStack Start, Vite |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| AI Integration | Google Gemini API, Vercel AI SDK |
| Authentication | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Icons | Lucide React |
| State and Data Fetching | TanStack React Query |

## 🧠 How It Works

1. The user submits a question through the chat interface.
2. The application authenticates the user and verifies the conversation.
3. The retrieval system searches the structured AITAM knowledge base using keyword-based relevance scoring.
4. Relevant knowledge is added to the system prompt.
5. Google Gemini generates a response using the supplied context.
6. The response is streamed to the interface.
7. User messages and completed assistant responses are stored in Supabase.

### Knowledge Base

The knowledge base contains general college information and modular faculty records.

Faculty information is organized into separate department files:

- CSE
- CSM
- CSD
- IT
- ECE
- EEE
- Civil Engineering
- Mechanical Engineering
- Basic Sciences & Humanities
- MBA
- BBA
- MCA

The knowledge retrieval implementation currently uses keyword-based scoring. Vector embeddings and a vector database are possible future improvements, not part of the current implementation.

## 📂 Project Structure

```text
College-Chatbot/
├── Public/
│   └── favicon.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ai-elements/
│   │   ├── chat/
│   │   ├── ui/
│   │   └── brand-mark.tsx
│   ├── context/
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   │   ├── ai/
│   │   ├── chat/
│   │   └── knowledge/
│   │       └── faculty-data/
│   ├── routes/
│   │   ├── _authenticated/
│   │   ├── api/
│   │   ├── auth.tsx
│   │   └── index.tsx
│   ├── styles.css
│   ├── router.tsx
│   └── server.ts
├── supbase/
│   ├── config.toml
│   └── migrations/
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- A Google Gemini API key
- A Supabase project

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AITAM-Chatbot.git
```

### 2. Navigate to the Project

```bash
cd AITAM-Chatbot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the required credentials.

```env
GEMINI_API_KEY=your_gemini_api_key

SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit your `.env` file or expose API keys and private credentials publicly.

### 5. Configure Supabase

- Create a Supabase project.
- Configure the required authentication providers.
- Apply the database migration from the `supbase/migrations/` directory.
- Configure the environment variables.

### 6. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🚀 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format project files using Prettier |

## 🔮 Future Improvements

The project is under active development. Planned improvements include:

- Intent detection and better question understanding.
- Improved department and topic detection.
- More accurate knowledge retrieval.
- Stronger source attribution in responses.
- Expanded college information and student services.
- Integration of official notices and academic updates.
- Improved hallucination prevention.
- Advanced retrieval using embeddings and vector search.

## 🏫 Official College Website

[Aditya Institute of Technology and Management – Official Website](https://www.adityatekkali.edu.in/)

## 👨‍💻 Project

**AITAM College AI Chatbot**

Developed as an academic project to make institutional information more accessible through conversational AI.

---

<p align="center">
  Made with ❤️ for AITAM
</p>
