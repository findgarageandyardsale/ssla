import punjabi from "../../assets/courses/punjabi.png";
import sikh_theology from "../../assets/courses/sikh_theology.jpg";
import sikh_history from "../../assets/courses/sikh_history.jpeg";
import gurbani_santhya from "../../assets/courses/gurbani_ santhiya.jpg";
import gurmat_sangeet from "../../assets/courses/gurmat_sangeet.png";
import sewa_project from "../../assets/courses/sewa_project.jpg";

const cardData = [
  {
    icon: <img src={punjabi} alt="Punjabi Language" className="w-48 h-40" />,
    title: "Punjabi Language",
    bgColor: "bg-blue-50",
  },
  {
    icon: <img src={sikh_theology} alt="Sikh Theology" className="w-48 h-40" />,
    title: "Sikh Theology",
    bgColor: "bg-green-50",
  },
  {
    icon: <img src={sikh_history} alt="Sikh History" className="w-48 h-40" />,
    title: "Sikh History",
    bgColor: "bg-purple-50",
  },
  {
    icon: (
      <img src={gurbani_santhya} alt="Gurbani Santhya" className="w-48 h-40" />
    ),
    title: "Gurbani Santhya",
    bgColor: "bg-orange-50",
  },
  {
    icon: (
      <img src={gurmat_sangeet} alt="Gurmat Sangeet" className="w-48 h-40" />
    ),
    title: "Gurmat Sangeet",
    bgColor: "bg-pink-50",
  },
  { 
    icon: <img src={sewa_project} alt="Sewa Project" className="w-48 h-40"/>,
    title: "Sewa Project ",
    bgColor: "bg-teal-50",
  },
];

const RuleCard = ({ icon, title, bgColor = "bg-blue-50" }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-full">
        {/* Main Card Container with Enhanced Design */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full overflow-hidden border border-gray-100">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl opacity-0"></div>

          {/* Inner Content with Better Spacing */}
          <div className="relative bg-white m-1 rounded-2xl h-full flex flex-col border-2 border-transparen">
            {/* Container with icon as background */}
            <div className={`${bgColor} rounded-t-2xl flex-1 flex justify-center items-center p-8 transform`}>
              <div className="text-orange-500 text-6x">
                {icon}
              </div>
            </div>

            {/* Text outside container with same background color */}
            <div className={`${bgColor} rounded-b-2xl p-4 text-center`}>
              <h3 className="text-lg font-semibold text-gray-800">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CoursesOfferedPage = () => {
  return (
    <>
      <section className="min-h-screen bg-white py-8 sm:py8 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 inline-block relative">
                    COURSES OFFERED
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-16 sm:w-20 md:w-24 h-[3px] sm:h-[4px] bg-orange-500"></span>
                    <span className="absolute -bottom-1 sm:-bottom-2 left-20 sm:left-24 md:left-28 w-4 sm:w-6 md:w-8 h-[3px] sm:h-[4px] bg-orange-500"></span>
                  </h2>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Comprehensive education programs designed to nurture Sikh
                  values, language skills, and knowledge of Sikh Heritage
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16">
                {cardData?.map((card, index) => (
                  <div
                    key={index}
                    // className="transform transition-all duration-500 hover:scale-105"
                    // style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <RuleCard
                      icon={card.icon}
                      title={card.title}
                      bgColor={card.bgColor}
                    />
                  </div>
                ))}
              </div>

              {/* Courses Grid */}
              {/* <div className="space-y-8">
                {courses.map((department, deptIndex) => (
                  <div
                    key={deptIndex}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                   
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                      <h3 className="text-xl font-bold text-white">
                        {department.department}
                      </h3>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-6">
                        {department.ageGroups.map((ageGroup, ageIndex) => (
                          <div key={ageIndex} className="flex-1 min-w-[300px]">
                            <div className="mb-4">
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                {ageGroup.age}
                              </h4>
                              <div className="w-12 h-1 bg-orange-500 rounded"></div>
                            </div>

                            <div className="space-y-3">
                              {ageGroup.courses.map((course, courseIndex) => (
                                <div
                                  key={courseIndex}
                                  className="bg-gray-50 rounded-lg p-4 hover:bg-orange-50 transition-colors duration-200"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-800 mb-1">
                                        {course.name}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {course.description}
                                      </p>
                                    </div>
                                    <div className="ml-3">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
