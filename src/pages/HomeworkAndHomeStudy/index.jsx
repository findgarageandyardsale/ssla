import { schoolRules } from "../../constants";
import study from "../../assets/study.png";

export const HomeworkAndHomeStudy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-800 pb-2">📚 Homework And Home Study</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left side - Content */}
        <div>

          <ul className="space-y-4">
            {schoolRules?.homeworkAndHomeStudy?.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="mt-1">{item.icon}</div>
                <p className="text-lg">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={study}
            alt="Homework and Study"
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    </div>
  );
};
