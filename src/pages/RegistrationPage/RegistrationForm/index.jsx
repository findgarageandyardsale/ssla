import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import {
  InputField,
  RadioField,
  SignatureField,
} from "../../../components/atoms";
import { SelectField } from "../../../components/atoms/SelectField";
import { CheckboxField } from "../../../components/atoms/CheckboxField";
import { TextAreaField } from "../../../components/atoms/TextAreaField";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const RegistrationForm = ({ onSubmit, isSubmitting }) => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  // Set default values from URL parameters
  useEffect(() => {
    if (categoryFromUrl) {
      // Split comma-separated values and set them as an array
      const selectedCategories = categoryFromUrl.split(",").map(cat => cat.trim());
      setValue("language", selectedCategories);
      // Also save to localStorage for popup synchronization
      localStorage.setItem("selectedLanguageCategories", JSON.stringify(selectedCategories));
    }
  }, [categoryFromUrl, setValue]);

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



  // Function to reset form and clear localStorage
  const resetFormAndStorage = () => {
    reset();
    localStorage.removeItem("selectedLanguageCategories");

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

  const onFormSubmit = async (data) => {
    console.log("🚀 Form submission started");
    console.log("📝 Form data:", data);
    console.log("🔍 Checking for potential issues...");

    // Check if contact and emergency info are the same
    const contactInfo = {
      name: `${data.firstName} ${data.lastName}`,
      phone: data.cellPhoneNumber || data.homePhoneNumber,
      address: data.streetAddress || data.address,
      city: data.city,
      zipCode: data.zipCode
    };

    const emergencyInfo = {
      name: data.emergencyContactName,
      phone: data.emergencyContactPhoneNumber,
      address: data.emergencyContactAddress,
      city: data.emergencyContactCity,
      zipCode: data.emergencyContactZipCode
    };

    console.log("📞 Contact Info:", contactInfo);
    console.log("🚨 Emergency Info:", emergencyInfo);

    // Check for missing required fields
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'age', 'gender', 'isReturningStudent',
      'fatherName', 'motherName', 'address', 'city', 'state', 'zipCode',
      'homePhoneNumber', 'cellPhoneNumber', 'email',
      'emergencyContactName', 'emergencyContactPhoneNumber',
      'emergencyContactAddress', 'emergencyContactCity', 'emergencyContactZipCode',
      'language', 'doYouSpeakPunjabi', 'canYouReadAndWritePunjabi',
      'howMuchTimeYouWillHaveEverydayToDoYourHomework',
      'studentSignatureDate', 'parentSignatureDate'
    ];

    // Add conditional required field for returning students
    if (data.isReturningStudent === 'yes' && !data.completedCourses) {
      console.log("❌ Missing completed courses for returning student");
    }

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      console.log("❌ Missing required fields:", missingFields);
    } else {
      console.log("✅ All required fields are filled");
    }

    if (onSubmit) {
      try {
        console.log("📤 Calling onSubmit...");
        await onSubmit(data);
        console.log("✅ onSubmit completed successfully");
        // Reset form and clear localStorage after successful submission
        resetFormAndStorage();
      } catch (error) {
        console.error("❌ Error during form submission:", error);
      }
    }
  };

  const watchedValues = watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Registration Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Welcome to our school! Please fill out the form below to complete
            your registration. We&apos;re excited to have you join our
            community.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 sm:p-6 lg:p-8">
            {/* Language Selection */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Courses
                </h2>
              </div>
              <CheckboxField
                label="Courses"
                name="language"
                value={watch("language") || []}
                required
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
                  required: "Language preference is required",
                })}
                error={errors.language}
              />
            </div>

            {/* Personal Information */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                    max: { value: 120, message: "Age must be less than 120" },
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
                  {...register("gender", { required: "Gender is required" })}
                  error={errors.gender}
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
                  <div className="md:col-span-2">
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
              </div>
            </div>

            {/* Family Information */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Family Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                  placeholder="Enter your apartment no"
                  {...register("apartmentNo")}
                  error={errors.apartmentNo}
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
                  {...register("zipCode", { required: "ZIP code is required" })}
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
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Emergency Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

            {/* Extra Information */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Extra Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                    required: "Do you speak punjabi is required",
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
                    required: "Can you read and write punjabi is required",
                  })}
                  error={errors.canYouReadAndWritePunjabi}
                />

                <TextAreaField
                  label="What inspires you to learn Punjabi language, Sikh history and philosophy?"
                  name="whatInspiresYou"
                  required
                  placeholder="Enter your what inspires you"
                  rows={4}
                  {...register("whatInspiresYou", {
                    required: "What inspires you is required",
                  })}
                  error={errors.whatInspiresYou}
                />

                <TextAreaField
                  label="What is your favorite Sikh book?"
                  name="favoriteSikhBook"
                  required
                  placeholder="Enter your favorite Sikh book"
                  rows={4}
                  {...register("favoriteSikhBook", {
                    required: "Favorite Sikh book is required",
                  })}
                  error={errors.favoriteSikhBook}
                />

                <RadioField
                  label="How much time you will have everyday to do your homework?"
                  name="howMuchTimeYouWillHaveEverydayToDoYourHomework"
                  required
                  options={[
                    { value: "15minutes", label: "15 minutes" },
                    { value: "20minutes", label: "20 minutes" },
                    { value: "25minutes", label: "25 minutes" },
                  ]}
                  {...register(
                    "howMuchTimeYouWillHaveEverydayToDoYourHomework",
                    {
                      required:
                        "How much time you will have everyday to do your homework is required",
                    }
                  )}
                  error={errors.howMuchTimeYouWillHaveEverydayToDoYourHomework}
                />
              </div>
            </div>

            {/* Signature Section */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Digital Signatures
                </h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Student Signature */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                    Student Signature
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <SignatureField
                      label="Draw Your Signature"
                      name="studentSignature"
                      required
                      onSignatureChange={(result) => {
                        if (result) {
                          console.log("Student signature uploaded:", result);
                        }
                      }}
                    />
                    <div className="space-y-3 sm:space-y-4">
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
                      <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium mb-1">Instructions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Draw your signature in the canvas above</li>
                          <li>Click &quot;Save&quot; to store the signature</li>
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
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                    Parent/Guardian Signature
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                    <div className="space-y-3 sm:space-y-4">
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
                      <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium mb-1">Instructions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Draw the parent/guardian signature in the canvas
                            above
                          </li>
                          <li>Click &quot;Save&quot; to store the signature</li>
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
            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>

        {/* Debug Section (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
              Form Data (Debug)
            </h3>
            <pre className="text-xs sm:text-sm text-gray-600 overflow-auto bg-white p-3 sm:p-4 rounded-lg border">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
