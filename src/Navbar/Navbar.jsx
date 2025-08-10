import { useEffect, useState } from "react";
// import logo from "../assets/ssla_logo_transparent.png";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { RadioField } from "../components/atoms/RadioField";
// import { ScrollToTopLink } from "../components/common/ScrollToTopLink";
// import { HeaderSection } from "../Home/components/HeaderSection";

export const Navbar = ({ setIsOpenModal, setIsOpenCalendarModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [showRegisterPopover, setShowRegisterPopover] = useState(false);
  const [selectedGurmatSangeetCategory, setSelectedGurmatSangeetCategory] =
    useState(() => {
      // Initialize from localStorage if available
      const stored = localStorage.getItem("selectedLanguageCategories");
      return stored ? JSON.parse(stored) : [];
    });
  const [selectedGurmatSangeetInstrument, setSelectedGurmatSangeetInstrument] =
    useState("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/");

  // Define navigation items
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/courses-offered", label: "Courses Offered" },
    // { href: "/staff", label: "Staff" },
    { href: "/gallery", label: "Gallery" },
    // { href: "/testimonials", label: "Testimonials" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  // Admin navigation items
  const adminItems = [{ href: "/admin/gallery", label: "Admin Gallery" }, {}];

  // const scrollToSection = (href) => {
  //   const element = document.getElementById(href);
  //   if (element) {
  //     const navHeight = 80; // Navbar height
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.pageYOffset - navHeight;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: "smooth",
  //     });
  //   }

  //   setActiveSection(href);
  //   setIsOpen(false);
  // };
  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.href)
      );
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRegisterPopover && !event.target.closest(".register-popover")) {
        setShowRegisterPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showRegisterPopover]);

  // Listen for form changes and update popup state
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("selectedLanguageCategories");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out any invalid/old values that don't match current options
        const validOptions = [
          "Punjabi Language",
          "Gurmat",
          "Gurbani Santhya",
          "Keertan",
          "Gurmat (age 18+)"
        ];
        const filteredSelection = parsed.filter(item => validOptions.includes(item));

        // If there are invalid items, clean up localStorage
        if (filteredSelection.length !== parsed.length) {
          console.log('🧹 Cleaning up invalid selections:', {
            original: parsed,
            filtered: filteredSelection,
            removed: parsed.filter(item => !validOptions.includes(item))
          });
          localStorage.setItem("selectedLanguageCategories", JSON.stringify(filteredSelection));
        }

        setSelectedGurmatSangeetCategory(filteredSelection);
      }
    };

    // Listen for storage events (when localStorage changes in other tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Reusable button component

  const NavButton = ({ item, isMobile = false }) => {
    const isActive = activeTab === item.href;
    return (
      <button
        onClick={() => {
          navigate(item.href);
          setActiveTab(item.href);
        }}
        className={`
         px-3 py-2 rounded-md font-semibold font-rethink transition-all duration-200
         ${isMobile
            ? "block text-base w-full text-left"
            : "text-base lg:text-base md:text-sm"
          }
         ${isActive
            ? "text-[#f48b49]  border-[#f48b49]"
            : "text-brand-text-color hover:text-[#f48b49]"
          }
       `}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav className="sticky bg-[#fff] top-0 left-0 right-0 z-50 pb-3 pt-4">
      <div className="">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <img
             src={logo}
             alt="Logo"
             style={{ height: "50px", width: "50px", marginLeft: "20rem" }}
             className="object-cover rounded-lg"
           /> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:text-sm mr-2">
            {navItems.map((item) => (
              <NavButton key={item?.label} item={item} />
            ))}
            <div className="border-l border-gray-300 pl-4 ml-4">
              {/* {adminItems.map((item) => ( */}
              <button
                onClick={() => {
                  setIsOpenModal(true);
                }}
                className="text-brand-text-color hover:text-[#f48b49] transition-colors duration-200 font-semibold"
              >
                Notice Board
              </button>

              {/* ))} */}
            </div>
            <div className="border-l border-gray-300 pl-4 ml-4">
              {/* {adminItems.map((item) => ( */}
              <button
                onClick={() => {
                  setIsOpenCalendarModal(true);
                }}
                className="text-brand-text-color hover:text-[#f48b49] transition-colors duration-200 font-semibold"
              >
                Calendar
              </button>

              {/* ))} */}
            </div>
            <div className="relative register-popover">
              <button
                onClick={() => setShowRegisterPopover(!showRegisterPopover)}
                className="bg-[#E84B23] text-white px-6 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors duration-200"
              >
                Registration
              </button>

              {/* Register Popover */}
              {showRegisterPopover && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 register-popover">
                  <div className="py-4">
                    {/* Language Registration */}
                    <div className="px-4 mt-4">
                      <h3 className="text-sm font-semibold text-green-600 mb-2 bg-green-100 p-2 rounded-lg">
                        Courses
                      </h3>

                      <div className="space-y-2">
                        {[
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
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="gurmatCategory"
                              value={option.value}
                              checked={selectedGurmatSangeetCategory.includes(option.value)}
                              onChange={(e) => {
                                let newSelection;
                                if (e.target.checked) {
                                  newSelection = [...selectedGurmatSangeetCategory, option.value];
                                } else {
                                  newSelection = selectedGurmatSangeetCategory.filter(val => val !== option.value);
                                }
                                setSelectedGurmatSangeetCategory(newSelection);
                                // Save to localStorage for form synchronization
                                localStorage.setItem("selectedLanguageCategories", JSON.stringify(newSelection));
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {selectedGurmatSangeetCategory.length > 0 && (
                        <button
                          onClick={() => {
                            const params = new URLSearchParams();
                            // Pass all selected categories as comma-separated string
                            params.append("category", selectedGurmatSangeetCategory.join(","));
                            navigate(`/register-form?${params.toString()}`);
                            setShowRegisterPopover(false);
                          }}
                          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Continue with Selection ({selectedGurmatSangeetCategory.length} selected)
                          {/* Debug info */}
                          {process.env.NODE_ENV === 'development' && (
                            <div className="text-xs text-gray-500 mt-1">
                              Debug: {JSON.stringify(selectedGurmatSangeetCategory)}
                            </div>
                          )}
                        </button>
                      )}

                      {/* Clear All Button */}
                      <button
                        onClick={() => {
                          setSelectedGurmatSangeetCategory([]);
                          localStorage.removeItem("selectedLanguageCategories");
                        }}
                        className="mt-2 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      >
                        Clear All Selections
                      </button>

                      <div className="w-full h-px bg-gradient-to-r from-gray-200 to-gray-300 mt-3"></div>
                    </div>

                    {/* Gurmat Sangeet Section */}
                    {/* <div className="px-4 mb-4">
                      <h3 className="text-sm font-semibold text-blue-600 mb-2 bg-blue-100 p-2 rounded-lg">
                        Gurmat Sangeet Registration
                      </h3>

                      <RadioField
                        label=""
                        name="gurmatInstrument"
                        value={selectedGurmatSangeetInstrument}
                        onChange={(e) => {
                          setSelectedGurmatSangeetInstrument(e.target.value);
                          setSelectedGurmatSangeetCategory(null);
                          // Redirect immediately when instrument is selected
                          const params = new URLSearchParams();
                          params.append("instrument", e.target.value);
                          navigate(`/gs-register-form?${params.toString()}`);
                          setShowRegisterPopover(false);
                        }}
                        options={[
                          { value: "vocal", label: "Vocal" },
                          { value: "tabla", label: "Tabla" },
                          { value: "dilruba", label: "Dilruba" },
                          { value: "rabab", label: "Rabab" },
                        ]}
                        className="space-y-1"
                      />
                      <div className="w-full h-px bg-gradient-to-r from-gray-200 to-gray-300 mt-3"></div>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg
                  fill="#524342"
                  width="80px"
                  height="80px"
                  className="w-7 h-7"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <NavButton key={item?.label} item={item} isMobile={true} />
              ))}

              {/* Mobile Notice Board Button */}
              <div className="border-t border-gray-300 pt-2 mt-2">
                <button
                  onClick={() => {
                    setIsOpenModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#f48b49] hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Notice Board
                </button>
              </div>

              {/* Mobile Calendar Button */}
              <div className="border-t border-gray-300 pt-2 mt-2">
                <button
                  onClick={() => {
                    setIsOpenCalendarModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#f48b49] hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Calendar
                </button>
              </div>

              {/* Mobile Registration Button */}
              <div className="border-t border-gray-300 pt-2 mt-2">
                <button
                  onClick={() => setShowRegisterPopover(!showRegisterPopover)}
                  className="bg-[#E84B23] text-white px-6 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors duration-200"
                >
                  Registration
                </button>

                {/* Mobile Registration Popover */}
                {showRegisterPopover && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-3">
                    {/* Language Registration Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-green-600 mb-2 bg-green-100 p-2 rounded-lg">
                        Language Registration
                      </h3>

                      <RadioField
                        label=""
                        name="gurmatCategoryMobile"
                        value={selectedGurmatSangeetCategory}
                        onChange={(e) => {
                          setSelectedGurmatSangeetCategory(e.target.value);
                          setSelectedGurmatSangeetInstrument(null);
                          const params = new URLSearchParams();
                          params.append("category", e.target.value);
                          navigate(`/register-form?${params.toString()}`);
                          setIsOpen(false);
                          setShowRegisterPopover(false);
                        }}
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
                        className="space-y-1"
                      />
                    </div>
                    {/* Gurmat Sangeet Section */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-blue-600 mb-2 bg-blue-100 p-2 rounded-lg">
                        Gurmat Sangeet Registration
                      </h3>

                      <RadioField
                        label=""
                        name="gurmatInstrumentMobile"
                        value={selectedGurmatSangeetInstrument}
                        onChange={(e) => {
                          setSelectedGurmatSangeetInstrument(e.target.value);
                          setSelectedGurmatSangeetCategory(null);
                          const params = new URLSearchParams();
                          params.append("instrument", e.target.value);
                          navigate(`/gs-register-form?${params.toString()}`);
                          setIsOpen(false);
                          setShowRegisterPopover(false);
                        }}
                        options={[
                          { value: "vocal", label: "Vocal" },
                          { value: "tabla", label: "Tabla" },
                          { value: "dilruba", label: "Dilruba" },
                          { value: "rabab", label: "Rabab" }
                        ]}
                        className="space-y-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="border-t border-gray-300 pt-2 mt-2">
               {adminItems.map((item) => (
                 <NavButton key={item?.label} item={item} isMobile={true} />
               ))}
             </div> */}
            </div>
          </div>
        )}
      </div>

      {isOpenForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full h-[90vh] max-w-5xl relative">
            <div className="flex row justify-between align-center">
              <h2 className="text-xl font-semibold mb-4">Sample Form</h2>
              <button className="mb-5" onClick={() => setIsOpenForm(false)}>
                <X />
              </button>
            </div>
            <iframe
              style={{ height: "85%", width: "100%" }}
              src="https://docs.google.com/forms/d/e/1FAIpQLSfAr-SMbxpozJP7MMukcTTdxUFXnm2_nG7mATloneC4gzoABA/viewform"
            />
            <button
              className="text- mt-5 hover:text-blue-800"
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1KInaDmRnnYWe0YT9pnu_gJ_93H2cX8xKurcjFXLVEQg/edit?resourcekey=&gid=1658396389#gid=1658396389",
                  "_blank"
                )
              }
            >
              Click here to view responses
            </button>
            {/* <div className="flex justify-end mt-2">
             <button
               onClick={() => setIsOpenForm(false)}
               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
             >
               Close
             </button>
           </div> */}
          </div>
        </div>
      )}
    </nav>
  );
};
