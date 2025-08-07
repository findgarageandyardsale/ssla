import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import logo from "../../../assets/ssla_logo_transparent_.png";
import { ScrollToTopLink } from "../../../components/common/ScrollToTopLink";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="bg-[#f48b49] text-white">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-6 md:gap-8">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="text-center lg:text-left">
                <img
                  src={logo}
                  alt="logo"
                  className="w-32 h-32 sm:w-32 sm:h-32 md:w-52 md:h-52 object-contain p-"
                />
              </div>
            </div>

            {/* Rules Section */}
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-3 text-center lg:text-left">
                Rules and Regulations
              </h3>
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <ScrollToTopLink
                  to="/homework-and-home-study"
                  className="text-sm sm:text-base md:text-lg text-white hover:text-orange-100 transition-colors duration-200 block py-1"
                >
                  Homework and Home Study
                </ScrollToTopLink>
                <ScrollToTopLink
                  to="/to-and-from-school"
                  className="text-sm sm:text-base md:text-lg text-white hover:text-orange-100 transition-colors duration-200 block py-1"
                >
                  To and from school
                </ScrollToTopLink>
                <ScrollToTopLink
                  to="/general-rules"
                  className="text-sm sm:text-base md:text-lg text-white hover:text-orange-100 transition-colors duration-200 block py-1"
                >
                  General Rules
                </ScrollToTopLink>
                <ScrollToTopLink
                  to="/discipline-policies"
                  className="text-sm sm:text-base md:text-lg text-white hover:text-orange-100 transition-colors duration-200 block py-1"
                >
                  Discipline Policies
                </ScrollToTopLink>
                <ScrollToTopLink
                  to="/classroom-rules"
                  className="text-sm sm:text-base md:text-lg text-white hover:text-orange-100 transition-colors duration-200 block py-1"
                >
                  Classroom Rules
                </ScrollToTopLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white"></div>

      {/* Bottom Bar */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-1 sm:py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Copyright/Stats */}
          <div className="flex items-center space-x-2">
            <p>© {new Date().getFullYear()} All rights reserved</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              href="#youtube"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fff] bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Youtube className="w-3 h-3 sm:w-4 sm:h-4 text-[#fff]" />
            </a>
            <a
              href="#instagram"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fff] bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-[#fff]" />
            </a>
            <a
              href="#facebook"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fff] bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-[#fff]" />
            </a>
            <a
              href="#twitter"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fff] bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-[#fff]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
