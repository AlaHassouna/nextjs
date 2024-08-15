import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function DoctorList({doctorList,heading='Médecins Populaires'}) {
    
  return (
    <div className='mb-10 px-8'>
        <h2 className='font-bold text-xl'>{heading}</h2>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-4'>
            {doctorList.length>0?doctorList.map((doctor,index)=>(
                <div className='border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out
                ' key={index}>
                    <Image src={doctor.attributes?.Image?.data?.attributes?.url} alt="Doctor image" width={500} height={200} className='h-[200px] w-full object-cover rounded-lg' />
                    <div className='mt-3 items-baseline flex flex-col gap-1'>
                        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{doctor.attributes?.category.data?.attributes.Name}</h2>
                        <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                        <h2 className='text-primary test-sm'>{doctor.attributes?.Year_of_Experience}</h2>
                        <Link href={'/details/'+doctor?.id} className='w-full'>
                            <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full 
                            text-center text-[13px] mt-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>Réserver maintenant</h2>
                        </Link>
                    </div>
                </div>
                
            ))
            : 
            // Skelton Effect
            [1,2,3,4,5,6].map((item,index)=>(
                <div className='h-[220px] bg-slate-100 w-full rounded-lg animate-pulse'>
                
            </div>
            ))
            
        }
        </div>
    </div>
  )
}

export default DoctorList