"use client"
import GlobalApi from '@/app/home/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import Profil from '../_components/Profil'
// import DoctorDetail from '../_components/DoctorDetail';

function Details({params}) {

const [user, setUser] = useState([]);

useEffect(() => {
  GlobalApi.getPatient(params.recordid).then(resp => {
      const user = resp.data.data;
      setUser(user);
      console.log('user fetched', user[0].attributes);
  }).catch(error => {
      console.error('Error fetching user:', error);
  });
}, []);
  return (
    <main class="p-4 md:ml-64 h-auto pt-20">
      
    <section className="bg-white dark:bg-gray-900">
      <Profil user={user[0]}/>
    </section>
    
    </main>
  )
}

export default Details