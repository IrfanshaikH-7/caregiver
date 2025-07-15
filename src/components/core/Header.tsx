import { chevron_down, logo } from '../../assets'

export default function Header() {
  return (
    <>
    <div className="hidden md:flex justify-between items-center bg-secondary p-4 rounded-[20px]">
        <div className="flex items-center">
          <img src={logo} alt="Careviah Logo" className="h-8 mr-2" /> {/* Placeholder for logo */}
        </div>
        <div className="flex items-center">
          <img src="https://via.placeholder.com/30" alt="Admin Profile" className="w-10 h-10  rounded-full mr-2" />
          <div>
            <div className="font-semibold text-gray-800">Admin A</div>
            <div className="text-xs text-gray-600">Admin@healthcare.io</div>
          </div>
          <img src={chevron_down} alt="chevron-down" className=" ml-3 w-6 h-6 text-gray-600"/>
        </div>
      </div>
    </>
    
  )
}
