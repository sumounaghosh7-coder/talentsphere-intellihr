# TalentSphere – Smart Human Resource Management Platform

> A modern, responsive, and interactive Human Resource Management System designed to simplify employee management, workforce operations, and HR analytics through a clean and professional web interface.

## 📌 Project Overview

**TalentSphere** is a frontend-based **Smart Human Resource Management Platform** developed to provide a centralized interface for managing essential HR operations. The project brings together employee management, recruitment, attendance, leave management, performance tracking, payroll, reports, calendar activities, and system settings into a single dashboard.

The platform is designed with a focus on **simplicity, responsiveness, usability, and data visualization**. It demonstrates how modern web technologies can be used to build an HR management solution suitable for small organizations, startups, and as a foundation for larger enterprise HR systems.

TalentSphere uses **LocalStorage** for client-side data persistence, allowing users to add, update, search, filter, and manage HR records directly from the browser without requiring a backend database.

---

## 🎯 Objectives

The main objectives of TalentSphere are:

* To create a centralized HR management dashboard.
* To simplify employee record management.
* To provide recruitment and candidate tracking functionality.
* To monitor daily employee attendance.
* To manage employee leave requests and approvals.
* To track employee performance.
* To manage payroll and salary information.
* To provide HR-related reports and analytics.
* To visualize workforce data using interactive charts.
* To provide a responsive interface for desktop and mobile devices.
* To demonstrate practical implementation of frontend web development concepts.

---

## ✨ Key Features

### 🏠 1. HR Dashboard

The dashboard provides an overall summary of the organization's workforce.

**Features include:**

* Total employee count
* Present employee count
* Employees on leave
* Open positions
* Workforce growth chart
* Department distribution chart
* Recent employees
* Recent leave requests
* Quick navigation to major HR modules

---

### 👥 2. Employee Management

The Employee Management module provides a centralized employee directory.

**Features include:**

* View employee records
* Add new employees
* Edit employee information
* Delete employee records
* Search employees
* Filter by department
* Filter by employment status
* Employee statistics
* Employee profile access
* CSV export functionality
* LocalStorage-based data persistence

Employee information can include:

* Employee ID
* Employee name
* Department
* Designation
* Joining date
* Employment status

---

### 👤 3. Employee Details

The Employee Details module provides a dedicated profile page for individual employees.

**Features include:**

* Employee profile
* Employee ID
* Department
* Designation
* Joining date
* Employment status
* Employee tenure
* Attendance overview
* Attendance visualization
* Employment information
* Personal information
* Report functionality

Employee profiles can be accessed using an employee ID through the page URL.

---

### 🎯 4. Recruitment Management

The Recruitment module helps HR teams monitor the hiring process.

**Features include:**

* Open positions
* Candidate tracking
* Recruitment pipeline
* Job positions
* Candidate status
* Hiring progress
* Recruitment statistics
* Search and filtering

The module provides an organized overview of the recruitment workflow.

---

### 🕒 5. Attendance Management

The Attendance module allows HR users to monitor employee attendance.

**Features include:**

* Daily attendance records
* Present/Absent/Late/Leave status
* Attendance statistics
* Employee-based filtering
* Date filtering
* Mark attendance
* Mark all employees as present
* Edit attendance records
* Weekly attendance chart
* Attendance distribution chart
* Monthly attendance calendar
* CSV export

Attendance data is stored locally using browser LocalStorage.

---

### 🏖️ 6. Leave Management

The Leave Management module handles employee leave requests.

**Features include:**

* Apply for leave
* View leave requests
* Approve leave requests
* Reject leave requests
* Cancel requests
* Delete records
* Leave balance
* Leave statistics
* Leave type filtering
* Status filtering
* Employee search
* Leave calendar
* Leave distribution chart

Supported leave categories can include:

* Casual Leave
* Sick Leave
* Earned Leave
* Maternity Leave
* Other Leave

---

### 📈 7. Performance Management

The Performance module provides an interface for monitoring employee performance.

**Features include:**

* Employee performance records
* Performance ratings
* Performance overview
* Department-based analysis
* Performance trends
* Employee evaluation information
* Interactive data visualization

This module can serve as a foundation for implementing a complete employee performance evaluation system.

---

### 💰 8. Payroll Management

The Payroll module provides an interface for managing employee salary information.

**Features include:**

* Total payroll calculation
* Net payroll
* Total deductions
* Processed payroll
* Employee salary records
* Basic salary
* Allowances
* Deductions
* Net salary calculation
* Payroll status
* Search and filtering
* Department filtering
* Month filtering
* Salary details
* Add payroll records
* Edit payroll records
* Delete payroll records
* Payroll trend visualization
* CSV export

The system automatically calculates:

```text
Net Salary = Basic Salary + Allowance - Deduction
```

---

### 📊 9. Reports & Analytics

The Reports module provides a centralized view of HR-related data.

**Analytics can include:**

* Workforce statistics
* Department distribution
* Attendance analysis
* Leave analysis
* Payroll information
* Recruitment statistics
* Performance insights

Interactive charts are implemented using **Chart.js**.

---

### 📅 10. HR Calendar

The Calendar module provides a centralized calendar interface for HR activities.

It can be used to visualize:

* Leave dates
* Attendance-related activities
* HR events
* Employee-related schedules
* Important organizational dates

---

### ⚙️ 11. Settings

The Settings module allows users to manage application preferences.

**Features include:**

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

## 🛠️ Technologies Used

### Frontend

* **HTML5** – Website structure and semantic content
* **Tailwind CSS** – Responsive and modern UI design
* **JavaScript (ES6+)** – Application logic and interactivity
* **Chart.js** – Interactive charts and data visualization
* **Lucide Icons** – Modern interface icons

### Browser Storage

* **LocalStorage** – Client-side data persistence

### Development Tools

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Vercel**

---

## 📂 Project Structure

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

## 🧩 Project Architecture

TalentSphere follows a simple **frontend modular architecture**.

```text
                    TalentSphere
                         │
              ┌──────────┴──────────┐
              │                     │
          HTML Pages           JavaScript
              │                     │
       ┌──────┼──────┐       ┌──────┼──────┐
       │      │      │       │      │      │
    Dashboard HR Pages  UI  Storage Charts Theme
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

Each major module has its own HTML page and JavaScript functionality, while common functionality is handled through shared JavaScript files.

---

## 💾 Data Management

TalentSphere currently uses browser **LocalStorage** instead of a backend database.

Different modules maintain their own client-side data, such as:

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

This makes the project easy to run locally without requiring database installation or server configuration.

---

## 📊 Data Visualization

TalentSphere uses **Chart.js** to convert HR data into easy-to-understand visualizations.

Charts implemented across the platform include:

* Workforce growth
* Department distribution
* Attendance trends
* Attendance status distribution
* Leave distribution
* Payroll trends
* Performance analytics

The charts are designed to make HR data easier to understand and analyze.

---

## 🌙 Dark Mode

TalentSphere includes a built-in dark mode for improved usability and visual customization.

The selected theme is stored using LocalStorage so that the user's preference can persist across pages.

---

## 📱 Responsive Design

The application is designed to work across different screen sizes.

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

Responsive features include:

* Mobile navigation sidebar
* Responsive tables
* Flexible dashboard cards
* Responsive charts
* Mobile-friendly forms
* Adaptive layouts

---

## 🔍 Search & Filtering

Several modules provide search and filtering capabilities to make large datasets easier to manage.

Examples include:

* Employee search
* Department filtering
* Status filtering
* Attendance filtering
* Leave filtering
* Payroll filtering
* Recruitment filtering

---

## 📤 Data Export

Selected modules provide CSV export functionality so that HR data can be downloaded and used outside the application.

Example:

```text
Employee Records → CSV
Attendance Records → CSV
Payroll Records → CSV
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/talentsphere-intellihr.git
```

### 2. Open the Project

```bash
cd talentsphere-intellihr
```

### 3. Run the Application

Since TalentSphere is a frontend project, no backend installation is required.

You can open:

```text
index.html
```

directly in your browser.

For development, it is recommended to use **Visual Studio Code with Live Server**.

---

## 🌐 Deployment

TalentSphere can be deployed using platforms such as **Vercel** or **GitHub Pages**.

For Vercel deployment:

```text
GitHub Repository
        ↓
      Vercel
        ↓
TalentSphere Live Website
```

No server-side configuration is required because the current version is a frontend-based application.

---

## 🔮 Future Improvements

The current version is designed as a frontend HR management platform. Future versions can extend it with a backend and advanced enterprise functionality.

Planned improvements may include:

* User authentication
* Admin and HR role management
* Backend API
* MySQL/PostgreSQL database
* Node.js/Express backend
* Employee document management
* Real-time notifications
* Advanced recruitment pipeline
* Automated payroll processing
* Email notifications
* AI-based recruitment assistance
* AI-powered employee analytics
* Predictive attrition analysis
* Advanced HR dashboards
* Cloud database integration
* REST API integration
* Secure authentication and authorization

---

## 🎓 Academic & Portfolio Purpose

TalentSphere is developed as a practical **B.Tech CSE (AI-ML) portfolio project** demonstrating concepts of:

* Frontend Web Development
* Responsive UI Design
* JavaScript Programming
* Data Management
* Data Visualization
* HR Analytics
* CRUD Operations
* Browser Storage
* Modular Project Architecture
* Git & GitHub
* Web Deployment

The project can also serve as a foundation for developing a full-stack **HRMS / HR Analytics platform**.

---

## 👩‍💻 Author

**Sumouna Ghosh**


### Areas of Interest

* Artificial Intelligence
* Machine Learning
* Data Analytics
* HR Analytics
* Web Development
* Software Development

---

## 📜 License

This project is currently developed for educational and portfolio purposes.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a **Star ⭐** on GitHub.

---

### 🔗 Project

**Repository:** `talentsphere-intellihr`

**Project Name:**
`TalentSphere – Smart Human Resource Management Platform`

> **TalentSphere brings essential HR operations, workforce management, and analytics together in one modern web platform.**
