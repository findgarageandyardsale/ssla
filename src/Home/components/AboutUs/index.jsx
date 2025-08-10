import React from 'react';
import about_us from "../../../assets/about_us.png";
import about_us_bg from "../../../assets/about_us_bg.png";
import { useNavigate } from 'react-router-dom';
import { ScrollToTopLink } from '../../../components/common/ScrollToTopLink';

export const AboutUs = ({ fromAboutUsPage = false }) => {
    const navigate = useNavigate();
    return (
        <section className="relative">


            {/* Content Container - Positioned to fit within background */}
            <div className="relative z-10 w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 pt-0">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 h-full">
                        {/* Left Image */}
                        <div className="flex justify-center w-full lg:w-1/2 order-1 lg:order-1">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px]">
                                <img
                                    src={about_us}
                                    alt="About us illustration"
                                    className="w-full h-auto drop-shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Right Text */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-2 max-w-lg lg:max-w-none lg:pt-[6rem] pb-[5rem]">
                            <div className="mb-3 sm:mb-4 md:mb-6">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 leading-tight">
                                    ABOUT US
                                </h2>
                            </div>

                            <div className="mb-4 sm:mb-6 md:mb-8">
                                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                    Sikh School of Los Angeles is a progressive school, where
                                    staff is dedicated to helping each and every student reach
                                    his/her maximum potential. The students are assisted in
                                    achieving their maximum potential through student-cen-
                                    tered, group learning coupled with individualized instruc-
                                    tions. Parent involvement is key to our success. Students, staff
                                    and parents work together as a team to create a friendly yet
                                    disciplined learning environment.

                                </p>

                            </div>

                            {!fromAboutUsPage && <div className="flex justify-center lg:justify-start">
                                <ScrollToTopLink
                                    className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                                    to="/about-us"
                                >
                                    Read More
                                </ScrollToTopLink>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>


            <img src={about_us_bg} alt="About us illustration" className="absolute bottom-0 left-0 w-full h-full" />

        </section>
    );
};


