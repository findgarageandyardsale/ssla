import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Home,
  Shield,
} from "lucide-react";
import ssla_logo from "../../assets/ssla_logo.png";
import { InputField } from "../atoms/InputField";
import { SelectField } from "../atoms/SelectField";
import { TextAreaField } from "../atoms/TextAreaField";
import { CheckboxField } from "../atoms/CheckboxField";
import { RadioField } from "../atoms/RadioField";

export const RegisterForm = ({
  onSubmit,
  submitStatus,
  isSubmitting,
  testEmailJS,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      isReturningStudent: "",
      completedCourses: "",
      fatherName: "",
      motherName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      occupation: "",
      emergencyContact: "",
      emergencyPhone: "",
      // Additional fields for comprehensive registration
      apartmentNo: "",
      state: "",
      homePhoneNumber: "",
      cellPhoneNumber: "",
      emergencyContactAddress: "",
      emergencyContactCity: "",
      emergencyContactZipCode: "",
      language: [],
      doYouSpeakPunjabi: "",
      canYouReadAndWritePunjabi: "",
      whatInspiresYou: "",
      favoriteSikhBook: "",
      howMuchTimeYouWillHaveEverydayToDoYourHomework: "",
      // Signature fields
      signatureOfStudent: null,
      dateOfSignature: "",
      signatureOfParent: null,
      dateOfSignatureOfParent: "",
    },
  });

  const onFormSubmit = async (data) => {
    console.log("Form data submitted:", data);
    await onSubmit(data);
    reset(); // Reset form after successful submission

    // Clear signature fields by clearing the canvas
    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });

    // Clear signature data from localStorage
    localStorage.removeItem('form_signatures');
  };

  const watchedValues = watch();

  // Watch for form changes and sync with localStorage
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "language" && value.language) {
        // Save language selections to localStorage for popup synchronization
        localStorage.setItem("selectedLanguageCategories", JSON.stringify(value.language));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-xl mb-6">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4">
              Student Registration Form
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete your registration with all required information. We'll
              send you a beautiful confirmation email with your details.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Logo and Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-10">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <img
                      src={ssla_logo}
                      alt="SSLA Logo"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      SSLA School
                    </h2>
                    <p className="text-blue-100 text-lg">
                      Student Registration Portal
                    </p>
                  </div>
                </div>
                <div className="text-right text-white">
                  <div className="text-lg opacity-90 font-semibold">
                    Registration Form
                  </div>
                  <div className="text-sm opacity-75">
                    Academic Year 2024-25
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="p-8 space-y-12"
            >
              {/* Language Selection */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Language Preference
                  </h2>
                </div>
                <CheckboxField
                  label="Select your language preferences"
                  name="language"
                  value={watch("language") || []}
                  options={[
                    { value: "Punjabi Language", label: "Punjabi Language" },
                    { value: "Gurmat", label: "Gurmat" },
                    {
                      value: "Gurbani Santhya",
                      label: "Gurbani Santhya",
                    },
                    { value: "Keertan", label: "Keertan" },

                    {
                      value: "Gurmat (age 18+)",
                      label: "Gurmat (age 18+)",
                    },
                  ]}
                  {...register("language", {
                    required: "Please select at least one language preference",
                  })}
                  error={errors.language}
                />
              </div>

              {/* Personal Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="First Name"
                    required
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    error={errors.firstName}
                    placeholder="Enter your first name"
                    icon={User}
                  />

                  <InputField
                    label="Middle Name"
                    {...register("middleName")}
                    error={errors.middleName}
                    placeholder="Enter your middle name"
                  />

                  <InputField
                    label="Last Name"
                    required
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    error={errors.lastName}
                    placeholder="Enter your last name"
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    required
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={errors.email}
                    placeholder="your@email.com"
                    icon={Mail}
                  />

                  <InputField
                    label="Date of Birth"
                    type="date"
                    required
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                    error={errors.dateOfBirth}
                    icon={Calendar}
                  />

                  <InputField
                    label="Age"
                    type="number"
                    required
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 1, message: "Age must be at least 1" },
                      max: { value: 120, message: "Age must be less than 120" },
                    })}
                    error={errors.age}
                    placeholder="Enter your age"
                  />

                  <SelectField
                    label="Gender"
                    required
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    error={errors.gender}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />

                  <RadioField
                    label="Returning Student"
                    name="isReturningStudent"
                    required
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    {...register("isReturningStudent", { required: "Please indicate if you are a returning student" })}
                    error={errors.isReturningStudent}
                  />

                  {watchedValues.isReturningStudent === "yes" && (
                    <div className="md:col-span-2 lg:col-span-3">
                      <TextAreaField
                        label="List courses completed at SSLA"
                        name="completedCourses"
                        required
                        placeholder="Please list all courses you have completed at SSLA"
                        {...register("completedCourses", { 
                          required: "Please list completed courses for returning students" 
                        })}
                        error={errors.completedCourses}
                      />
                    </div>
                  )}

                  <InputField
                    label="Father's Name"
                    required
                    {...register("fatherName", {
                      required: "Father's name is required",
                      minLength: {
                        value: 2,
                        message: "Father's name must be at least 2 characters",
                      },
                    })}
                    error={errors.fatherName}
                    placeholder="Enter father's name"
                  />

                  <InputField
                    label="Mother's Name"
                    required
                    {...register("motherName", {
                      required: "Mother's name is required",
                      minLength: {
                        value: 2,
                        message: "Mother's name must be at least 2 characters",
                      },
                    })}
                    error={errors.motherName}
                    placeholder="Enter mother's name"
                  />

                  <InputField
                    label="Occupation"
                    {...register("occupation")}
                    error={errors.occupation}
                    placeholder="Your occupation"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-6">
                  <InputField
                    label="Street Address"
                    required
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                    })}
                    error={errors.address}
                    placeholder="123 Main Street"
                    icon={Home}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InputField
                      label="Apartment No"
                      // required
                      // {...register("apartmentNo", {
                      //   required: "Apartment number is required"
                      // })}
                      error={errors.apartmentNo}
                      placeholder="Apt 123"
                    />

                    <InputField
                      label="City"
                      required
                      {...register("city", {
                        required: "City is required",
                        minLength: {
                          value: 2,
                          message: "City must be at least 2 characters",
                        },
                      })}
                      error={errors.city}
                      placeholder="New York"
                    />

                    <InputField
                      label="State/Province"
                      required
                      {...register("state", {
                        required: "State is required",
                      })}
                      error={errors.state}
                      placeholder="NY"
                    />

                    <InputField
                      label="ZIP Code"
                      required
                      {...register("zipCode", {
                        required: "ZIP code is required",
                        pattern: {
                          value: /^\d{5}(-\d{4})?$/,
                          message: "Invalid ZIP code format",
                        },
                      })}
                      error={errors.zipCode}
                      placeholder="10001"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="Home Phone Number"
                      required
                      type="tel"
                      {...register("homePhoneNumber", {
                        required: "Home phone number is required",
                        pattern: {
                          value: /^[+]?[1-9][\d]{0,15}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      error={errors.homePhoneNumber}
                      placeholder="+1 (555) 123-4567"
                      icon={Phone}
                    />

                    <InputField
                      label="Cell Phone Number"
                      required
                      type="tel"
                      {...register("cellPhoneNumber", {
                        required: "Cell phone number is required",
                        pattern: {
                          value: /^[+]?[1-9][\d]{0,15}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      error={errors.cellPhoneNumber}
                      placeholder="+1 (555) 123-4567"
                      icon={Phone}
                    />

                    <InputField
                      label="Country"
                      required
                      {...register("country", {
                        required: "Country is required",
                      })}
                      error={errors.country}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Emergency Contact
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Emergency Contact Name"
                    required
                    {...register("emergencyContact", {
                      required: "Emergency contact name is required",
                    })}
                    error={errors.emergencyContact}
                    placeholder="Contact person name"
                  />

                  <InputField
                    label="Emergency Contact Phone"
                    type="tel"
                    required
                    {...register("emergencyPhone", {
                      required: "Emergency phone is required",
                      pattern: {
                        value: /^[+]?[1-9][\d]{0,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    error={errors.emergencyPhone}
                    placeholder="+1 (555) 123-4567"
                    icon={Phone}
                  />
                </div>

                <div className="mt-6 space-y-6">
                  <InputField
                    label="Emergency Contact Address"
                    required
                    {...register("emergencyContactAddress", {
                      required: "Emergency contact address is required",
                    })}
                    error={errors.emergencyContactAddress}
                    placeholder="Emergency contact address"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Emergency Contact City"
                      required
                      {...register("emergencyContactCity", {
                        required: "Emergency contact city is required",
                      })}
                      error={errors.emergencyContactCity}
                      placeholder="Emergency contact city"
                    />

                    <InputField
                      label="Emergency Contact ZIP Code"
                      required
                      {...register("emergencyContactZipCode", {
                        required: "Emergency contact ZIP code is required",
                      })}
                      error={errors.emergencyContactZipCode}
                      placeholder="Emergency contact ZIP code"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Additional Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <RadioField
                    label="Do you speak Punjabi?"
                    name="doYouSpeakPunjabi"
                    required
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "somewhat", label: "Somewhat" },
                    ]}
                    {...register("doYouSpeakPunjabi", {
                      required: "Please select an option",
                    })}
                    error={errors.doYouSpeakPunjabi}
                  />

                  <RadioField
                    label="Can you read and write Punjabi?"
                    name="canYouReadAndWritePunjabi"
                    required
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "somewhat", label: "Somewhat" },
                    ]}
                    {...register("canYouReadAndWritePunjabi", {
                      required: "Please select an option",
                    })}
                    error={errors.canYouReadAndWritePunjabi}
                  />
                </div>

                <div className="mt-8 space-y-6">
                  <TextAreaField
                    label="What inspires you to learn Punjabi language, Sikh history and philosophy?"
                    name="whatInspiresYou"
                    required
                    placeholder="Please share what motivates you to learn..."
                    rows={4}
                    {...register("whatInspiresYou", {
                      required: "This field is required",
                    })}
                    error={errors.whatInspiresYou}
                  />

                  <TextAreaField
                    label="What is your favorite Sikh book?"
                    name="favoriteSikhBook"
                    required
                    placeholder="Please share your favorite Sikh book..."
                    rows={3}
                    {...register("favoriteSikhBook", {
                      required: "This field is required",
                    })}
                    error={errors.favoriteSikhBook}
                  />

                  <RadioField
                    label="How much time will you have everyday to do your homework?"
                    name="howMuchTimeYouWillHaveEverydayToDoYourHomework"
                    required
                    options={[
                      { value: "15minutes", label: "15 minutes" },
                      { value: "20minutes", label: "20 minutes" },
                      { value: "25minutes", label: "25 minutes" },
                    ]}
                    {...register(
                      "howMuchTimeYouWillHaveEverydayToDoYourHomework",
                      { required: "Please select an option" }
                    )}
                    error={
                      errors.howMuchTimeYouWillHaveEverydayToDoYourHomework
                    }
                  />
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-800">
                        Registration Successful!
                      </h3>
                      <p className="text-green-700 mt-1">
                        Your registration has been submitted successfully. A
                        beautiful confirmation email has been sent to your email
                        address.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-red-800">
                        Submission Error
                      </h3>
                      <p className="text-red-700 mt-1">
                        There was an error submitting your registration. Please
                        check your information and try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-200">
                {testEmailJS && (
                  <button
                    type="button"
                    onClick={testEmailJS}
                    className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                  >
                    Test EmailJS
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed transform-none"
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>
            </form>
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
