# 🚀 AI-Powered Resume Screening System

A modern, full-stack application designed to automate and streamline the resume screening process. This tool allows recruiters and hiring managers to upload multiple candidate resumes (PDFs), automatically extract their skills, and rank them based on job requirements and experience criteria.

## ✨ Features

*   **Batch Resume Uploads**: Seamlessly upload multiple PDF resumes at once.
*   **Automated Skill Extraction**: Uses natural language processing concepts to read through resumes and extract relevant technical skills automatically.
*   **Experience Estimation**: intelligently parses resumes to estimate a candidate's years of professional experience.
*   **Smart Candidate Ranking**: Ranks and scores candidates based on custom required skills and minimum experience filters.
*   **Modern UI/UX**: A highly responsive, sleek, and intuitive frontend built with React and Vite.

## 💻 Tech Stack

**Frontend:**
*   React.js 19
*   Vite (for ultra-fast development and build times)
*   Lucide React (for beautiful, modern iconography)
*   Vanilla CSS (custom, responsive styling)

**Backend:**
*   Node.js & Express.js
*   Multer (for memory-based file uploading)
*   PDF-Parse (for extracting text from candidate documents)
*   CORS (Cross-Origin Resource Sharing enabled)

## 🚀 How to Run the Project Locally

To run this project on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ABHISHEK7GOWDA/Resume-screening-using-AI.git
cd Resume-screening-using-AI
```

### 2. Start the Backend Server
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
npm start
```
*The backend will run on `http://localhost:3000`*

### 3. Start the Frontend App
Open a **new** terminal window and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm start
```
*Your browser will automatically open the application at `http://localhost:5173` or `http://127.0.0.1:5173`.*

## 📈 Future Enhancements
*   Integration with advanced LLMs (like OpenAI GPT) for deeper resume comprehension.
*   Database integration (MongoDB/PostgreSQL) for persistent candidate data storage.
*   Dashboard analytics for recruitment metrics.

---
*Built with ❤️ for modern hiring.*
