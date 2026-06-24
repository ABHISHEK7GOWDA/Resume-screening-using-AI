# 🚀 AI-Powered Resume Screening System

🔗 **Live Demo:** [https://resume-screening-ai-alpha.vercel.app](https://resume-screening-ai-alpha.vercel.app)

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
*   Node.js & Express.js (deployed as Vercel Serverless Functions)
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

### 2. Install dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
*Vite will start the local server and proxy API calls to the serverless backend. Open `http://localhost:5173` in your browser.*

---
*Built with ❤️ for modern hiring.*
