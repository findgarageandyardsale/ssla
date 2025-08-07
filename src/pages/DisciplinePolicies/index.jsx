import { schoolRules } from '../../constants'
import discipline_policies from '../../assets/discipline_policies.png'

export const DisciplinePolicies = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-800 pb-2">📚 Discipline Policies</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side - Content */}
        <div>
          <ul className="space-y-4">
            {schoolRules?.disciplinePolicies?.map((item, index) => (
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
            src={discipline_policies} 
            alt="Discipline Policies" 
            className="max-w-64 h-64 rounded-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    </div>
  )
}
 
