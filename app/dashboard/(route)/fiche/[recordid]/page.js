"use client"
import React, { useEffect, useState } from 'react'
import Fiche from '../_components/Fiche';
import GlobalApi from '@/app/home/_utils/GlobalApi';

// import DoctorDetail from '../_components/DoctorDetail';

function Details({params}) {

const [booking, setBooking] = useState([]);
useEffect(() => {
  console.log("params.recordid :",params.recordid)
  GlobalApi.getBooking(params.recordid).then(resp => {
      const booking = resp.data.data;
      setBooking(booking);
      console.log('user fetched', book.attributes);
  }).catch(error => {
      console.error('Error fetching booking:', error);
  });
}, []);

  return (
    <main class="p-4 md:ml-64 h-auto pt-20">
      
    <section className="bg-white dark:bg-gray-900">
      <Fiche booking={booking.attributes}/>
    </section>
    
    </main>
  )
}

export default Details