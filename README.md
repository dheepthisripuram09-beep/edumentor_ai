# 🎓 EduMentor AI

> An AI-powered modern education web application that helps students learn smarter using Google Gemini AI.

![EduMentor AI](https://img.shields.io/badge/EduMentor-AI-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)

---

## ✨ Features

- 🤖 **AI Study Assistant** — Ask any question and get answers powered by Google Gemini AI
  - Explain Like I'm 10 (Simple Mode)
  - Normal Explanation
  - Detailed / Advanced Explanation
- 📝 **Quiz Generator** — Enter any topic and instantly generate 10 AI-powered multiple choice questions with auto-scoring
- 📅 **Study Planner** — Plan and manage your study sessions
- 📊 **Progress Dashboard** — Track your learning progress over time
- 👤 **Profile Page** — Manage your student profile
- 🌙 **Dark Mode** — Toggle between light and dark themes
- 💎 **Glassmorphism UI** — Premium blue and white professional design
- 📱 **Fully Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS v3** | Styling and UI design |
| **Framer Motion** | Smooth animations |
| **React Router v6** | Page navigation |
| **Google Gemini AI** | AI-powered responses |
| **Lucide React** | Icons |
| **Local Storage** | Data persistence |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your computer:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/dheepthisripuram09-beep/edumentor_ai.git
```

**2. Navigate into the project folder**
```bash
cd edumentor_ai
```

**3. Install all dependencies**
```bash
npm install
```

**4. Create your environment file**

Create a file named `.env` in the root of the project folder and add your Google Gemini API key:
```
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

> 💡 Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

**5. Start the development server**
```bash
npm run dev
```

**6. Open in your browser**

Go to `http://localhost:5173` in your web browser and the app will be live!

---

## 📜 Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors |

---

## 📁 Project Structure

```
edumentor-ai/
├── public/
├── src/
│   ├── components/        # Reusable UI components (Navbar, Footer)
│   ├── context/           # React context (Auth, Theme)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # All application pages
│   │   ├── Home.jsx
│   │   ├── AIStudyAssistant.jsx
│   │   ├── QuizGenerator.jsx
│   │   ├── StudyPlanner.jsx
│   │   ├── Dashboard.jsx
│   │   └── Profile.jsx
│   ├── services/
│   │   └── geminiService.js   # Google Gemini AI integration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key (required) |

> ⚠️ **Never share your `.env` file or commit it to GitHub. It contains your private API key.**

---

## 🌐 Live Demo

> Coming soon — deploy using Vercel or Netlify

---

## 👨‍💻 Author

**Sripuram Dheepthi**
- GitHub: [@dheepthisripuram09-beep](https://github.com/dheepthisripuram09-beep)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using React + Google Gemini AI</p>
