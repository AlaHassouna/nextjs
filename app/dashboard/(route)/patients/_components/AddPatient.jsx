import GlobalApi from '@/app/home/_utils/GlobalApi';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddPatient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    data: {
      family_name: '',
      given_name: '',
      Adresse: '',
      Date_de_naissance: '',
      Phone: '',
      id_patient:'',
    },
  });
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      data: {
        ...prevData.data, // Copier les données existantes de 'data'
        [name]: value, // Mettre à jour la clé correspondante avec la nouvelle valeur
      }
    }));
  };

 // Generate a unique id for the patient using family name and a random number
 const generateUniqueId = (familyName) => {
    const randomNum = Math.floor(Math.random() * 1000000000000000000); // Random number 
    return `Marwa-${randomNum}`; // Combine family name and random number
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure id_patient is unique by using the family name and a random number
    const updatedFormData = {
      ...formData,
      data: {
        ...formData.data,
        id_patient: generateUniqueId(formData.data.family_name), // Assign the unique ID
      },
    };

    GlobalApi.Register(updatedFormData)
      .then((response) => {
        console.log('Données envoyées:', updatedFormData.data); // Show the updated data in console
        console.log('Réponse de l\'API:', response); // Show API response in console
        toggleModal(); // Close modal on success
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi:', error); // Handle errors
      });

    toggleModal();
    toast.success("Patient ajouté avec succès."); // Close the modal after submitting
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Ajouter Patient
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Ajouter Patient
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="family_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      name="family_name"
                      id="family_name"
                      value={formData.family_name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="given_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Prenom
                    </label>
                    <input
                      type="text"
                      name="given_name"
                      id="given_name"
                      value={formData.given_name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Adresse"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="Adresse"
                      id="Adresse"
                      value={formData.Adresse}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Date_de_naissance"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      name="Date_de_naissance"
                      id="Date_de_naissance"
                      value={formData.Date_de_naissance}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Numéro de téléphone
                    </label>
                    <input
                      type="text"
                      name="Phone"
                      id="Phone"
                      value={formData.Phone}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPatient;
