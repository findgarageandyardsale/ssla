// import ssla_logo from "../../../assets/ssla_logo_transparent.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
// import ssla_flyer from "../../../assets/ssla_flyer.jpg";
// import { HeaderSection } from "../HeaderSection";
import slider_1 from "../../../assets/slider/slider1.png";
import slider_2 from "../../../assets/slider/slider2.png";
import slider_3 from "../../../assets/slider/slider3.png";
import slider_4 from "../../../assets/slider/slider4.png";
const Header = () => {
  return (
    <main className="w-full">
      <div className="flex flex-col">
        {/* Top Section - Orange */}
        {/* <HeaderSection/> */}

        {/* Bottom Section - Content */}

        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-6">
          {/* Carousel on the Left */}
          <div className="w-full md:w-1/3 lg:w-1/4 rounded-xl overflow-hidden shadow-md mt-7">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={10}
              slidesPerView={1}
            >
              <SwiperSlide>
                <img
                  src={slider_1}
                  alt="Slide 1"
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={slider_2}
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={slider_3}
                  alt="Slide 3"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={slider_4}
                  alt="Slide 4"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Text Content on the Right */}
          <div className="w-full md:w-2/3 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-[#61655F] text-2xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-5 md:mb-6 font-bold text-center md:text-left">
                Our Philosophy
              </div>

              <div className="text-brand-gray text-xs sm:text-xl md:text-xl lg:text-xl font-roboto mb-10 sm:mb-7 md:mb-10 leading-relaxed text-center md:text-left">
                We recognize and believe in ancient belief that the process of
                all education is &quot;Intellectual preparation for spiritual
                progress.&quot;
              </div>

              <div className="text-[#61655F] text-2xl sm:text-2xl md:text-3xl lg:text-3xl mb-4 sm:mb-5 md:mb-6 font-bold text-center md:text-left">
                Our Vision
              </div>

              <div className="text-brand-gray text-xs sm:text-xl md:text-xl lg:text-xl font-roboto mb-6 sm:mb-7 md:mb-8 leading-relaxed text-center md:text-left">
                The mission of the school is to effectively teach students of
                all ages to speak, read and write Gurmukhi. Along with teaching
                the language, the program strives to increase awareness of Sikh
                theology, Sikh history, appreciation of Gurmat Sangeet, and an
                understanding of how Shabad Guru helps us to achieve our daily
                and life long goals. We believe that the more nurtured and
                informed we are, the more positive and vital our contribution
                will be to our community, society, country, and the world at
                large.
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <ScrollToTopLink
                  to="/about-us"
                  className="bg-[#E84B23] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#d13d1a] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  About Us
                </ScrollToTopLink>
                <ScrollToTopLink
                  to="/contact-us"
                  className="bg-[#E84B23] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#d13d1a] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Contact Us
                </ScrollToTopLink>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
