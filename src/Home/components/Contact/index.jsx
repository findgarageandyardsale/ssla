import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
// import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser";
import { Snackbar } from "../../../components/Snackbar";

const EMAILJS_SERVICE_ID = "service_o78wdau";
const EMAILJS_TEMPLATE_ID = "template_mzgbzts";
const EMAILJS_PUBLIC_KEY = "1OyQZZKDBZCipeCP0";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      setSnackbar({
        isVisible: true,
        message: "Please fill in all the fields",
        type: "error",
      });
      return;
    }

    const payload = {
      name: formData?.name,
      email: formData?.email,
      message: formData?.message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID, // e.g., "service_xyz123"
        EMAILJS_TEMPLATE_ID, // e.g., "template_abc456"
        payload,
        EMAILJS_PUBLIC_KEY // e.g., "user_abc789"
      )
      .then(
        () => {
          setSnackbar({
            isVisible: true,
            message: "Message sent successfully!",
            type: "success",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email error:", error.text);
          setSnackbar({
            isVisible: true,
            message: "Failed to send message. Please try again.",
            type: "error",
          });
        }
      );
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, isVisible: false }));
  };
  return (
    <section className="min-h-screen bg-white py-8 sm:py8 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500">
            CONTACT
          </h2>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]">
            {/* Left Side - Contact Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
                Leave us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base border-2 border-gray-200 rounded-full focus:border-orange-500 focus:ring-0 transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base border-2 border-gray-200 rounded-full focus:border-orange-500 focus:ring-0 transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 sm:px-6 py-4 text-sm sm:text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-0 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Right Side - Contact Information */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gray-50 lg:bg-white">
              <div className="space-y-6 sm:space-y-8 mb-8">
                {/* Address */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      9989 LAUREL CANYON BLVD,
                      <br />
                      PACOIMA, CA, 91331
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                      NATASHA KAUR (630) 267-3480
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                      JOGINDER SINGH SIDHU (818) 266-4757
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700">
                    cksssla1997@gmail.com
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-3 sm:space-x-4">
                  {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div> */}
                  {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div> */}
                  {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div> */}
                  {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div> */}
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3297.8924243198694!2d-118.43041231603763!3d34.25128853780565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29117189f92b9%3A0x4d5aed0149c92e5f!2s9989%20Laurel%20Canyon%20Blvd%2C%20Arleta%2C%20CA%2091331!5e0!3m2!1sen!2sus!4v1752461690064!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={closeSnackbar}
      />
    </section>
  );
}
