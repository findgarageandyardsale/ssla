import React from 'react';
import { useForm } from 'react-hook-form';

const MusicRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission here
  };

  const watchedValues = watch();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center text-uppercase">
       Gurmat Sangeet Registration Form
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Musical Instruments Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Select Musical Instruments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('instruments.vocal')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Vocal</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('instruments.tabla')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Tabla</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('instruments.dilruba')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Dilruba</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('instruments.rabab')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Rabab</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('instruments.gatka')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Gatka</span>
            </label>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Select Time Slots
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('timeSlots.saturdayMorning')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">
                Saturday 12:00 PM to 2:00 PM
              </span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('timeSlots.saturdayAfternoon')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">
                Saturday 3:00 PM to 5:00 PM
              </span>
            </label>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                {...register('studentName', { required: 'Student name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter student name"
              />
              {errors.studentName && (
                <p className="text-red-500 text-sm mt-1">{errors.studentName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 3, message: 'Age must be at least 3' },
                  max: { value: 18, message: 'Age must be 18 or less' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                {...register('parentName', { required: 'Parent/Guardian name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter parent/guardian name"
              />
              {errors.parentName && (
                <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phoneNumber', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9-+\s()]*$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Motivation and Practice Time */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Motivation and Practice Commitment
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What inspires you to learn Gurmat Sangeet? *
            </label>
            <textarea
              {...register('motivation', { required: 'Please share your motivation' })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please share what inspires you to learn Gurmat Sangeet..."
            />
            {errors.motivation && (
              <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How much time will you have every day to practice? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('practiceTime.twentyMinutes')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">20 minutes</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('practiceTime.thirtyMinutes')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">30 minutes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Signatures and Agreement
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Signature *
              </label>
              <div className="border-b-2 border-gray-400 pb-1 mb-2">
                <input
                  type="text"
                  {...register('studentSignature', { required: 'Student signature is required' })}
                  className="w-full bg-transparent border-none outline-none text-gray-700"
                  placeholder="Student signature"
                />
              </div>
              {errors.studentSignature && (
                <p className="text-red-500 text-sm mt-1">{errors.studentSignature.message}</p>
              )}
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  {...register('studentSignatureDate', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.studentSignatureDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.studentSignatureDate.message}</p>
                )}
              </div>
            </div>

            {/* Parent Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Signature *
              </label>
              <div className="border-b-2 border-gray-400 pb-1 mb-2">
                <input
                  type="text"
                  {...register('parentSignature', { required: 'Parent signature is required' })}
                  className="w-full bg-transparent border-none outline-none text-gray-700"
                  placeholder="Parent/Guardian signature"
                />
              </div>
              {errors.parentSignature && (
                <p className="text-red-500 text-sm mt-1">{errors.parentSignature.message}</p>
              )}
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  {...register('parentSignatureDate', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.parentSignatureDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.parentSignatureDate.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Registration
          </button>
        </div>
      </form>

      {/* Debug Section (remove in production) */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Form Data (Debug):</h4>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
};

export default MusicRegistrationForm; 