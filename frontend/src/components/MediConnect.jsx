import { Link } from "react-router-dom";

export const MediConnect = () => {
    return (
        <div className="h-screen w-full bg-white flex flex-col justify-between font-sans">
            {/* Header Section */}
            <header className="flex justify-center items-center py-6 bg-green-100 shadow-lg">
                <h1 className="text-4xl text-green-600 font-semibold">MediConnect</h1>
            </header>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-start flex-grow px-6 py-10">
                <section id="overview" className="max-w-5xl w-full text-center mb-12">
                    <h2 className="text-3xl text-green-500 mb-4">Overview of MediConnect 🌟</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        MediConnect is a platform designed to simplify the process of connecting patients with healthcare providers. With the rise of digital health, MediConnect aims to bridge the gap between patients and doctors, making healthcare services more accessible and efficient. Whether you’re looking for a nearby hospital, booking an appointment, or seeking an online consultation, MediConnect is here to serve you.
                    </p>
                    <Link to="/" className="text-lg text-green-500 hover:text-pink-400 underline">
                        Back to Main Page
                    </Link>
                </section>

                <section id="features" className="max-w-5xl w-full mb-12">
                    <h2 className="text-3xl text-green-500 text-center mb-6">Features of MediConnect 🚀</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">1. Hospital Search</h3>
                            <p className="text-center">
                                Easily search and find hospitals or clinics near you based on location, specialties, or ratings.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">2. Appointment Booking</h3>
                            <p className="text-center">
                                Book appointments with healthcare professionals instantly, with a choice of available time slots.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">3. Online Consultations</h3>
                            <p className="text-center">
                                Access online consultations with doctors via video or chat for non-emergency health issues.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">4. Health Tips</h3>
                            <p className="text-center">
                                Get personalized health tips and recommendations based on your health data and preferences.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">5. Patient Reviews</h3>
                            <p className="text-center">
                                Read reviews and ratings of hospitals, doctors, and other healthcare providers to make informed decisions.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl text-green-500 mb-4">6. Prescription Management</h3>
                            <p className="text-center">
                                Keep track of your prescriptions and appointments directly within the app, and get reminders for follow-ups.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="owner-info" className="max-w-5xl w-full text-center mb-12">
                    <h2 className="text-3xl text-green-500 mb-4">About the Developer 🚀</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Hello! I’m Deepak Prakash Kusumkar, the developer behind MediConnect. I’m a passionate web developer with a keen interest in creating innovative solutions to improve healthcare. MediConnect is a product of my dedication to using technology for the betterment of the healthcare system. Through this platform, I aim to make healthcare more accessible, efficient, and user-friendly for everyone.
                    </p>
                    <h3 className="text-xl text-green-500 mb-4">Connect with Me</h3>
                    <ul className="text-lg text-gray-700">
                        <li className="mb-2">
                            <a href="https://github.com/DeepakKusumkar" className="hover:text-pink-400">
                                GitHub: DeepakKusumkar
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="https://www.linkedin.com/in/deepak-kusumkar/" className="hover:text-pink-400">
                                LinkedIn: Deepak Kusumkar
                            </a>
                        </li>
                    </ul>
                </section>

                <section id="contact" className="max-w-5xl w-full text-center">
                    <h2 className="text-3xl text-green-500 mb-4">Contact Information 📞</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        For any inquiries or feedback, feel free to reach out. Im always open to suggestions and collaboration opportunities.
                    </p>
                    <ul className="text-lg text-gray-700">
                        <li className="mb-2">
                            <span className="font-semibold">Email:</span> deepak@example.com
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Phone:</span> +91 9370387851
                        </li>
                    </ul>
                </section>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-100 py-4 text-center">
                <p className="text-sm text-gray-600">
                    © 2024 MediConnect. All rights reserved. Built with 💻 by Deepak Prakash Kusumkar.
                </p>
            </footer>
        </div>
    );
};
