import { Button } from '@/components/ui/button'
import { Backpack } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BookAppointment from '../(route)/details/_components/BookAppointment';
import GlobalApi from '../_utils/GlobalApi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'



function Hero() {
  const [doctor,setDoctor]=useState();
  useEffect(()=>{
    getDoctorById();
  },[])
  const getDoctorById=()=>{
    GlobalApi.getDoctorById("3").then(resp=>{
      // console.log(resp)
      setDoctor(resp.data.data);
    })

  }
  const {user}  = useKindeBrowserClient();

    useEffect(()=>{
        // console.log("test")
        // console.log(user)
    },[user])
  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
          <Image
            alt=""
            src="/home.jpg"
            width={800}
            height={800}
            className="absolute inset-0 h-full
            rounded-3xl
            w-full object-cover"
          />
        </div>
  
        <div className="lg:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">Cabinet <span className='text-primary'>Marwa</span></h2>
  
          <p className="mt-4 text-gray-600 mb-4">
          Nous nous consacrons au développement du langage, de la parole et de la communication pour les enfants et les adultes. 
                    Chez Marwa, nous comprenons à quel point la communication est cruciale pour une vie épanouissante.

          </p>
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
      </div>
    </div>
    
  </section>
  )
}

export default Hero