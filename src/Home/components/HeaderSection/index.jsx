import { MapPin } from "lucide-react";
import ssla_logo from "../../../assets/ssla_logo_transparent_.png";

export const HeaderSection = () => {
  return (
    <div className="relative bg-[#f48b49] text-white p-4 sm:p-6 md:p-8 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-8 gap-4 sm:gap-8 md:gap-20">
        {/* Logo */}
        <div className="order-1 md:order-1">
          <img
            src={ssla_logo}
            alt="logo"
            className="w-32 h-32 sm:w-32 sm:h-32 md:w-64 md:h-64 object-contain p-4"
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left md:ml-8 order-2 md:order-2">
          <div
            className="text-lg sm:text-xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 mt-5"
            style={{ fontFamily: "serif" }}
          >
            ਵਿਦਿਆ ਵਿਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
            <span className="block sm:inline">SIKH SCHOOL OF LOS ANGELES</span>
            <div className="block">KHALSA CARE FOUNDATION</div>
          </h1>
          <div className="flex items-start justify-center md:justify-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-1 flex-shrink-0 text-red-600" />
            <div className="mb-8">
              <span className="block sm:inline">9989 LAUREL CANYON BLVD.,</span>
              <span className="block sm:inline sm:ml-2">
                PACOIMA, CA, 91331
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Your original bottom curved ribbon */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#4A90E2", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#4A90E2", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Curved ribbon shape - More pronounced curve */}
          <path
            d="M 0 80 Q 300 20 600 40 Q 900 60 1200 30 L 1200 100 L 0 100 Z"
            fill="url(#blueGradient)"
            stroke="none"
          />

          {/* Text in the center between curves */}
          <text
            fontFamily="serif"
            fontSize="24"
            fill="white"
            fontStyle="italic"
            textAnchor="middle"
            x="600"
            y="80"
          >
            Celebrating 25+ years of Learning and Teaching
          </text>
        </svg>
      </div>
    </div>
  );
};
