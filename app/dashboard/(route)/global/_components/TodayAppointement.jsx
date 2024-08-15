import GlobalApi from '@/app/home/_utils/GlobalApi';
import React from 'react';

function TodayAppointement({ bookings}) {
  console.log(bookings)
  const handleAnnulation = async (id) => {
    try {
        // Envoyer la requête de suppression au backend
        await GlobalApi.deleteBooking(id);
        
        // Mettre à jour bookings en supprimant l'appointment avec l'ID correspondant
        const updatedBookings = bookings.filter(booking => booking.id !== id);
        setBookings(updatedBookings);

        console.log('Rendez-vous annulé avec succès');
    } catch (error) {
        // Gérer l'erreur si la suppression échoue
        console.error("Échec de l'annulation du rendez-vous :", error);
    }
};


  // console.log('bookings'+bookings)

  return (
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
            {bookings.map((booking, index) => (
              
              <tr key={booking.id} className="bg-white border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{booking.attributes.UserName}</td>
                <td className="px-6 py-4">{booking.attributes.Telephone}</td>
                <td className="px-6 py-4">{booking.attributes.Time}</td>
                <td className="px-6 py-4">
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Consulter</button>
                      <button onClick={() => handleAnnulation(booking.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Annuler</button>
                               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodayAppointement;
