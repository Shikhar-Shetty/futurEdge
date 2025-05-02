# FuturEdge - AI Career Coach

**FuturEdge** is an AI-powered career coach platform designed to guide users through their professional growth, offering tailored recommendations and resources based on their skills, career goals, and industry trends. The platform uses cutting-edge AI technology to help individuals make informed decisions about their careers and continuously improve their resumes, job applications, and skill sets.

> **Note:** This project is a **work-in-progress** and is continuously evolving as new features are integrated.

---

## 🛠 Tech Stack

### Frontend:

* Next.js (React)
* TypeScript
* Tailwind CSS
* ShadCN UI
* React Hook Form
* Zod (form validation)
* NextAuth.js (authentication)

### Backend:

* Node.js
* MongoDB (with Mongoose)
* JWT (authentication)

### AI Integration:

* Gemini AI

---

## ✨ Features

* ✅ **User Profiles** – Manage skills, education, experience, and career goals.
* ✅ **AI-Powered Career Advice** – Personalized career coaching using OpenAI.
* ✅ **Resume Builder** – Generate professional resumes based on user profiles.
* ✅ **Cover Letter Generator** – Create tailored cover letters powered by AI.
* ✅ **Performance Chart** – Visual representation of user's skill assessments.
* ✅ **Assessments Module** – Users can take skill-based assessments.
* ✅ **Industry Insights Dashboard** – View salary trends, skill recommendations, and key role importance for your industry.
* ✅ **Resume Feedback** – AI-enhanced suggestions to improve your resume.
* ✅ **Job Application Tracker** – Keep track of jobs applied to, interview stages, etc.
* ⏳ **Job Search Integration** – Pull jobs from platforms like LinkedIn & Indeed (Coming soon).
* ⏳ **Skill Recommendations** – Personalized suggestions to upskill (Coming soon).
* ⏳ **Analytics Dashboard** – Visualize career trends, progress, and gaps (Coming soon).

---

## 🚧 Project Status

FuturEdge is currently under **active development**. While the core features are functional, enhancements and new modules are being added iteratively.

---

## 🧑‍💻 Getting Started

### Prerequisites

* Node.js and npm
* MongoDB (Atlas or local)
* Gemini AI Api Key
* Modern browser

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/futurEdge.git
```

### 2. Navigate to the project directory

```bash
cd futurEdge
```

### 3. Install dependencies

  ```bash
  npm install
```

### 4. Set up environment variables

Create a `.env` file in the root of the directory.

#### Example variables:

```env

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINIAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret
```

---

### 5. Start the server

```bash
npm run dev
```
Runs at: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Visit the App

Open [http://localhost:3000](http://localhost:3000) in your browser to start using **FuturEdge**.

---

