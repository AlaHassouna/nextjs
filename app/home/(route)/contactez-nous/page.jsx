import React from 'react';

function ContactezNous() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contactez-nous</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Vous avez un problème technique ? Vous souhaitez une explication sur quelque chose ? Faites-le nous savoir.</p>
          <form action="#" className="space-y-8">
              <div>
                  <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                  <input type="text" id="nom" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Nom" required/>
              </div>
              <div>
                  <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
                  <input type="text" id="prenom" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Prénom" required/>
              </div>
              <div>
                  <label htmlFor="tlf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numéro de téléphone</label>
                  <input type="text" id="tlf" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Numéro de téléphone" required/>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Votre message</label>
                  <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Laissez un commentaire..."></textarea>
              </div>
              <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Envoyer le message</button>
          </form>
      </div>
    </section>
  );
}

export default ContactezNous;
