import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import { toast } from 'sonner';
moment.locale('fr');
function BookingList({bookingList,expired,updateRecord}) {
  const onDeleteBooking=(item)=>{
    // console.log(item)
    GlobalApi.deleteBooking(item.id).then(resp=>{
      // console.log(resp)
      if(resp){
        toast('Rendez-vous supprimé avec succès.');
        updateRecord();
      }
      
    })
  }
  return (
    <div >
      {bookingList&&bookingList.map((item,index)=>(
        <div key={index} className='flex gap-4 items-center border p-5 m-3 rounded-lg  ' >
          
            <Image src={item.attributes.doctor.data.attributes?.Image?.data?.attributes?.url}
             className='rounded-full h-[70px] w-[70px]object-cover'
            width={70} height={70} alt='doctor-image'
            />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] items-center flex justify-between'>{item.attributes.doctor.data.attributes.Name}
              {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
              </h2>
              <h2 className='flex gap-2'><Calendar className='text-primary h-5 w-5'/>Rendez-vous le {moment(item.attributes.Date).format('DD-MM-YYYY')}</h2>
              <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5'/>À l'heure {item.attributes.Time}</h2>
              </div>
          </div>
      ))}
    </div>
  )
}

export default BookingList