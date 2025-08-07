import staff_bg from '../../assets/background/staff_bg.png'
import { AboutUs } from '../../Home/components/AboutUs'

export const StaffPage = () => {
  return (
    <>
    <div className="flex-1 relative overflow-hidden">
          
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${staff_bg})`}}>
            </div>
            
           
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
           
            <div className="relative z-10 flex items-center justify-center min-h-screen px-8 pl-12">
                <div className="text-center max-w-4xl">
                   
                    <h1 className="text-5xl md:text-5xl font-bold mb-8 leading-tight">
                        <span className='text-underline'>Take staff experience to the next level</span>
                      
                       
                    </h1>
                    
                    
                    
                </div>
            </div>
            </div>
    
   
      

        </>
  )
}

