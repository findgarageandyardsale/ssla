import about_us_bg from "../../assets/background/about_us_bg.png";
import { AboutUs } from "../../Home/components/AboutUs";
import { Award, BookOpen, Volume2, Music, Languages } from "lucide-react";

// Add custom styles for animations
const customStyles = `
 @keyframes fadeInUp {
   from {
     opacity: 0;
     transform: translateY(30px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
  .animate-fade-in-up {
   animation: fadeInUp 0.6s ease-out forwards;
 }
  .animation-delay-2000 {
   animation-delay: 2s;
 }
  .animation-delay-4000 {
   animation-delay: 4s;
 }
`;

// Reusable Card Component
const RuleCard = ({ icon, title, bgColor = "bg-blue-50" }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-full">
        {/* Main Card Container with Enhanced Design */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full overflow-hidden border border-gray-100">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Inner Content with Better Spacing */}
          <div className="relative bg-white m-1 rounded-2xl p-8 h-full flex flex-col justify-center items-center text-center">
            {/* Enhanced Icon Container */}
            <div className="relative mb-6">
              <div
                className={`${bgColor} rounded-2xl p-6 flex justify-center items-center transform group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                  {icon}
                </div>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-orange-200 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>

            {/* Enhanced Title with Better Typography */}
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
// Reusable Section Header Component
const SectionHeader = ({ title, showDecorator = true }) => {
  return (
    <div className="text-center mb-16">
      <div className="inline-block">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-6">
          {title}
        </h1>
        {showDecorator && (
          <div className="flex justify-center items-center space-x-3">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
        )}
      </div>
      <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
        Discover our comprehensive curriculum designed to nurture both academic
        excellence and cultural heritage
      </p>
    </div>
  );
};

// Reusable Text Content Component
const TextContent = ({ paragraphs }) => {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="group">
          <p className="text-gray-700 leading-relaxed text-xl group-hover:text-gray-800 transition-colors duration-300">
            {paragraph}
          </p>
          {index < paragraphs.length - 1 && (
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Rules and Regulations Component
export const AboutUsPage = () => {
  const cardData = [
    {
      icon: <BookOpen className="w-16 h-16" />,
      title: "Punjabi Language",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Award className="w-16 h-16" />,
      title: "Sikh Theology",
      bgColor: "bg-green-50",
    },
    {
      icon: <BookOpen className="w-16 h-16" />,
      title: "Sikh History",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Volume2 className="w-16 h-16" />,
      title: "Gurbani Santhya",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Music className="w-16 h-16" />,
      title: "Gurmat Sangeet",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Languages className="w-16 h-16" />,
      title: "Sewa Project",
      bgColor: "bg-teal-50",
    },
  ];

  const textParagraphs = [
    "The School started in on August 9, 1997. We have nine class-rooms and two state of the art computer labs. Student ages range from 5 years t o 16 years. For students over age 16, the are beginning, intermediate, and advanced level of Sikh theol-ogyandhistory classes. Keeping in mind the learning style of students in the west, we have designed our own instructional materials. Never satis- fied with our status quo, we are continually improving our in- structional programs.",
    "We have twelve class rooms. The students are categorized according to their age and knowledge of Gurmukhi. Student ages range from four (4) years to eighteen (18). There are also classes for adults over age 18. Each student is given opportunity to participate in a variety of activities for personal growth and development.",
    "Classes are held every Sunday from 9:30 a.m. to 12:30 p.m. Gurmat Sangeet and tabla classes are from 11:30 a.m. to 2:30 p.m. ",
    "For more information please contact.",
    "Joginder Singh Sidhu - 818.266.4757",
    "Natasha Kaur - 630.2673480",
  ];

  return (
    <>
      <style>{customStyles}</style>

      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${about_us_bg})` }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="my-12">
        <AboutUs fromAboutUsPage={true} />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Header Section */}
          {/* <div className="animate-fade-in-up">
            <SectionHeader title="Courses Offered" />
          </div> */}

          {/* Enhanced Cards Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <RuleCard
                  icon={card.icon}
                  title={card.title}
                  bgColor={card.bgColor}
                />
              </div>
            ))}
          </div> */}

          {/* Enhanced Description Section */}
          <div
            className="max-w-8xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
              <TextContent paragraphs={textParagraphs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
