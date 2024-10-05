"use client"
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import Link from 'next/link';

function Appointments() {
    const [bookingList, setBookingList] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [showPopup, setShowPopup] = useState(false);

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

    const handleEdit = (appointment) => {
        console.log(appointment)
        setSelectedAppointment(appointment);
        setNewDate(appointment.attributes.Date);
        setNewTime(appointment.attributes.Time);
        setShowPopup(true);
    };
    const handleConfirmation = async () => {
        if (!selectedAppointment) return;

        const updatedAppointment = {
            data: {
                Date: newDate,
                Time: newTime,
                Confirmer: true,
            },
        };

        try {
            const resp = await GlobalApi.updateBooking(selectedAppointment.id, updatedAppointment);

            const updatedList = bookingList.map(appointment => {
                if (appointment.id === selectedAppointment.id) {
                    return {
                        ...appointment,
                        attributes: {
                            ...appointment.attributes,
                            Date: newDate,
                            Time: newTime,
                            Confirmer: true,
                        },
                    };
                }
                return appointment;
            });

            setBookingList(updatedList);
            setFilteredAppointments(updatedList.filter(appointment => !appointment.attributes.Confirmer));

            const appointmentDate = new Date(`${newDate}T${newTime}`);
            const endTimeDate = new Date(appointmentDate.getTime() + 45 * 60000);
            const endHours = endTimeDate.getHours().toString().padStart(2, '0');
            const endMinutes = endTimeDate.getMinutes().toString().padStart(2, '0');
            const endTime = `${endHours}:${endMinutes}:00`;

            const eventToAdd = {
                data: {
                    title: `Rendez-vous ${newDate} ${newTime}`,
                    start_time: `${newTime}:00`,
                    end_time: endTime,
                    Date: newDate,
                    all_day: false,
                },
            };

            GlobalApi.addBlockedTime(eventToAdd).catch(error => {
                console.error("Error adding blocked time:", error);
            });

            setShowPopup(false);
        } catch (error) {
            console.error('Échec de la mise à jour du rendez-vous :', error);
        }
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedAppointment(null);
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
            // console.log('Rendez-vous annulé avec succès');
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
                                    <button onClick={() => handleEdit(appointment)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Modifier</button>
                                    <button onClick={() => handleConfirmation(appointment.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Confirmer</button>
                                    <button onClick={() => handleAnnulation(appointment.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Annuler</button>
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
             {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-5 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Modifier Rendez-vous</h2>
                            <label className="block mb-2">Nouvelle Date:</label>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="border p-2 rounded w-full mb-4"
                            />
                            <label className="block mb-2">Nouvelle Heure:</label>
                            <input
                                type="time"
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                                className="border p-2 rounded w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleClosePopup}
                                    className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleConfirmation}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

        </div>

    );
}

export default Appointments;

