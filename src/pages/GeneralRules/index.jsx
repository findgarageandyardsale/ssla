import { schoolRules } from '../../constants'
import general_rules from '../../assets/general_rules.jpg'

export const GeneralRules = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-800 pb-2">📚 General Rules</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side - Content */}
        <div>
          <ul className="space-y-4">
            {schoolRules?.generalRules?.map((item, index) => (
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
            src={general_rules} 
            alt="General Rules" 
            className="max-w-full h-auto rounded-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    </div>
  )
}
 
