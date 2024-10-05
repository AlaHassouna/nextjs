import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect} from 'react'
import BookAppointment from './BookAppointment'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'



function DoctorDetail({doctor}) {
  const {user}  = useKindeBrowserClient();

  useEffect(()=>{
      // console.log("test")
      // console.log(user)
      console.log(doctor.attributes)
  },[user])

  return (
    <div>
          <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
              {/* Doctor Imaage */}
              <div>
                  <Image src={doctor.attributes?.Image?.data?.attributes?.url} 
                  width={1000} height={800} alt='docto-image' 
                  className='rounded-lg w-full h-[200px] object-cover'/>
              </div>
              {/* Doctor Info */}
              <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-2 items-baseline'>
                    <h2 className='font-bold text-2xl '>{doctor.attributes?.Name}</h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <GraduationCap/>
                        <span>{doctor.attributes?.Year_of_Experience} d'expérience</span>
                    </h2>
                    {/* <h2>
                        <MapPin/>
                        <span>{doctor.attributes?.address</span>
                    </h2> */}
                    <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{doctor.attributes?.category.data?.attributes.Name}</h2>
                    {user?  
          <BookAppointment doctor={doctor}/>
          :
          <>
            <a 
              style={{ whiteSpace: 'nowrap' }} 
              className='bg-slate-300 text-white button w-[100%] p-2 duration-300 rounded-full cursor-not-allowed'>
              Prendre un rendez-vous
            </a>
            <p className='text-xs text-[#e74410] mt-3'>
              Vous devez être connecté pour prendre un rendez-vous.
            </p>
          </>

          }
                </div>

              {/* About doctor*/}
              
          </div>
          <div className='p-3 order-[1px] rounded-lg'>
            <h2 className='font-bold text-[20px]'>À propos de moi</h2>
            {doctor.attributes?.About.map((section, index) => (
              <p key={index} className='text-gray-500 tracking-wide mt-2'>
                {section.children.map((child, childIndex) => (
                  <span key={childIndex}>
                    {child.bold ? <strong>{child.text}</strong> : child.text}
                  </span>
                ))}
              </p>
            ))}
            
          
        </div>
        </div>
  )
}

export default DoctorDetail