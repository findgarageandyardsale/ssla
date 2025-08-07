

const testimonials = [
  {
    id: 1,
    // avatar: user_cover_1,
    name: "Kristine Pommert",
    role: "BBC World Service Religion British Broadcasting Corp., London",
    text: "One of a kind. Vision of the school is admirable. School is well organized and disciplined to achieve it's ultimate goal.",
    hasBorder: true,
    color: "bg-blue-400",
    initials: "KP",
  },
  {
    id: 2,
    // avatar: user_cover_2,
    name: "Inderjit Singh J.P.",
    role: "Editor: Sikh Messenger, London",
    text: "Excellent organization. Well organized program with a student centered approach. Good student, teacher and parent team work.   ",
    hasBorder: false,
    color: "bg-green-400",
    initials: "IS",
  },
  {
    id: 3,
    // avatar: user_cover_1,
    name: "Dr. Raghbir Singh",
    role: "Chairman of Punjabi Department, Punjabi University, Patiala Punjab",
    text: "Sikh School of Los Angeles offers a unique platform to celebrate Sikh culture in America. Philosophy of the school is great, curriculum is well thought and planned.",
    hasBorder: true,
    color: "bg-purple-400",
    initials: "RS",
  },
  {
    id: 4,
    // avatar: user_cover_2,
    name: "Mohinder Singh",
    role: "Editor: India Journal, U.S.A",
    text: "Sikh School of Los Angeles is brilliantly doing an excellent job of imparting Sikh religious knowledge to the young children who are the future of our community and nation.",
    hasBorder: false,
    color: "bg-red-400",
    initials: "MS",
  },
];

export const Testimonials = () => {
  return (
    <div className="bg-[#FF976317] py-12 md:px-16">
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 inline-block relative leading-tight">
          Testimonials
          <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-10 sm:w-12 md:w-16 lg:w-20 h-[2px] sm:h-[3px] bg-orange-500"></span>
          <span className="absolute -bottom-1 sm:-bottom-2 left-12 sm:left-16 md:left-20 lg:left-24 w-2 sm:w-3 md:w-4 lg:w-6 h-[2px] sm:h-[3px] bg-orange-500"></span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Cards container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg relative border border-gray-200 h-100 flex flex-col">
                {/* Avatar with initials */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-full ${testimonial.color} flex items-center justify-center border-4 border-white shadow-md`}
                  >
                    <span className="text-white text-xl font-bold">
                      {testimonial.initials}
                    </span>
                  </div>
                </div>

                {/* Testimonial text */}
                <div className="text-center mb-6 flex-grow">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {testimonial.text}
                  </p>
                </div>

                {/* Name and role */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>

                  {testimonial?.id == 1 && <div className="py-5"></div>}
                  {testimonial?.id === 2 && <div className="py-5"></div>}
                  {testimonial?.id === 3 && <div className="py-0"></div>}
                  {testimonial?.id === 4 && (
                    <div className="lg:py-2 md:py-1"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
