"use client"
import GlobalApi from '@/app/home/_utils/GlobalApi';
import React, { useState, useEffect } from 'react'
import TodayAppointement from './TodayAppointement';
import NextPatient from './NextPatient';
import Barchart from './Barchart';
import Link from 'next/link';

function Kpis() {

    const [bookings, setBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);

    const [bookingList, setBookingList] = useState([]);
    const [pastBookings, setPastBookings] = useState([]); 
    const [todayBookings, setTodayBookings] = useState([]); 
    const [lastBookingTime, setLastBookingTime] = useState([]); 
    const [sortedTodayBookings, setSortedTodayBookings] = useState([]); // Ajout de l'état pour sortedTodayBookings
    const [nextBooking, setNextBooking] = useState(null);
    const [appointmentsPerDay, setAppointmentsPerDay] = useState({});
    const [filteredAppointments, setFilteredAppointments] = useState([]);




    useEffect(() => {
        GlobalApi.getBookingList().then(resp => {
            const bookingsAll = resp.data.data;
            setBookings(bookingsAll);
            
            // Filtrer les rendez-vous confirmés
            const confirmedBookings = bookingsAll.filter(booking => booking.attributes.Confirmer === true);
            setConfirmedBookings(confirmedBookings);

            // Afficher les deux listes avec console.log
            // console.log('Bookings:', bookings);
            // console.log('Confirmed Bookings:', confirmedBookings);




            const today = new Date(); 
            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 

            const filteredTodayBookings = confirmedBookings.filter(item => {
                const itemDate = new Date(item.attributes.Date); 
                const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
                return itemDateWithoutTime.getTime() === todayDate.getTime(); 
            });

            const filteredPastBookings = filteredTodayBookings.filter(item => {
                const itemTime = item.attributes.Time; 
                const [itemHour, itemMinute] = itemTime.split(':').map(Number); 
                const now = new Date(); 

                if (itemHour < now.getHours() || (itemHour === now.getHours() && itemMinute < now.getMinutes())) {
                    return true; 
                }
                return false;
            });

            setTodayBookings(filteredTodayBookings); 
            setPastBookings(filteredPastBookings); 

            const sortedTodayBookings = filteredTodayBookings.sort((a, b) => {
                const [hourA, minuteA] = a.attributes.Time.split(':').map(Number);
                const [hourB, minuteB] = b.attributes.Time.split(':').map(Number);
                if (hourA === hourB) {
                    return minuteA - minuteB;
                }
                return hourA - hourB;
            });

            setSortedTodayBookings(sortedTodayBookings); // Mise à jour de l'état sortedTodayBookings
            // console.log("sortedTodayBookings",sortedTodayBookings)
            const now = new Date();
            const upcomingBookings = sortedTodayBookings.filter(item => {
                const [itemHour, itemMinute] = item.attributes.Time.split(':').map(Number);
                if (itemHour > now.getHours() || (itemHour === now.getHours() && itemMinute > now.getMinutes())) {
                    return true;
                }
                return false;
            });
    
            const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;
            // console.log(nextBooking)
            setNextBooking(nextBooking);



            const lastBookingTime = sortedTodayBookings.length > 0 ? sortedTodayBookings[sortedTodayBookings.length - 1].attributes.Time : 'Pas de rendez-vous';
            setLastBookingTime(lastBookingTime);
            
            
            

        });
    }, []);

    useEffect(() => {
         // Compter les rendez-vous par jour de la semaine
         const countByDay = bookings.reduce((acc, booking) => {
            const bookingDate = new Date(booking.attributes.Date);
            const dayOfWeek = bookingDate.toLocaleDateString('fr-FR', { weekday: 'long' });
            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = 0;
            }
            acc[dayOfWeek]++;
            return acc;
        }, {});
      //   console.log(countByDay)
        setAppointmentsPerDay(countByDay);

        const now = new Date();
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const filtered = bookings.filter(appointment => {
            const appointmentDate = new Date(appointment.attributes.Date);
            const [hours, minutes] = appointment.attributes.Time.split(':').map(Number);
            const appointmentTime = new Date(todayDate);
            appointmentTime.setHours(hours, minutes);

            return (
                !appointment.attributes.Confirmer &&
                (appointmentDate > todayDate || 
                (appointmentDate.getTime() === todayDate.getTime() && appointmentTime > now))
            );
        });

        setFilteredAppointments(filtered);
        // console.log(filtered);
    }, [bookings]);


    const handleAnnulation = async (id) => {
        try {
            // console.log('Liste des rendez-vous:', bookings);
            // console.log('ID à rechercher:', id);

            const bookingToCancel = bookings.find(booking => booking.id === id);

            if (bookingToCancel) {
                // console.log('Détails du rendez-vous à annuler:', bookingToCancel);
                GlobalApi.getBlockedTime(bookingToCancel.attributes.Date,bookingToCancel.attributes.Time).then(response => {
                    const id =response.data.data[0].id
                    // console.log("response.data.id :",response.data.data[0].id);

                    // console.log("response.data.id :",response.data.id);
                    // console.log("id :",id);
                    GlobalApi.deleteBlockedTime(id).then(response => {
                        // console.log("BlockedTime supprimer avec succée");
                        // console.log("Fiche added successfully:", response);
                      }).catch(error => {
                        // toast.error("Erreur lors de l'ajout de la fiche");
                        console.error("Error deleteBlockedTime:", error);
                      });
                    // console.log("Fiche added successfully:", response);
                  }).catch(error => {
                    // toast.error("Erreur lors de l'ajout de la fiche");
                    console.error("Error getBlockedTime:", error);
                  });
            } else {
                console.warn('Rendez-vous non trouvé');
            }
                
            // Envoyer la requête de suppression au backend
            await GlobalApi.deleteBooking(id);
    
            // Mettre à jour les états en supprimant le rendez-vous avec l'ID correspondant
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            setBookings(updatedBookings);
    
            const updatedTodayBookings = todayBookings.filter(booking => booking.id !== id);
            setTodayBookings(updatedTodayBookings);
    
            const updatedPastBookings = pastBookings.filter(booking => booking.id !== id);
            setPastBookings(updatedPastBookings);
    
            const updatedSortedTodayBookings = updatedTodayBookings.sort((a, b) => {
                const [hourA, minuteA] = a.attributes.Time.split(':').map(Number);
                const [hourB, minuteB] = b.attributes.Time.split(':').map(Number);
                return hourA === hourB ? minuteA - minuteB : hourA - hourB;
            });
            setSortedTodayBookings(updatedSortedTodayBookings);
    
            const now = new Date();
            const upcomingBookings = updatedSortedTodayBookings.filter(item => {
                const [itemHour, itemMinute] = item.attributes.Time.split(':').map(Number);
                return itemHour > now.getHours() || (itemHour === now.getHours() && itemMinute > now.getMinutes());
            });
            const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;
            setNextBooking(nextBooking);
    
            // Mettre à jour appointmentsPerDay et filteredAppointments
            const countByDay = updatedBookings.reduce((acc, booking) => {
                const bookingDate = new Date(booking.attributes.Date);
                const dayOfWeek = bookingDate.toLocaleDateString('fr-FR', { weekday: 'long' });
                if (!acc[dayOfWeek]) {
                    acc[dayOfWeek] = 0;
                }
                acc[dayOfWeek]++;
                return acc;
            }, {});
            setAppointmentsPerDay(countByDay);
    
            const filtered = updatedBookings.filter(appointment => {
                const appointmentDate = new Date(appointment.attributes.Date);
                const [hours, minutes] = appointment.attributes.Time.split(':').map(Number);
                const appointmentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    
                return (
                    !appointment.attributes.Confirmer &&
                    (appointmentDate > now || (appointmentDate.getTime() === now.getTime() && appointmentTime > now))
                );
            });
            setFilteredAppointments(filtered);
    
            // console.log('Rendez-vous annulé avec succès');
        } catch (error) {
            // Gérer l'erreur si la suppression échoue
            console.error("Échec de l'annulation du rendez-vous :", error);
        }
    };
    

    return (
        <>
         
            <div className="p-4 rounded-lg  mt-14">
           
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Les Rendez-Vous d'Aujourd'hui</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{todayBookings.length}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Patients d'Aujourd'hui</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>


                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{pastBookings.length}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Consultation Terminée</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{lastBookingTime}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Dernier Rendez-vous</p>
                    </div>
                </div>
            </div>
           
            {/* <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Les Rendez-Vous d'Aujourd'hui</p> */}
            <div className="shadow flex items-center justify-center h-full mb-4 rounded  dark:bg-gray-800 p-4">
                {/* <TodayAppointement bookings={sortedTodayBookings} handleAnnulation={handleAnnulation} /> */}
                <div className="w-full overflow-x-auto">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">Patient</th>
                            <th scope="col" className="px-6 py-3">Numéro de téléphone</th>
                            <th scope="col" className="px-6 py-3">Heure</th>
                            <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTodayBookings.map((booking, index) => (
                            
                            <tr key={booking.id} className="bg-white border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{booking.attributes.Nom + " "+booking.attributes.Prenom}</td>
                                <td className="px-6 py-4">{booking.attributes.Telephone}</td>
                                <td className="px-6 py-4">{booking.attributes.Time}</td>
                                <td className="px-6 py-4">
                                    <Link href={'/dashboard/details/'+booking.attributes.id_patient}>
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Consulter</button></Link>
                                    <Link  href={'/dashboard/fiche/' + booking.id}>
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Fiche</button></Link>
                                    <button onClick={() => handleAnnulation(booking.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline  mr-3">Annuler</button>
                                           
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div className="p-4 rounded-lg">
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Vue générale sur les rendez-vous</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{bookings.length}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Nombre total</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                            
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 23 23">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{filteredAppointments.length}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">En attente</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded dark:bg-gray-800 text-center text-2xl p-4 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                        <div className="flex items-center mb-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>



                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">{bookings.length - filteredAppointments.length}</h5>
                        </div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Déjà confirmés</p>
                    </div>
                </div>
            </div>
            {/* <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Patient Suivant</p> */}
            <div className="shadow flex items-center justify-center h-full mb-4 rounded  dark:bg-gray-800 p-4">
                <Barchart appointmentsPerDay={appointmentsPerDay} />
            </div>
            
            
        </>
    );
}

export default Kpis;
