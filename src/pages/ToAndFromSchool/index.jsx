import { schoolRules } from '../../constants'
import to_and_from_school from '../../assets/school.png'

export const ToAndFromSchool = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-800 pb-2">📚 To and From School</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side - Content */}
        <div>
          <ul className="space-y-4">
            {schoolRules?.toAndFromSchool?.map((item, index) => (
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
            src={to_and_from_school} 
            alt="To and From School" 
            className="max-w-full h-full rounded-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    </div>
  )
}
 
