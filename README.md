# 💼 EasyHire - MERN Job Portal App

*EasyHire* is a comprehensive job portal built with the *MERN stack* (MongoDB, Express.js, React.js, Node.js). It empowers both *job seekers* and *recruiters* with an intuitive and robust platform to interact, apply, post jobs, and even receive AI-based Job recommendations.

---
## 🎥 Demo Video

Watch a short walkthrough of the project here:  
🔗 [Insert Your Demo Video Link Here]

## 🎥 Live Link
🔗 [Insert Your Live Project Link Here]

## 🧩 Sample Images

### 🧩 Student's Side

#### 1. Login Page
![Login Page](Insert_Your_Image_Path_Here)

#### 2. Home Page
![Home Page](Insert_Your_Image_Path_Here)

#### 3. Student's Profile
![Profile](Insert_Your_Image_Path_Here)

#### 4. Job Postings
![Job Postings](Insert_Your_Image_Path_Here)

#### 5. Job Description
![Job Description](Insert_Your_Image_Path_Here)

#### 6. Skills Extraction from Resume
![Skills Extraction](Insert_Your_Image_Path_Here)

#### 7. Job Recommendation
![Job Recommendation](Insert_Your_Image_Path_Here)

#### 8. Applied Jobs
![Applied Jobs](Insert_Your_Image_Path_Here)

---

### 🧩 Recruiter's Side

#### 1. Registered Companies
![Registered Companies](Insert_Your_Image_Path_Here)

#### 2. Posted Jobs
![Posted Jobs](Insert_Your_Image_Path_Here)

#### 3. Applied Candidates
![Applied Candidates](Insert_Your_Image_Path_Here)

#### 4. Chat Box (Recruiter ↔ Candidate)
![Chat Box](Insert_Your_Image_Path_Here)

---

## 🚀 Features

- 🔐 *Secure Authentication*: JWT-based login/signup for candidates and recruiters, with passwords hashed using Bcrypt.
- 🔄 *Forgot Password*: Password reset functionality via email using *Nodemailer* and secure token generation using *Crypto*.
- 📋 *Job Listings*: View a wide variety of jobs dynamically pulled from MongoDB.
- 📤 *Job Posting*: Recruiters can register companies and post jobs with full control over listings.
- 🗃 *Application Management*: Candidates can apply for jobs and track application status. Recruiters can review applications received.
- 🤝 *Real-time Messaging*: In-app messaging between candidates and recruiters using *Socket.io*.
- 🧠 *Skill-Based Job Recommendations*: Upload resumes and receive personalized job recommendations using *spaCy (Python NLP library)*.
- 🌈 *Modern UI*: Designed with *Tailwind CSS* and [*shadcn/ui*](https://ui.shadcn.com/docs/components) components for a clean and elegant interface.
- ☁ *Image Upload*: Upload and manage profile images via *Cloudinary*.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| *Frontend* | React.js, React Router, Tailwind CSS, Shadcn UI |
| *Backend* | Node.js, Express.js, Socket.io, Nodemailer |
| *Database* | MongoDB Atlas |
| *AI Module* | Python, Flask, spaCy, PyMuPDF |
| *Auth* | JWT, Bcrypt, Crypto |
| *Cloud* | Cloudinary (Image & PDF Storage) |

---

## 🚀 Getting Started

### 📁 Project Structure

```bash
easyhire-mern-job-portal/
├── backend/                # Node.js + Express backend APIs, MongoDB logic, and Python integration
│   ├── python_logic/       # Python-based skill extractor using spaCy, invoked via backend
│   └── .env                # Backend environment variables (not pushed to Git)
├── frontend/               # React frontend with Tailwind CSS + shadcn/ui
└── README.md