import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment'

function DoctorDetail({doctor}) {
   
  return (
    <div>
          <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
              {/* Doctor Imaage */}
              <div>
                  <Image src={doctor.attributes?.Image?.data?.attributes?.url} 
                  width={200} height={200} alt='docto-image' 
                  className='rounded-lg w-full h-[300px] object-cover'/>
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
                    <BookAppointment doctor={doctor}/>
                </div>

              {/* About doctor*/}
              
          </div>
          <div className='p-3 order-[1px] rounded-lg'>
            <h2 className='font-bold text-[20px]'>À propos de moi</h2>
            <p className='text-gray-500  tracking-wide  mt-2'>{doctor.attributes?.About[0].children[0].text}</p>
            
          
        </div>
        </div>
  )
}

export default DoctorDetail