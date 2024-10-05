"use client";
import GlobalApi from '@/app/home/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

function Fiche({ booking }) {
  const [formData, setFormData] = useState({
    data: {
      Patient: "",
      Date: "",
      Commentaires: "",
      id_patient: "",
      Time: "",
      payed: false, // Par défaut, "Non" est sélectionné
      PayedComment: "",
      montant:"",
    }
  });

  useEffect(() => {
    if (booking) {
      console.log(booking);
      setFormData({
        data: {
          Patient: (booking.Nom && booking.Prenom) ? `${booking.Nom} ${booking.Prenom}` : '',
          Date: booking.Date || new Date().toISOString().split('T')[0],
          Commentaires: booking.Commentaires || '',
          id_patient: booking.id_patient || "",
          Time: booking.Time || "",
          payed: booking.Payed || false, // Si la réservation a un statut de paiement, l'utiliser
          PayedComment: booking.PayedComment || "",
          Booking_id: booking.id,
          montant: booking.montant || "",
        }
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === "Payed") {
      setFormData((prevData) => ({
        data: {
          ...prevData.data,
          payed: value === "true", // Mettez à jour Payed basé sur le choix de l'utilisateur
        }
      }));
    } else {
      setFormData((prevData) => ({
        data: {
          ...prevData.data,
          [id]: type === 'checkbox' ? checked : value // Correctly updates for other fields
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    GlobalApi.addFiche(formData)
      .then(response => {
        toast.success("Fiche ajoutée avec succès");
      })
      .catch(error => {
        console.error("Error adding fiche:", error);
      });
  };

  return (
    <>
      <Toaster />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Fiche</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="Patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Patient</label>
              <input
                type="text"
                id="Patient"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Patient"
                value={formData.data.Patient}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="Date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                <input
                  type="date"
                  id="Date"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  value={formData.data.Date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="Time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Time</label>
                <input
                  type="text"
                  id="Time"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Time"
                  value={formData.data.Time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
                  <label className="inline-flex items-center cursor-pointer">
                      <span className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">Le patient a-t-il réalisé un paiement ?</span>
                      
                      <label className="inline-flex items-center mr-4">
                          <input 
                              type="radio" 
                              id="payed-yes" // Use a unique ID for "Oui"
                              name="payed" 
                              value="true" 
                              checked={formData.data.payed === true} // Check if Payed is true
                              className="form-radio" 
                              onChange={(e) => setFormData(prevFormData => ({
                                  data: {
                                      ...prevFormData.data,
                                      payed: true // Set payed to true
                                  }
                              }))} 
                          />
                          <span className="ml-2">Oui</span>
                      </label>

                      <label className="inline-flex items-center">
                          <input 
                              type="radio" 
                              id="payed-no" // Use a unique ID for "Non"
                              name="payed" 
                              value="false" 
                              checked={formData.data.payed === false} // Check if Payed is false
                              className="form-radio" 
                              onChange={(e) => setFormData(prevFormData => ({
                                  data: {
                                      ...prevFormData.data,
                                      payed: false // Set payed to false
                                  }
                              }))} 
                          />
                          <span className="ml-2">Non</span>
                      </label>
                  </label>
</div>
<div>
                        <label htmlFor="montant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Montant</label>
                        <input
                            type="text"
                            id="montant"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            placeholder="Montant"
                            value={formData.data.montant}
                            onChange={handleChange}
                            required
                        />
                    </div>
            <div className="sm:col-span-2">
              <label htmlFor="PayedComment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Commentaire sur le paiement</label>
              <textarea
                rows="2" cols="30"
                id="PayedComment"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Commentaire sur le paiement..."
                value={formData.data.PayedComment} 
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="Commentaires" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Commentaires</label>
              <textarea
                id="Commentaires"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Commentaires..."
                value={formData.data.Commentaires}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Fiche;
