import React from 'react';
import RegistrationForm from '../../components/RegistrationForm';

const MusicRegistrationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Music Class Registration
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register for our traditional music classes including Vocal, Tabla, Dilruba, Rabab, and Gatka. 
            Choose your preferred time slots and instruments.
          </p>
        </div>
        
        <RegistrationForm />
      </div>
    </div>
  );
};

export default MusicRegistrationPage; 