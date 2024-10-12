// import React from 'react';

import Navbar from "./Navbar";

const ServiceSection = () => {
  // Sample services array for MediConnect
  const services = [
    {
      title: 'Telemedicine Consultations',
      description: 'Connect with healthcare professionals via video calls for remote consultations, ensuring convenient access to medical advice.',
      icon: '📞',
    },
    {
      title: 'Appointment Scheduling',
      description: 'Easily book, reschedule, and cancel appointments with healthcare providers through an intuitive online interface.',
      icon: '📅',
    },
    {
      title: 'Patient Management System',
      description: 'Streamline patient information management, including records, history, and treatment plans, for better healthcare delivery.',
      icon: '👥',
    },
    {
      title: 'Prescription Management',
      description: 'Manage and refill prescriptions electronically, ensuring patients have easy access to their medications.',
      icon: '💊',
    },
    {
      title: 'Health Monitoring Tools',
      description: 'Utilize integrated tools for tracking vital signs, health metrics, and reminders for medication adherence.',
      icon: '📈',
    },
    {
      title: 'Emergency Services',
      description: 'Quick access to emergency services and information, ensuring prompt care during critical situations.',
      icon: '🚑',
    },
    {
      title: 'Healthcare Analytics',
      description: 'Gain insights through analytics tools to monitor health trends, patient outcomes, and service efficiency.',
      icon: '📊',
    },
    {
      title: 'Secure Data Management',
      description: 'Ensure patient data security with encrypted storage and compliant practices for maintaining privacy and confidentiality.',
      icon: '🔒',
    },
  ];

  // Function to handle Go Back button

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Services Section */}
      <div className="px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md flex flex-col items-start"
            >
              <div className="text-3xl">{service.icon}</div>
              <h2 className="text-xl font-semibold mt-2">{service.title}</h2>
              <p className="mt-1 text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ServiceSection;
