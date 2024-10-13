// "use client"
// import Link from 'next/link'
// import React from 'react'

// function Login() {
//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Connectez-vous à votre compte
//             </h1>
//             <form className="space-y-4 md:space-y-6" action="#">
//               <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
//                 <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
//                 <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se souvenir de moi</label>
//                   </div>
//                 </div>
//                 </div>
//               <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Vous n'avez pas encore de compte ? <Link href={'/home/signin'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inscrivez-vous</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
    
//   )
// }

// export default Login
"use client";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../_utils/GlobalApi';
import { useRouter } from 'next/navigation'; // Importation du hook useRouter
import Image from 'next/image';
import BookAppointment from '../../(route)/details/_components/BookAppointment';

function Login() {
  const { user } = useKindeBrowserClient();
  const [patientList, setPatientList] = useState([]);
  const router = useRouter(); // Initialisation du hook useRouter

  useEffect(() => {
    const fetchPatientData = async () => {
      if (user) {
       

        try {
          const resp = await GlobalApi.getPatientEmail(user.email);
          const patient = resp.data.data;
          setPatientList(patient);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      }
    };

    fetchPatientData();
  }, [user]);

  useEffect(() => {
    
    const registerPatient = async () => {
      if (user){ 
       if(patientList.length === 0) {
        

        // console.log('patientList',patientList)
        const nouvelObjet = {
          data: {
          family_name: user.family_name,
          given_name: user.given_name,
          picture: user.picture,
          email: user.email,
          id_patient: user.id,
          }
        };

        try {
          await GlobalApi.Register(nouvelObjet);
          
        } catch (error) {
          // console.error('Error registering patient:', error);
        }
      }else{
        
        const id =patientList[0].attributes.id_patient;
        if (id.startsWith("Marwa")) {
          const updatedPatient = {
            data: {
                id_patient: user.id // Définir Confirmer à true
            },
        };
          GlobalApi.updateIdPatient(patientList[0].id,updatedPatient)
        } 

      }
    }
      // router.push('/home');
    };
    
    registerPatient();
    // console.log('Patient list updated:', patientList);
  }, [patientList, user, router]);

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
          
            <a 
              style={{ whiteSpace: 'nowrap' }} 
              className='bg-slate-300 text-white button w-[100%] p-2 duration-300 rounded-full cursor-not-allowed'>
              Prendre un rendez-vous
            </a>
            <p className='text-xs text-[#e74410] mt-3'>
              Vous devez être connecté pour prendre un rendez-vous.
            </p>
          
          
        </div>
      </div>
    </div>
    
  </section>

  );
}

export default Login;


