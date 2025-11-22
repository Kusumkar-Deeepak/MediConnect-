# MediConnect 🏥

![Logo 1](Logo/LoGo_MediConnect.jpg)

**MediConnect** is a comprehensive healthcare management platform that bridges the gap between healthcare providers and patients through modern technology. The platform streamlines hospital registration, appointment booking, patient management, and healthcare consultations with an intuitive interface and robust backend infrastructure.

---

## Table of Contents 📑

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview 🌟

MediConnect is a full-stack healthcare platform designed to modernize healthcare accessibility and management. The system provides dual interfaces for hospitals and patients, enabling seamless interactions from registration to post-appointment reviews.

### Core Capabilities:

- **Hospital Management System:** Complete registration workflow with admin approval, profile management, and appointment tracking
- **Patient Portal:** User-friendly interface for hospital discovery, appointment booking, and health information access
- **Intelligent Appointment System:** Slot-based booking with conflict prevention and automated email confirmations
- **Healthcare Information Hub:** AI-powered disease information and doctor consultation features
- **Review & Rating System:** Transparent feedback mechanism for quality assurance
- **Secure Authentication:** JWT-based authentication with password reset functionality

---

## Key Features 🎯

### For Patients

- **Advanced Hospital Search:** Location-based search with specialty filters and real-time availability
- **Smart Appointment Booking:** Book appointments up to 3 months in advance with slot management (max 2 bookings per time slot)
- **Appointment History:** Comprehensive view of past, present, and future appointments with visit tracking
- **MediInfo (AI-Powered):** Get detailed disease information using Google's Generative AI
- **Doctor Consultation:** "Ask the Doctor" feature for healthcare queries
- **Review System:** Share experiences and view hospital ratings
- **Password Recovery:** Secure password reset via email tokens

### For Hospitals

- **Registration Workflow:** Email-based registration with admin approval system
- **Admin Dashboard:** Centralized management for profile, appointments, and settings
- **Appointment Management:** View and manage patient appointments with visit status tracking
- **Profile Customization:** Update facilities, timings, specializations, and doctor information
- **Patient Communication:** Direct email notifications for appointments and updates
- **Review Monitoring:** Track and respond to patient feedback

### Platform Features

- **Email Automation:** Nodemailer integration for registration confirmations, appointment bookings, and password resets
- **Health Monitoring:** Dedicated `/health` endpoint for uptime monitoring services
- **Session Persistence:** JWT tokens maintain user sessions across browser refreshes
- **Responsive Design:** TailwindCSS-powered responsive UI for all devices
- **Data Validation:** Comprehensive input validation and error handling
- **Database Seeding:** Pre-configured seed script for testing with 23+ hospitals and sample patients

---

## Architecture 🏗️

```
MediConnect/
├── backend/                    # Node.js/Express API Server
│   ├── config/                 # Database configuration
│   ├── models/                 # MongoDB schemas (Hospital, User, Appointment)
│   ├── routes/                 # API route handlers
│   │   ├── auth.js            # Authentication & password reset
│   │   ├── appointments.js    # Appointment booking & management
│   │   ├── hospitalRoutes.js  # Hospital CRUD operations
│   │   └── userRoutes.js      # Client/patient operations
│   ├── middleware/            # Authentication middleware
│   ├── uploads/               # File upload storage
│   ├── seed.js                # Database seeding script
│   └── app.js                 # Express application entry point
│
├── frontend/                   # React/Vite Application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HospitalDashboard.jsx
│   │   │   ├── ClientAppointments.jsx
│   │   │   ├── DiseaseInfo.jsx
│   │   │   └── ...
│   │   ├── Context/           # React Context API
│   │   │   └── UserContext.jsx
│   │   ├── pages/             # Page components
│   │   └── assets/            # Static assets
│   └── public/                # Public files
│
└── Logo/                       # Branding assets
```

---

## Tech Stack 🛠️

### Frontend

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.1
- **Routing:** React Router DOM 6.26.2
- **Styling:** TailwindCSS 3.4.13 + PostCSS + Autoprefixer
- **UI Components:** Flowbite 2.5.2, Heroicons 1.0.6
- **HTTP Client:** Axios 1.7.7
- **Notifications:** React Toastify 10.0.6
- **Authentication:** JWT Decode 4.0.0
- **Linting:** ESLint 9.9.0

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js 4.21.1
- **Database:** MongoDB with Mongoose ODM 8.7.1
- **Authentication:** JSON Web Tokens (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 2.4.3
- **Email Service:** Nodemailer 6.9.15
- **AI Integration:** Google Generative AI 0.21.0
- **File Upload:** Multer 1.4.5-lts.1
- **PDF Generation:** PDFKit 0.15.0
- **Environment:** dotenv 16.4.5
- **CORS:** cors 2.8.5

### Development Tools

- **Version Control:** Git
- **Package Manager:** npm
- **API Testing:** Built-in health check endpoints

---

## Installation 💻

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**
- **Gmail Account** (for Nodemailer with App Password)

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Kusumkar-Deeepak/MediConnect-.git
   cd MediConnect-
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

---

## Environment Configuration 🔐

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# ========== DEVELOPMENT ENVIRONMENT ==========
MONGO_URI=mongodb://localhost:27017/mediconnect
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
APP_PASS=your_google_app_password

# API URLs (Development)
AUTH_HOSPITAL_API=http://localhost:5173/reset-password
AUTH_CLIENT_API=http://localhost:5173/client-reset-password

# Hospital Action URLs
HOSPITAL_CONFIRM_URL=http://localhost:3000/api/hospitals/confirm
HOSPITAL_CANCEL_URL=http://localhost:3000/api/hospitals/cancel
HOSPITAL_CONFIRM_UPDATE_URL=http://localhost:3000/api/hospitals/confirm-update
HOSPITAL_CANCEL_UPDATE_URL=http://localhost:3000/api/hospitals/cancel-update

# ========== PRODUCTION ENVIRONMENT (Uncomment when deploying) ==========
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mediconnect
# JWT_SECRET=production_jwt_secret_key
# EMAIL_USER=production_email@gmail.com
# APP_PASS=production_app_password
# AUTH_HOSPITAL_API=https://yourdomain.com/reset-password
# AUTH_CLIENT_API=https://yourdomain.com/client-reset-password
# HOSPITAL_CONFIRM_URL=https://api.yourdomain.com/api/hospitals/confirm
# HOSPITAL_CANCEL_URL=https://api.yourdomain.com/api/hospitals/cancel
# HOSPITAL_CONFIRM_UPDATE_URL=https://api.yourdomain.com/api/hospitals/confirm-update
# HOSPITAL_CANCEL_UPDATE_URL=https://api.yourdomain.com/api/hospitals/cancel-update
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# ========== DEVELOPMENT ENVIRONMENT ==========
VITE_API_BASE_URL_HOSPITAL=http://localhost:3000/api/hospitals
VITE_API_BASE_URL_CLIENT=http://localhost:3000/api/clients
VITE_API_BASE_URL_AUTH=http://localhost:3000/api/auth
VITE_API_BASE_URL_APPOINTMENT=http://localhost:3000/api/appointments

# ========== PRODUCTION ENVIRONMENT (Uncomment when deploying) ==========
# VITE_API_BASE_URL_HOSPITAL=https://api.yourdomain.com/api/hospitals
# VITE_API_BASE_URL_CLIENT=https://api.yourdomain.com/api/clients
# VITE_API_BASE_URL_AUTH=https://api.yourdomain.com/api/auth
# VITE_API_BASE_URL_APPOINTMENT=https://api.yourdomain.com/api/appointments
```

### Gmail App Password Setup

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password as `APP_PASS` in your `.env` file

---

## Database Setup 🗄️

### Seed the Database

The project includes a comprehensive seed script to populate your database with sample data:

```bash
cd backend
node seed.js
```

**Seed Data Includes:**

- **23 Hospitals** across major Indian cities (Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Jaipur, Gurgaon, Kolkata)
- **9 Sample Patients** with test credentials
- Complete hospital profiles with facilities, specializations, and operating hours

**Default Login Credentials:**

Hospitals (use Hospital ID + Password):

- `CITY001` / `City@123`
- `SUN001` / `Sunshine@123`
- `APO001` / `Apollo@123`
- `MED001` / `Medanta@123`
- _(and 19 more...)_

Patients (use Email + Password):

- `deepak.kusumkar@gmail.com` / `D@123`
- `abhishek.joshi@gmail.com` / `A@123`
- `somesh.bharbade@gmail.com` / `S@123`
- _(and 6 more...)_

---

## Usage 🚀

### Starting the Application

1. **Start Backend Server**

   ```bash
   cd backend
   node app.js
   ```

   Server runs on `http://localhost:3000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`

### Health Check

Verify backend status:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-22T10:30:00.000Z",
  "uptime": 3600,
  "service": "MediConnect Backend"
}
```

---

## API Endpoints 🔌

### Authentication

- `POST /api/auth/forgot-password` - Hospital password reset request
- `POST /api/auth/client-forgot-password` - Client password reset request
- `POST /api/auth/reset-password/:token` - Reset hospital password
- `POST /api/auth/client-reset-password/:token` - Reset client password

### Hospitals

- `POST /api/hospitals/register` - Hospital registration request
- `POST /api/hospitals/login` - Hospital authentication
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID
- `PUT /api/hospitals/:id` - Update hospital profile
- `GET /api/hospitals/confirm/:token` - Confirm hospital registration
- `GET /api/hospitals/cancel/:token` - Cancel hospital registration

### Clients/Patients

- `POST /api/clients/register` - Client registration
- `POST /api/clients/login` - Client authentication
- `GET /api/clients/:email` - Get client by email
- `POST /api/clients/review` - Submit hospital review

### Appointments

- `POST /api/appointments/book-appointment` - Book new appointment
- `GET /api/appointments/:hospitalId` - Get hospital appointments
- `GET /api/appointments/client/:email` - Get client appointments
- `PUT /api/appointments/:appointmentId/visited` - Update visit status

### Health

- `GET /` - Basic health check
- `GET /health` - Detailed health status

---

## Project Structure 📂

### Backend Models

**Hospital Schema:**

- Authentication (email, password, JWT)
- Profile information (name, address, contact)
- Medical details (specializations, doctors, nurses)
- Facilities (ICU, Emergency, Pharmacy, etc.)
- Reviews and ratings
- Reset token management

**Client Schema:**

- Personal information (name, DOB, contact)
- Address details
- Password management
- Reset token support

**Appointment Schema:**

- Hospital reference
- Patient details
- Date/time slots
- Visit status tracking

### Frontend Components

- **Navbar:** Navigation with user context
- **HospitalDashboard:** Admin interface for hospitals
- **ClientAppointments:** Patient appointment history
- **AppointmentList:** Hospital's patient list
- **DiseaseInfo:** AI-powered health information
- **DoctorDetails:** Consultation interface
- **ContactPage:** Hospital inquiry form
- **SearchService:** Hospital search functionality
- **AdminGuidelines:** Platform guide for admins

---

## Contributing 🤝

We welcome contributions to MediConnect! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code structure and naming conventions
- Write clear commit messages
- Test thoroughly before submitting
- Update documentation for new features

---

## License 📄

This project is licensed under the ISC License.

---

## Acknowledgments 🙏

- **Google Generative AI** for disease information capabilities
- **MongoDB Atlas** for database hosting
- **Render/Vercel** for deployment infrastructure
- All contributors and beta testers

---

## Support 💬

For issues, questions, or suggestions:

- Create an issue on GitHub
- Contact: [Kusumkar Deepak](https://github.com/Kusumkar-Deeepak)

---

**MediConnect** - Bridging Healthcare Through Technology 🏥💻
