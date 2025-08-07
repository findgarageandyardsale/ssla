import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputField,
  RadioField,
  SignatureField,
} from "../../../components/atoms";
import {
  User,
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { SelectField } from "../../../components/atoms/SelectField";
import { useNavigate, useSearchParams } from "react-router-dom";

export const GSForm = ({ onSubmit, isSubmitting }) => {
  const [searchParams] = useSearchParams();
  const instrumentFromUrl = searchParams.get("instrument");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const watchedValues = watch();

  // Set default values from URL parameters
  useEffect(() => {
    if (instrumentFromUrl) {
      setValue("instruments", instrumentFromUrl);
    }
  }, [instrumentFromUrl, setValue]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Gurmat Sangeet Registration Form
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Welcome to our school! Please fill out the form below to complete
              your registration. We&apos;re excited to have you join our
              community.
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Music Class Registration Form
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Musical Instruments Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Select Musical Instruments
                  </h3>
                  <RadioField
                    label=""
                    name="instruments"
                    value={watchedValues.instruments}
                    onChange={(e) => {
                      setValue("instruments", e.target.value);
                    }}
                    options={[
                      { value: "vocal", label: "Vocal" },
                      { value: "tabla", label: "Tabla" },
                      { value: "dilruba", label: "Dilruba" },
                      { value: "rabab", label: "Rabab" },
                    ]}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  />
                </div>

                {/* Time Slots Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Timing Slots
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("timeSlots.saturdayMorning")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700 font-medium">
                        Sunday 2:00 PM to 4:00 PM
                      </span>
                    </label>

                  </div>
                </div>

                {/* Student Information */}
                {/* <div className="bg-gray-50 p-4 rounded-lg">
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
        </div> */}

                {/* Signatures */}

                {/* Debug Section (remove in production) */}
                {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Form Data (Debug):</h4>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>
      )} */}

                {/* Personal Information */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="First Name"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Enter your first name"
                      icon={User}
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      error={errors.firstName}
                    />

                    <InputField
                      label="Middle Name"
                      name="middleName"
                      type="text"
                      placeholder="Enter your middle name"
                      {...register("middleName")}
                      error={errors.middleName}
                    />

                    <InputField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Enter your last name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      error={errors.lastName}
                    />

                    <InputField
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      required
                      icon={Calendar}
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                      error={errors.dateOfBirth}
                    />

                    <InputField
                      label="Age"
                      name="age"
                      type="number"
                      required
                      placeholder="Enter your age"
                      {...register("age", {
                        required: "Age is required",
                        min: { value: 1, message: "Age must be at least 1" },
                        max: {
                          value: 120,
                          message: "Age must be less than 120",
                        },
                      })}
                      error={errors.age}
                    />

                    <SelectField
                      label="Gender"
                      name="gender"
                      required
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      error={errors.gender}
                    />
                  </div>
                </div>

                {/* Family Information */}
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Family Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Father Name"
                      name="fatherName"
                      type="text"
                      required
                      placeholder="Enter your father name"
                      {...register("fatherName", {
                        required: "Father name is required",
                      })}
                      error={errors.fatherName}
                    />

                    <InputField
                      label="Mother Name"
                      name="motherName"
                      type="text"
                      required
                      placeholder="Enter your mother name"
                      {...register("motherName", {
                        required: "Mother name is required",
                      })}
                      error={errors.motherName}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Contact Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <InputField
                        label="Address"
                        name="streetAddress"
                        type="text"
                        required
                        placeholder="Enter your street address"
                        {...register("streetAddress", {
                          required: "Street address is required",
                        })}
                        error={errors.streetAddress}
                      />
                    </div>

                    <InputField
                      label="Apartment No"
                      name="apartmentNo"
                      type="text"
                      // required
                      placeholder="Enter your apartment no"
                    // {...register("apartmentNo", { required: "Apartment no is required" })}
                    // error={errors.apartmentNo}
                    />

                    <InputField
                      label="City"
                      name="city"
                      type="text"
                      required
                      placeholder="Enter your city"
                      {...register("city", { required: "City is required" })}
                      error={errors.city}
                    />

                    <InputField
                      label="State/Province"
                      name="state"
                      type="text"
                      required
                      placeholder="Enter your state"
                      {...register("state", { required: "State is required" })}
                      error={errors.state}
                    />

                    <InputField
                      label="ZIP/Postal Code"
                      name="zipCode"
                      type="text"
                      required
                      placeholder="Enter ZIP code"
                      {...register("zipCode", {
                        required: "ZIP code is required",
                      })}
                      error={errors.zipCode}
                    />

                    <InputField
                      label="Home Phone Number"
                      name="homePhoneNumber"
                      type="text"
                      required
                      placeholder="Enter your home phone number"
                      icon={Phone}
                      {...register("homePhoneNumber", {
                        required: "Home phone number is required",
                      })}
                      error={errors.homePhoneNumber}
                    />

                    <InputField
                      label="Cell Phone Number"
                      name="cellPhoneNumber"
                      type="text"
                      required
                      placeholder="Enter your cell phone number"
                      icon={Phone}
                      {...register("cellPhoneNumber", {
                        required: "Cell phone number is required",
                      })}
                      error={errors.cellPhoneNumber}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      icon={Mail}
                      {...register("email", { required: "Email is required" })}
                      error={errors.email}
                    />
                  </div>
                </div>

                {/* Emergency Contact Information */}
                <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Emergency Contact Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <InputField
                      label="Emergency Contact Name"
                      name="emergencyContactName"
                      type="text"
                      required
                      placeholder="Enter your emergency contact name"
                      {...register("emergencyContactName", {
                        required: "Emergency contact name is required",
                      })}
                      error={errors.emergencyContactName}
                    />

                    <InputField
                      label="Emergency Contact Phone Number"
                      name="emergencyContactPhoneNumber"
                      type="text"
                      required
                      placeholder="Enter your emergency contact phone number"
                      icon={Phone}
                      {...register("emergencyContactPhoneNumber", {
                        required: "Emergency contact phone number is required",
                      })}
                      error={errors.emergencyContactPhoneNumber}
                    />

                    <InputField
                      label="Emergency Contact Address"
                      name="emergencyContactAddress"
                      type="text"
                      required
                      placeholder="Enter your emergency contact address"
                      {...register("emergencyContactAddress", {
                        required: "Emergency contact address is required",
                      })}
                      error={errors.emergencyContactAddress}
                    />

                    <InputField
                      label="Emergency Contact Apartment No"
                      name="emergencyContactApartmentNo"
                      type="text"
                      placeholder="Enter your emergency contact apartment no"
                      {...register("emergencyContactApartmentNo")}
                      required={false}
                    />

                    <InputField
                      label="Emergency Contact City"
                      name="emergencyContactCity"
                      type="text"
                      required
                      placeholder="Enter your emergency contact city"
                      {...register("emergencyContactCity", {
                        required: "Emergency contact city is required",
                      })}
                      error={errors.emergencyContactCity}
                    />

                    <InputField
                      label="Emergency Contact Zip Code"
                      name="emergencyContactZipCode"
                      type="text"
                      required
                      placeholder="Enter your emergency contact zip code"
                      {...register("emergencyContactZipCode", {
                        required: "Emergency contact zip code is required",
                      })}
                      error={errors.emergencyContactZipCode}
                    />
                  </div>
                </div>

                {/* Signature Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Digital Signatures
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {/* Student Signature */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Student Signature
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SignatureField
                          label="Draw Your Signature"
                          name="studentSignature"
                          required
                          onSignatureChange={(result) => {
                            if (result) {
                              console.log(
                                "Student signature uploaded:",
                                result
                              );
                            }
                          }}
                        />
                        <div className="space-y-4">
                          <InputField
                            label="Date of Signature"
                            name="studentSignatureDate"
                            type="date"
                            required
                            icon={Calendar}
                            {...register("studentSignatureDate", {
                              required: "Date of signature is required",
                            })}
                            error={errors.studentSignatureDate}
                          />
                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium mb-1">Instructions:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Draw your signature in the canvas above</li>
                              <li>
                                Click &quot;Save&quot; to store the signature
                              </li>
                              <li>
                                Click &quot;Upload&quot; to save to our secure
                                storage
                              </li>
                              <li>You can also download your signature</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parent/Guardian Signature */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Parent/Guardian Signature
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SignatureField
                          label="Draw Parent/Guardian Signature"
                          name="parentSignature"
                          required
                          onSignatureChange={(result) => {
                            if (result) {
                              console.log("Parent signature uploaded:", result);
                            }
                          }}
                        />
                        <div className="space-y-4">
                          <InputField
                            label="Date of Parent/Guardian Signature"
                            name="parentSignatureDate"
                            type="date"
                            required
                            icon={Calendar}
                            {...register("parentSignatureDate", {
                              required: "Date of parent signature is required",
                            })}
                            error={errors.parentSignatureDate}
                          />
                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium mb-1">Instructions:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                Draw the parent/guardian signature in the canvas
                                above
                              </li>
                              <li>
                                Click &quot;Save&quot; to store the signature
                              </li>
                              <li>
                                Click &quot;Upload&quot; to save to our secure
                                storage
                              </li>
                              <li>You can also download the signature</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Debug Section (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Form Data (Debug)
              </h3>
              <pre className="text-sm text-gray-600 overflow-auto bg-white p-4 rounded-lg border">
                {JSON.stringify(watchedValues, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
