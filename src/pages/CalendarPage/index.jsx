export default function CalendarPage() {
  const schedule = [
    { time: "9:30AM – 10:00AM", activity: "Morning Assembly" },
    { time: "10:00AM – 10:45AM", activity: "First Class" },
    { time: "10:45AM – 11:00AM", activity: "Recess" },
    { time: "11:00AM – 11:45AM", activity: "Second Class" },
    { time: "11:45AM – 12:30PM", activity: "Third Class" },
  ];

  const importantDates = [
    { date: "Sep 20, 2020", label: "First Day of Class", closed: false },
    { date: "Nov 26, 2020", label: "Thanksgiving Holiday", closed: true },
    { date: "Dec 27, 2020", label: "Winter Recess", closed: true },
    { date: "Jan 03, 2021", label: "Winter Recess", closed: true },
    { date: "TBD", label: "LA Nagar Keertan", closed: false },
    { date: "TBD", label: "Last Day of School", closed: false },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-orange-500 inline-block relative">
        Khalsa Care Foundation 2020 - 2021 School Calendar
        <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-16 sm:w-20 md:w-24 h-[3px] sm:h-[4px] bg-orange-500"></span>
        <span className="absolute -bottom-1 sm:-bottom-2 left-20 sm:left-24 md:left-28 w-4 sm:w-6 md:w-8 h-[3px] sm:h-[4px] bg-orange-500"></span>
      </h2>

      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">
          School Times
        </h2>
        <div className="bg-white shadow-md rounded-lg divide-y">
          {schedule.map((item, index) => (
            <div key={index} className="flex justify-between p-4">
              <span className="text-gray-700 font-medium">{item.time}</span>
              <span className="text-gray-900">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-orange-600">
          Important Dates
        </h2>
        <div className="bg-white shadow-md rounded-lg divide-y">
          {importantDates.map((item, index) => (
            <div key={index} className="flex justify-between p-4 items-center">
              <span className="text-gray-700 font-medium">{item.date}</span>
              <span className="text-gray-900">{item.label}</span>
              {item.closed && (
                <span className="text-sm text-red-600 font-semibold ml-4">
                  School Closed
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
