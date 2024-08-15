"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import bcrypt from 'bcryptjs'; // Import bcrypt.js for password hashing

function Inscription() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (strongPattern.test(password)) {
      setPasswordStrength('strong');
    } else if (mediumPattern.test(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
    } else if (passwordStrength === 'weak') {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères, dont au moins une lettre majuscule, une lettre minuscule, et un chiffre.');
    } else {
      setErrorMessage('');
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const formDataToSend = {
        data: {
          email: formData.email,
          password: hashedPassword, // Send the hashed password to Strapi
        }
      };
      try {
        console.log(formDataToSend);
        const response = await GlobalApi.Register(formDataToSend);
        console.log('Response from Strapi:', response.data);
        setSuccessMessage('Compte créé avec succès ! Redirection vers la page de connexion...');
        // setTimeout(() => {
        //   window.location.href = '/home/login'; // Redirection vers la page de connexion après un délai
        // }, 3000); // Délai en millisecondes (ici 3 secondes)
      } catch (error) {
        console.error('Error while registering:', error);
        setErrorMessage('Une erreur s\'est produite lors de la création du compte. Veuillez réessayer plus tard.');
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Créez un compte
            </h1>
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordStrength === 'weak' ? 'border-red-500' : ''}`} required />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmez le mot de passe</label>
                <input type="password" name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleInputChange} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordStrength === 'weak' ? 'border-red-500' : ''}`} required />
              </div>
              {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
              <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Créer un compte</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte ? <Link href={'/home/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous ici</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inscription;
