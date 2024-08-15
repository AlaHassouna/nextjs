"use client"
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import Link from 'next/link';

function Appointments() {
    const [bookingList, setBookingList] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    
    useEffect(() => {
        GlobalApi.getBookingList().then(resp => {
            const bookings = resp.data.data;

            setBookingList(bookings);
        });
    }, []);

    useEffect(() => {
        const now = new Date();
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const filtered = bookingList.filter(appointment => {
            // console.log("appointment :",appointment)

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

        
    }, [bookingList]);

    const handleConfirmation = async (id) => {
        // Trouver le rendez-vous par ID
        const appointmentToConfirm = bookingList.find(appointment => appointment.id === id);
        console.log('appointmentToConfirm', appointmentToConfirm);
        
        // Mettre à jour l'objet de rendez-vous
        const updatedAppointment = {
            data: {
                Confirmer: true // Définir Confirmer à true
            },
        };
    
        try {
            // Envoyer la requête de mise à jour au backend avec await
            const resp = await GlobalApi.updateBooking(id, updatedAppointment);
    
            // Mettre à jour bookingList pour refléter la confirmation
            const updatedList = bookingList.map(appointment => {
                if (appointment.id === id) {
                    return {
                        ...appointment,
                        attributes: {
                            ...appointment.attributes,
                            Confirmer: true
                        }
                    };
                }
                return appointment;
            });
    
            // Mettre à jour l'état local bookingList
            setBookingList(updatedList);
    
            // Rafraîchir la liste des rendez-vous filtrés si nécessaire
            const filtered = updatedList.filter(appointment => !appointment.attributes.Confirmer);
            setFilteredAppointments(filtered);
            console.log("début :");
    
            // Extraire la date et l'heure de début en utilisant `appointmentToConfirm`
            const appointmentDate = new Date(`${appointmentToConfirm.attributes.Date}T${appointmentToConfirm.attributes.Time}`);
            console.log("appointmentDate : ", appointmentDate);
    
            // Extraire et formater le `startTime`
            const [hours, minutes] = appointmentToConfirm.attributes.Time.split(':').map(part => part.padStart(2, '0'));
            const startTime = `${hours}:${minutes}:00`; // Format : HH:MM:SS
            console.log("startTime : ", startTime);
            console.log("appointmentDate.getTime() : ", appointmentDate.getTime());
            
            // Calculer l'heure de fin en ajoutant 45 minutes
            const endTimeDate = new Date(appointmentDate.getTime() + 45 * 60000);
            const endHours = endTimeDate.getHours().toString().padStart(2, '0');
            const endMinutes = endTimeDate.getMinutes().toString().padStart(2, '0');
            const endTime = `${endHours}:${endMinutes}:00`; // Format : HH:MM:SS
            console.log("endTime : ", endTime);
    
            // Créer l'objet eventToAdd
            const eventToAdd = {
                data: {
                    title: `Rendez-vous ${appointmentToConfirm.attributes.Date} ${startTime}`,
                    start_time: startTime,
                    end_time: endTime,
                    Date: appointmentToConfirm.attributes.Date,
                    all_day: false
                }
            };
    
            console.log(eventToAdd);
            GlobalApi.addBlockedTime(eventToAdd)
            .then(
            )
            .catch(error => {
            console.error("Error adding blocked time:", error);
            });
            // Gérer le succès si nécessaire
        } catch (error) {
            // Gérer l'erreur si la mise à jour échoue
            console.error('Échec de la confirmation du rendez-vous :', error);
        }
    };
    const handleAnnulation = async (id) => {
        try {
            // Envoyer la requête de suppression au backend
            await GlobalApi.deleteBooking(id);
    
            // Mettre à jour bookingList en supprimant l'élément avec l'ID correspondant
            const updatedList = bookingList.filter(appointment => appointment.id !== id);
            setBookingList(updatedList);
    
            // Rafraîchir la liste des rendez-vous filtrés si nécessaire
            const filtered = updatedList.filter(appointment => !appointment.attributes.Confirmer);
            setFilteredAppointments(filtered);
    
            // Gérer le succès si nécessaire
            console.log('Rendez-vous annulé avec succès');
        } catch (error) {
            // Gérer l'erreur si la suppression échoue
            console.error("Échec de l'annulation du rendez-vous :", error);
        }
    };

    return (
        <div className="w-full overflow-x-auto">

            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Les rendez-vous à confirmer</p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">PATIENT</th>
                            <th scope="col" className="px-6 py-3">Numéro de téléphone</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Commentaire</th>
                            <th scope="col" className="px-6 py-3 text-right">
                                <span className="sr-only">Confirmer</span>
                                <span className="sr-only">Annuler</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {appointment.attributes.UserName}
                                </th>
                                <td className="px-6 py-4">
                                    {appointment.attributes.Telephone}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(appointment.attributes.Date).toLocaleDateString()} {appointment.attributes.Time}
                                </td>
                                <td className="px-6 py-4">
                                    {appointment.attributes.Note}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleConfirmation(appointment.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Confirmer</button>
                                    <button onClick={() => handleAnnulation(appointment.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Annuler</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div class=" h-96 mb-4 mt-8 " >
                <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">Tous les rendez-vous</p>
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">PATIENT</th>
                            <th scope="col" className="px-6 py-3">Numéro de téléphone</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Commentaire</th>
                            <th scope="col" className="px-6 py-3 text-right">
                                <span className="sr-only">Consulter</span>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingList.map((appointment) => (
                            <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {appointment.attributes.UserName}
                                </th>
                                <td className="px-6 py-4">
                                    {appointment.attributes.Telephone}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(appointment.attributes.Date).toLocaleDateString()} {appointment.attributes.Time}
                                </td>
                                <td className="px-6 py-4">
                                    {appointment.attributes.Note}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={'/dashboard/details/'+appointment.attributes.id_patient}>
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Consulter</button>
                                    </Link>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             </div>
        </div>
    );
}

export default Appointments;

