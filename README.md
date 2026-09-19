# TalentSphere — Smart Human Resource Management Platform

A modern, responsive and interactive HR Management System for workforce operations, employee management and HR analytics.

## 🌐 Live Demo

🚀 **Live Application:**
[https://talentsphere-vercel.vercel.app](https://talentsphere-vercel.vercel.app)

💻 **GitHub Repository:**
[https://github.com/sumounaghosh7-coder/talentsphere-intellihr](https://github.com/sumounaghosh7-coder/talentsphere-intellihr)

---

## 📌 Project Overview

**TalentSphere** is a frontend-based Smart Human Resource Management Platform designed to bring essential HR operations into one centralized dashboard.

The platform provides modules for:

* 👥 Employee Management
* 🎯 Recruitment Management
* 🕒 Attendance Management
* 🏖️ Leave Management
* 📈 Performance Management
* 💰 Payroll Management
* 📊 Reports & Analytics
* 📅 HR Calendar
* ⚙️ Application Settings

The project focuses on responsive UI design, usability, CRUD operations, client-side data management and data visualization.

TalentSphere currently uses **Browser LocalStorage** for client-side data persistence.

---

## ✨ Key Features

### 🏠 HR Dashboard

* Total employee count
* Present employee count
* Employees on leave
* Open positions
* Workforce growth chart
* Department distribution
* Recent employees
* Recent leave requests
* Quick navigation to HR modules

### 👥 Employee Management

* Add, edit and delete employees
* Employee search
* Department filtering
* Employment status filtering
* Employee statistics
* Employee profiles
* CSV export
* LocalStorage persistence

### 🎯 Recruitment Management

* Open positions
* Candidate tracking
* Recruitment pipeline
* Candidate status
* Hiring progress
* Recruitment statistics
* Search and filtering

### 🕒 Attendance Management

* Daily attendance records
* Present / Absent / Late / Leave status
* Attendance statistics
* Employee and date filtering
* Mark and edit attendance
* Weekly attendance chart
* Attendance distribution chart
* Monthly attendance calendar
* CSV export

### 🏖️ Leave Management

* Apply for leave
* View leave requests
* Approve or reject requests
* Cancel requests
* Leave balance
* Leave statistics
* Leave filtering
* Employee search
* Leave calendar
* Leave distribution chart

### 📈 Performance Management

* Employee performance records
* Performance ratings
* Performance overview
* Department-based analysis
* Performance trends
* Interactive visualization

### 💰 Payroll Management

* Total payroll
* Net payroll
* Total deductions
* Employee salary records
* Basic salary
* Allowances
* Deductions
* Net salary calculation
* Payroll status
* Department and month filtering
* Add, edit and delete payroll records
* Payroll trend visualization
* CSV export

**Net Salary = Basic Salary + Allowance - Deduction**

### 📊 Reports & Analytics

* Workforce statistics
* Department distribution
* Attendance analysis
* Leave analysis
* Payroll information
* Recruitment statistics
* Performance insights
* Interactive charts using Chart.js

### 📅 HR Calendar

* Leave dates
* Attendance-related activities
* HR events
* Employee schedules
* Important organizational dates

### ⚙️ Settings

* Profile settings
* Appearance preferences
* Dark mode
* Notification preferences
* General preferences
* Security settings
* Password management interface
* Two-factor authentication interface
* Data management
* Local data reset

---

# 🛠️ Technology Stack

### Frontend

* HTML5
* Tailwind CSS
* JavaScript ES6+
* Chart.js
* Lucide Icons

### Data Management

* Browser LocalStorage
* Client-side CRUD operations
* CSV data export

### Development & Deployment

* Visual Studio Code
* Git
* GitHub
* Vercel

---

# 🏗️ Project Architecture

```text
                         TalentSphere
                              │
              ┌───────────────┴───────────────┐
              │                               │
          HTML Pages                      JavaScript
              │                               │
      ┌───────┼────────┐             ┌────────┼────────┐
      │       │        │             │        │        │
  Dashboard  HR Pages   UI        Storage   Charts   Theme
      │
      ├── Employees
      ├── Recruitment
      ├── Attendance
      ├── Leave
      ├── Performance
      ├── Payroll
      ├── Reports
      ├── Calendar
      └── Settings
```

---

# 📂 Project Structure

```text
TalentSphere/
│
├── index.html
│
├── pages/
│   ├── employees.html
│   ├── employee-details.html
│   ├── recruitment.html
│   ├── attendance.html
│   ├── leave.html
│   ├── performance.html
│   ├── payroll.html
│   ├── reports.html
│   ├── calendar.html
│   └── settings.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── sidebar.js
│   ├── theme.js
│   ├── charts.js
│   ├── employees.js
│   ├── attendance.js
│   ├── leave.js
│   ├── recruitment.js
│   ├── performance.js
│   └── payroll.js
│
└── README.md
```

---

# 💾 Data Management

TalentSphere currently uses **LocalStorage** instead of a backend database.

Client-side data includes:

```text
talentSphereEmployees
talentSphereAttendance
talentSphereLeaveRequests
talentSpherePayroll
talentSphereTheme
talentSphereProfile
talentSphereSettings
talentSpherePreferences
```

---

# 📊 Data Visualization

TalentSphere uses **Chart.js** to transform HR data into visual insights.

Visualizations include:

* Workforce growth
* Department distribution
* Attendance trends
* Attendance status distribution
* Leave distribution
* Payroll trends
* Performance analytics

---

# 🌙 Dark Mode

TalentSphere includes a built-in dark mode for improved usability and personalization.

Theme preferences are stored using LocalStorage.

---

# 📱 Responsive Design

The application is designed for:

* Desktop
* Tablet
* Mobile

Responsive features include:

* Mobile navigation
* Responsive tables
* Flexible dashboard cards
* Responsive charts
* Mobile-friendly forms
* Adaptive layouts

---

# 🔎 Search & Filtering

Search and filtering functionality is available across multiple modules:

* Employee search
* Department filtering
* Employment status filtering
* Attendance filtering
* Leave filtering
* Payroll filtering
* Recruitment filtering

---

# 📤 CSV Export

Selected modules support CSV data export.

```text
Employee Records
       ↓
      CSV

Attendance Records
       ↓
      CSV

Payroll Records
       ↓
      CSV
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/sumounaghosh7-coder/talentsphere-intellihr.git
```

## Navigate to the Project

```bash
cd talentsphere-intellihr
```

## Run the Application

TalentSphere is currently a frontend-based application and does not require backend installation.

Open:

```text
index.html
```

in your browser.

For development, **Visual Studio Code with Live Server** is recommended.

---

# 🌐 Deployment

TalentSphere is deployed using **Vercel**.

```text
GitHub Repository
       │
       ↓
     Vercel
       │
       ↓
TalentSphere Live Application
```

### 🚀 Live Application

[https://talentsphere-vercel.vercel.app](https://talentsphere-vercel.vercel.app)

---

# 🔮 Future Development Roadmap

The current version provides a frontend foundation that can be extended into a full-stack HRMS and HR Analytics platform.

Planned enhancements include:

* User Authentication
* Admin & HR Role Management
* Backend REST API
* MySQL / PostgreSQL Database
* Node.js / Express Backend
* Employee Document Management
* Real-time Notifications
* Advanced Recruitment Pipeline
* Automated Payroll Processing
* Email Notifications
* AI-assisted Recruitment
* AI-powered Employee Analytics
* Predictive Attrition Analysis
* Cloud Database Integration
* Secure Authentication & Authorization

---

# 🎓 Skills Demonstrated

* Frontend Web Development
* Responsive UI Design
* JavaScript Programming
* CRUD Operations
* Client-side Data Management
* Data Visualization
* HR Analytics
* Modular Project Architecture
* LocalStorage
* Search & Filtering
* CSV Data Export
* Git & GitHub
* Vercel Deployment

---

# 💼 Project Highlights

TalentSphere was developed around a practical business problem: **bringing multiple HR operations into one centralized platform.**

The project demonstrates the complete development workflow:

```text
Problem Identification
        ↓
UI / UX Design
        ↓
Frontend Development
        ↓
Data Management
        ↓
Data Visualization
        ↓
Testing
        ↓
GitHub Version Control
        ↓
Vercel Deployment
```

The project also provides a foundation for future expansion into a full-stack HRMS with backend APIs, databases, authentication and AI-powered analytics.

---

# 👩‍💻 About the Developer

## Sumouna Ghosh

**B.Tech CSE (AI & ML) Student**

### Areas of Interest

* Artificial Intelligence
* Machine Learning
* Data Analytics
* HR Analytics
* Web Development
* Software Development

---

# 📌 Project Information

| Category         | Details                          |
| ---------------- | -------------------------------- |
| Project Name     | TalentSphere                     |
| Project Type     | Human Resource Management System |
| Application Type | Frontend Web Application         |
| Primary Focus    | HR Operations & Analytics        |
| Data Storage     | Browser LocalStorage             |
| Deployment       | Vercel                           |
| Repository       | GitHub                           |
| Purpose          | Academic & Portfolio Project     |

---

# 🔗 Project Links

**Live Demo:**
[https://talentsphere-vercel.vercel.app](https://talentsphere-vercel.vercel.app)

**GitHub Repository:**
[https://github.com/sumounaghosh7-coder/talentsphere-intellihr](https://github.com/sumounaghosh7-coder/talentsphere-intellihr)

---

# ⭐ Support

If you find TalentSphere interesting or useful, consider giving the repository a **Star ⭐** on GitHub.

---

**TalentSphere — Bringing HR Operations, Workforce Management & Analytics Together.**

**Built by Sumouna Ghosh**
