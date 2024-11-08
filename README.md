# MediConnect 🚀

Welcome to **MediConnect** — an innovative platform designed to revolutionize the way we access healthcare services through technology. MediConnect aims to provide seamless, user-friendly solutions for hospitals and clients to enhance their healthcare experience.

## Table of Contents 📑

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)

## Overview 🌟

MediConnect is a platform designed to connect clients and healthcare providers in a more efficient and personalized way. From hospital searches to appointment bookings and consultations, MediConnect brings the power of technology to healthcare accessibility.

### What’s been accomplished so far:

- **Service Section Layout:** Designed and implemented the initial service section layout.
- **Interactive Contact Page:** Developed an interactive contact page for user inquiries.
- **Hospital Search Functionality:** Added real-time hospital search with user-friendly notifications for no results.
- **Email Notifications:** Implemented an email confirmation system for new hospital registrations, providing essential details to admins for quick decisions.
- **User Login Functionality:** Added secure login for both hospitals and clients to access personalized features.
- **Dropdown Navigation:** Designed an intuitive dropdown menu for easy navigation.
- **"Ask the Doctor" Feature:** Integrated a feature where clients can consult doctors with a daily limit of questions.
- **Admin Dashboard:** Created a hospital admin dashboard for managing hospital profile, appointments, and settings.

## Features 🎯

- **Hospital Search:** Real-time search for hospitals with location-based results.
- **Appointment Booking:** Clients can book appointments with hospitals, with automatic email confirmations.
- **Admin Dashboard:** Hospital admins can manage their profiles, edit settings, and track appointments.
- **Ask the Doctor:** A feature allowing clients to ask healthcare professionals up to 10 questions per day.
- **Email Notifications:** Admins receive detailed emails for new hospital registrations with actionable links.
- **Token System:** Ensures session persistence even after page refresh.

## Tech Stack 🛠️

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Email Service:** Nodemailer for email notifications
- **Authentication:** JWT-based token system for secure login
- **APIs:** ChatGPT API integration (future enhancement)

## 🌟Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Kusumkar-DeeepakMediConnect-.git
   cd MediConnect-
   ```
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=YOUR_MONGO_URI
   ```
   ```env
   EMAIL_USER=ADMIN_EMAIL1
   ```
   ```env
   EMAIL_USER1=ADMIN_EMAIL2
   ```
   ```env
   APP_PASS=GOOGLE_APP_PASS_FOR_NODEMAILER
   ```
   ```env
   JWT_SECRET=YOUR_JWT_SECRET
   ```
   ```env
   API_KEY = YOUR_GEMINI_API_KEY
   ```

4. Run the application:
   
   -**For Frontend**
   ```bash
   npm run dev
   ```

   -**For Backend**
   ```bash
   node app.js
   ```

## 🌟Usage
- **Register a hospital:** Hospitals can request registration through the platform. The admin will receive a confirmation email with all details for verification.
- **Book an appointment:** Clients can browse available hospitals and book appointments. Confirmation emails will be sent automatically.
- **Access the admin dashboard:** Admins can view client appointments, edit hospital details, and manage settings from the dashboard.
- **Ask the doctor:** Clients can ask up to 10 questions per day using the "Ask the Doctor" feature.



 ## 🌟Under Construction 🚧
MediConnect is currently under development, and we are working hard to bring you the most innovative and efficient healthcare solutions. While some features are functional, others are being continuously refined to provide a seamless experience. Stay tuned for updates, and thank you for your patience as we enhance the platform for you!
