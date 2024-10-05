"use client";
import GlobalApi from '@/app/home/_utils/GlobalApi';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';

function Historique({ user, setUser }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formData, setFormData] = useState({
        data: {
            id: "",
            Patient: "",
            Date: "",
            Commentaires: "",
            id_patient: "",
            Time: "",
            Booking_id: "",
            payed: false,
            PayedComment: "",
            montant: "" // Nouveau champ pour le montant
        }
    });
    

    const handleOpenPopup = (patient) => {
        console.log(patient)
        setSelectedPatient(patient);
        setFormData({
            data: {
                id: patient.id,
                Patient: patient.attributes.Patient,
                Date: patient.attributes.Date,
                Commentaires: patient.attributes.Commentaires,
                id_patient: patient.attributes.id_patient,
                Time: patient.attributes.Time,
                Booking_id: patient.attributes.Booking_id || "" ,
                payed: patient.attributes.payed,
                PayedComment: patient.attributes.PayedComment,
                montant: patient.attributes.montant || ""

            }
        });
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedPatient(null);
    };

    const handleClickOutside = (event) => {
        if (event.target.className.includes('popup-container')) {
            handleClosePopup();
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            data: {
                ...prevFormData.data,
                [id]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = formData.data.id;
        GlobalApi.updateFiche(id, formData)
            .then(response => {
                // Mettre à jour le tableau principal après la mise à jour réussie
                const updatedUser = user.map(patient =>
                    patient.id === id
                        ? { ...patient, attributes: { ...patient.attributes, ...formData.data } }
                        : patient
                );

                // Mettre à jour l'état du tableau principal
                // Note: Assurez-vous que `user` provient d'un état si vous devez mettre à jour le composant
                // par exemple : const [user, setUser] = useState(initialUserData);
                setUser(updatedUser);
                toast.success("Modification enregistrée avec succès.");
                // console.log('Mise à jour réussie:', response.data);
            })
            .catch(error => {
                // console.error('Erreur lors de la mise à jour:', error);
            })
            .finally(() => {
                handleClosePopup();
            });
    };

    return (
        <>
        <Toaster />
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Historique</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Patient</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Temps</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Consulter</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.attributes.Patient}</th>
                                <td className="px-6 py-4">{item.attributes.Date}</td>
                                <td className="px-6 py-4">{item.attributes.Time}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleOpenPopup(item)} 
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Consulter
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && (
                <div 
                    className="popup-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
                    onClick={handleClickOutside}
                >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
                        <form className="space-y-8" onSubmit={handleSubmit}>
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
                                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
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
<div className="flex-1">
    <label htmlFor="montant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">montant</label>
    <input
        type="number"
        id="montant"
        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
        value={formData.data.montant}
        onChange={handleChange}
    />
</div>

                            <div className="sm:col-span-2">
                                <label htmlFor="PayedComment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Commentaire sur le paiement</label>
                                <textarea
                                    id="PayedComment"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Commentaires sur le paiement..."
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
                </div>
            )}
        </>
    );
}

export default Historique;
