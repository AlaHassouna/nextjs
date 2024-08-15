// "use client";
// import React, { useState, useEffect } from 'react';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import Image from 'next/image';

// function Profil() {
//   const { user } = useKindeBrowserClient();
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     dateDeNaissance: '',
//     tel: '',
//     hist: '',
//     medicaments: '',
//     allergies: '',
//     antecedentsOrthophoniques: '',
//     casEcheant: '',
//     developpementMoteur: '',
//     developpementMoteur: '',
//     acquisitionLangage: '',
//     antecedentsRetardLangageDeveloppement: false,
//     compositionFamille: '',
//     languages: [],
//     dynamique_familiale: '',
//     niveauScolaireActuel: '',
//     performancesAcademiques: ''
//   });

//   useEffect(() => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       nom: user?.family_name || '',
//       prenom: user?.given_name || '',
//       email: user?.email || ''
//     }));
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       if (name === 'languages') {
//         setFormData(prevFormData => {
//           if (checked) {
//             return {
//               ...prevFormData,
//               [name]: [...prevFormData[name], value]
//             };
//           } else {
//             return {
//               ...prevFormData,
//               [name]: prevFormData[name].filter(lang => lang !== value)
//             };
//           }
//         });
//       } else {
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           [name]: checked
//         }));
//       }
//     } else {
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <section className="bg-white dark:bg-gray-900">
//       <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
//         <form onSubmit={handleSubmit}>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Informations générales</h2>
//             <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
//               <div className="w-full">
//                 <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
//                 <input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
//               </div>
//               <div className="w-full">
//                 <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
//                 <input type="text" name="prenom" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
//               </div>
//               <div className="sm:col-span-2 mt-2">
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
//                 <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
//               </div>
//               <div>
//                 <label htmlFor="dateDeNaissance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de naissance</label>
//                 <input type="date" name="dateDeNaissance" id="dateDeNaissance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.dateDeNaissance} onChange={handleChange} required />
//               </div>
//               <div>
//                 <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de téléphone</label>
//                 <input type="text" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.tel} onChange={handleChange} placeholder="Numéro de téléphone" required />
//               </div>
//             </div>
//           </fieldset>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents médicaux</h2>
//             <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
//               <div className="sm:col-span-2">
//                 <label htmlFor="hist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Historique médical</label>
//                 <textarea id="hist" name="hist" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.hist} onChange={handleChange} placeholder="Historique médical " />
//               </div>
//               <div className="sm:col-span-2">
//                 <label htmlFor="medicaments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Médicaments actuels</label>
//                 <textarea id="medicaments" name="medicaments" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.medicaments} onChange={handleChange} placeholder="Médicaments actuels " />
//               </div>
//               <div className="sm:col-span-2">
//                 <label htmlFor="allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allergies</label>
//                 <textarea id="allergies" name="allergies" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.allergies} onChange={handleChange} placeholder="Allergies " />
//               </div>
//             </div>
//           </fieldset>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents orthophoniques</h2>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="antecedentsOrthophoniques" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Antécédents orthophoniques</label>
//               <textarea id="antecedentsOrthophoniques" name="antecedentsOrthophoniques" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.antecedentsOrthophoniques} onChange={handleChange} placeholder="Antécédents orthophoniques" />
//             </div>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="casEcheant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Si c'est le cas, lesquels et par qui</label>
//               <textarea id="casEcheant" name="casEcheant" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.casEcheant} onChange={handleChange} placeholder="Si c'est le cas, lesquels et par qui" />
//             </div>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="developpementMoteur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Résultats des évaluations précédentes</label>
//               <textarea id="resultatsEvaluationsPrecedentes" name="resultatsEvaluationsPrecedentes" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.resultatsEvaluationsPrecedentes} onChange={handleChange} placeholder="Résultats des évaluations précédentes" />
//             </div>
//           </fieldset>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Développement</h2>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="developpementMoteur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Développement moteur</label>
//               <textarea id="developpementMoteur" name="developpementMoteur" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.developpementMoteur} onChange={handleChange} placeholder="Développement moteur" />
//             </div>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="acquisitionLangage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acquisition du langage</label>
//               <textarea id="acquisitionLangage" name="acquisitionLangage" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.acquisitionLangage} onChange={handleChange} placeholder="Acquisition du langage" />
//             </div>
//             <div className="flex items-center mt-2">
//               <input type="checkbox" name="antecedentsRetardLangageDeveloppement" id="antecedentsRetardLangageDeveloppement" checked={formData.antecedentsRetardLangageDeveloppement} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//               <label htmlFor="antecedentsRetardLangageDeveloppement" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Antécédents de retard de langage ou de développement</label>
//             </div>
//           </fieldset>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Historique familial</h2>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="compositionFamille" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Composition de la famille</label>
//               <textarea id="compositionFamille" name="compositionFamille" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.compositionFamille} onChange={handleChange} placeholder="Composition de la famille" />
//             </div>
//             <div className="mt-4">
//               <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Langues parlées à la maison</p>
//               <div className="flex items-center">
//                 <input type="checkbox" name="languages" id="langue1" value="Langue1" checked={formData.languages.includes('Langue1')} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                 <label htmlFor="langue1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langue1</label>
//               </div>
//               <div className="flex items-center">
//                 <input type="checkbox" name="languages" id="langue2" value="Langue2" checked={formData.languages.includes('Langue2')} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                 <label htmlFor="langue2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langue2</label>
//               </div>
//               <div className="flex items-center">
//                 <input type="checkbox" name="languages" id="langue3" value="Langue3" checked={formData.languages.includes('Langue3')} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                 <label htmlFor="langue3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langue3</label>
//               </div>
//               <div className="flex items-center">
//                 <input type="checkbox" name="languages" id="langue4" value="Langue4" checked={formData.languages.includes('Langue4')} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                 <label htmlFor="langue4" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langue4</label>
//               </div>
//               <div className="flex items-center">
//                 <input type="checkbox" name="languages" id="langue5" value="Langue5" checked={formData.languages.includes('Langue5')} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                 <label htmlFor="langue5" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langue5</label>
//               </div>
//             </div>
//           </fieldset>
//           <fieldset>
//             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Motif de la consultation</h2>
//             <div className="sm:col-span-2 mt-2">
//               <label htmlFor="motifConsultation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Motif</label>
//               <textarea id="motifConsultation" name="motifConsultation" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.motifConsultation} onChange={handleChange} placeholder="Motif de la consultation" />
//             </div>
//           </fieldset>
        
//         <button type="submit" className="inline-block mt-4 px-6 py-3 text-sm font-medium text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 hover:bg-primary-700">
//           Soumettre
//         </button>
//       </form>
//     </div>
//     </section>
//   );
// };

// export default Profil;

"use client";
import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';

function Profil() {
const { user } = useKindeBrowserClient();
useEffect(() => {
}, [user]);
const [formData, setFormData] = useState({
      nom: '',
      prenom: '',
      dateDeNaissance: '',
      adresse: '',
      tel: '',
      email: '',
      
      hist: '',
      medicaments: '',
      allergies: '',

      orthophoniqueAnterieur: '',
      casEcheant: '',
      resultatsEvaluationsPrecedentes: '',

      developpementMoteur: '',
      acquisitionLangage: '',
      antecedentsRetardLangageDeveloppement: false,

      compositionFamille: '',
      languagesFam: [],
      dynamique_familiale: '',

      niveauScolaireActuel: '',
      performancesAcademiques: '',
      diffClasse: false,

      languages: [],
      comprehensionVerbale :'',
      expressionVerbale : '',

      comprehensionUtilisationGestes : '',
      contactVisuel:'',
      expressionsFaciales:'',

      loisirsActivitesPreferes:'',
      interactionsSociales:'',
      evenementsSignificatifsRecents:'',

      objectif:'',
      attentesPreoccupations:'',
    });

    useEffect(() => {
          setFormData(prevFormData => ({
            ...prevFormData,
            nom: user?.family_name || '',
            prenom: user?.given_name || '',
            email: user?.email || ''
          }));
        }, [user]);
      const handleChange = (e) => {
              const { name, value, type, checked } = e.target;
              if (type === 'checkbox') {
                if (name === 'languages' || name==='languagesFam') {
                  setFormData(prevFormData => {
                    if (checked) {
                      return {
                        ...prevFormData,
                        [name]: [...prevFormData[name], value]
                      };
                    } else {
                      return {
                        ...prevFormData,
                        [name]: prevFormData[name].filter(lang => lang !== value)
                      };
                    }
                  });
                } else {
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: checked
                  }));
                }
              } else {
                setFormData(prevFormData => ({
                  ...prevFormData,
                  [name]: value
                }));
              }
            };    

            const handleSubmit = (e) => {
                  e.preventDefault();
                  // console.log("hi :");
                  // console.log(formData);
                };
return (
<section className="bg-white dark:bg-gray-900">
<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
<form onSubmit={handleSubmit}>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Informations générales</h2>
<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
<div className="w-full">
<label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
<input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
</div>
<div className="w-full">
<label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
<input type="text" name="prenom" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
<input type="text" name="adresse" id="adresse" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />
</div>
<div>
<label htmlFor="dateDeNaissance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de naissance</label>
<input type="date" name="dateDeNaissance" id="dateDeNaissance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.dateDeNaissance} onChange={handleChange} required />
</div>
<div>
<label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de téléphone</label>
<input type="text" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Numéro de téléphone" value={formData.tel} onChange={handleChange}  required />
</div>
</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents médicaux</h2>
<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
<div className="sm:col-span-2">
<label htmlFor="hist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Historique médical</label>
<textarea id="hist" name="hist"  value={formData.hist} onChange={handleChange} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Historique médical " />
</div>
<div className="sm:col-span-2">
<label htmlFor="medicaments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Médicaments actuels</label>
<textarea id="medicaments" name="medicaments" value={formData.medicaments} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Médicaments actuels " />
</div>
<div className="sm:col-span-2">
<label htmlFor="allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allergies</label>
<textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Allergies " />
</div>
</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents orthophoniques</h2>
<div className="sm:col-span-2 mt-2">
<label htmlFor="antecedentsOrthophoniques" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Antécédents orthophoniques</label>
<input type="text" name="antecedentsOrthophoniques" value={formData.antecedentsOrthophoniques} onChange={handleChange}id="antecedentsOrthophoniques" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Antécédents orthophoniques" required />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="casEcheant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Le cas échéant</label>
<textarea id="casEcheant" name="casEcheant" value={formData.casEcheant} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Le cas échéant " />
</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Développement moteur et acquisition du langage</h2>
<div className="sm:col-span-2 mt-2">
<label htmlFor="resultatsEvaluationsPrecedentes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Résultats des évaluations précédentes</label>
<textarea id="resultatsEvaluationsPrecedentes" name="resultatsEvaluationsPrecedentes" value={formData.resultatsEvaluationsPrecedentes} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Résultats des évaluations précédentes " />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="developpementMoteur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Développement moteur</label>
<textarea id="developpementMoteur" name="developpementMoteur" value={formData.developpementMoteur} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Développement moteur " />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="acquisitionLangage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acquisition du langage</label>
<textarea id="acquisitionLangage" name="acquisitionLangage" value={formData.acquisitionLangage} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Acquisition du langage " />
</div>
<div className="flex items-center mt-2">
<input type="checkbox" id="antecedentsRetardLangageDeveloppement" name="antecedentsRetardLangageDeveloppement" value={formData.antecedentsRetardLangageDeveloppement} onChange={handleChange} className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label htmlFor="antecedentsRetardLangageDeveloppement" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Antécédents de retard de langage ou de développement</label>
</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Composition familiale</h2>
<div className="sm:col-span-2 mt-2">
<label htmlFor="compositionFamille" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Composition de la famille</label>
<textarea id="compositionFamille" name="compositionFamille" value={formData.compositionFamille} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Composition de la famille " />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="languesParlees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Langues parlées à la maison</label>
<label>
<input type="checkbox" name="languagesFam" id="Arabic" value="Arabic" checked={formData.languagesFam.includes('Arabic')} onChange={handleChange} /> Arabic
</label>
<label>
<input type="checkbox" className='ml-3' name="languagesFam" id="French" value="French" checked={formData.languagesFam.includes('French')} onChange={handleChange}/> French
</label>
<label>
<input type="checkbox"  className='ml-3' name="languagesFam" id="English" value="English" checked={formData.languagesFam.includes('English')} onChange={handleChange}/> English
</label>
<label>
<input type="checkbox" className='ml-3' name="languagesFam" id="German" value="German" checked={formData.languagesFam.includes('German')} onChange={handleChange}/> German
</label>
<label>
<input type="checkbox" className='ml-3' name="languagesFam" id="Spanish" value="Spanish" checked={formData.languagesFam.includes('Spanish')} onChange={handleChange}/> Spanish
</label>
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="dynamique_familiale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dynamique familiale</label>
<input type="text" name="dynamique_familiale" id="dynamique_familiale" value={formData.dynamique_familiale} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dynamique familiale" required />
</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Scolarité </h2>
<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
<div className="w-full">
<label htmlFor="niveau-scolaire-actuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Niveau scolaire actuel</label>
<input type="text" name="niveauScolaireActuel" value={formData.niveauScolaireActuel} onChange={handleChange} id="niveau-scolaire-actuel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Niveau scolaire actuel" required />
</div>
<div className="w-full">
<label htmlFor="performancesAcademiques" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Performances académiques</label>
<input type="text" name="performancesAcademiques" value={formData.performancesAcademiques} onChange={handleChange} id="performancesAcademiques" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Prénom" required />
</div>
<div className="sm:col-span-2 mt-2">
<label htmlFor="diffClasse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Existence de difficultés en classe</label>
<input type="text" name="diffClasse" value={formData.diffClasse} onChange={handleChange} id="diffClasse" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Existence de difficultés en classe" required />
</div>

</div>
</fieldset>
<fieldset>
<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Compétences linguistiques</h2>
<div className="sm:col-span-2 mt-2">
<label htmlFor="languesParlees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Langues parlées</label>
<label>
< input type="checkbox" name="languages" id="Arabic" value="Arabic" checked={formData.languages.includes('Arabic')} onChange={handleChange} /> Arabic
</label>
<label>
<input type="checkbox" className='ml-3' name="languages" id="French" value="French" checked={formData.languages.includes('French')} onChange={handleChange} /> French
</label>
<label>
<input type="checkbox"  className='ml-3' name="languages" id="English" value="English" checked={formData.languages.includes('English')} onChange={handleChange} /> English
</label>
<label>
<input type="checkbox" className='ml-3' name="languages" id="German" value="German" checked={formData.languages.includes('German')} onChange={handleChange} /> German
</label>
<label>
<input type="checkbox" className='ml-3' name="languages" id="Spanish" value="Spanish" checked={formData.languages.includes('Spanish')} onChange={handleChange} /> Spanish
</label>
</div>
<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
<div className="w-full">
<label htmlFor="comprehension-verbale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Compréhension verbale</label>
<input type="text" name="comprehensionVerbale" value={formData.comprehensionVerbale} onChange={handleChange} id="comprehension-verbale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Comprehension Verbale" required />
</div>
<div className="w-full">
<label htmlFor="expressionVerbale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expression verbale</label>
<input type="text" name="expressionVerbale" value={formData.expressionVerbale} onChange={handleChange} id="expressionVerbale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Expression verbale" required />
</div>
</div>
</fieldset>
      <fieldset>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Communication non verbale</h2>
        <div className="sm:col-span-2 mt-2">
          <label htmlFor="comprehensionUtilisationGestes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Compréhension et utilisation des gestes</label>
          <input type="text" name="comprehensionUtilisationGestes" value={formData.comprehensionUtilisationGestes} onChange={handleChange} id="comprehensionUtilisationGestes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Compréhension et utilisation des gestes" required />
        </div>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
            <div className="w-full">
                <label htmlFor="contactVisuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact visuel</label>
                <input type="text" name="contactVisuel" value={formData.contactVisuel} onChange={handleChange} id="contactVisuel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Contact visuel" required />
            </div>
            <div className="w-full">
                <label htmlFor="expressionsFaciales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expressions faciales</label>
                <input type="text" name="expressionsFaciales" value={formData.expressionsFaciales} onChange={handleChange} id="expressionsFaciales" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Expressions faciales" required />
            </div>
          </div>

      </fieldset>
      <fieldset>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Histoire sociale</h2>
        
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
                <div className="w-full">
                    <label htmlFor="loisirsActivitesPreferes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loisirs et activités préférés</label>
                    <input type="text" name="loisirsActivitesPreferes" value={formData.loisirsActivitesPreferes} onChange={handleChange} id="loisirsActivitesPreferes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Loisirs et activités préférés" required />
                </div>
                <div className="w-full">
                    <label htmlFor="interactionsSociales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interactions sociales (amis, famille)</label>
                    <input type="text" name="interactionsSociales" value={formData.interactionsSociales} onChange={handleChange} id="interactionsSociales" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Interactions sociales (amis, famille)" required />
                </div>
          </div>
          <div className="sm:col-span-2 mt-2">
                <label htmlFor="evenementsSignificatifsRecents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Événements significatifs récents</label>
                <input type="text" name="evenementsSignificatifsRecents" value={formData.evenementsSignificatifsRecents} onChange={handleChange} id="evenementsSignificatifsRecents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Événements significatifs récents" required />
          </div>

      </fieldset>
      <fieldset>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Objectifs thérapeutiques</h2>
        <div className="sm:col-span-2 mt-2">
          <label htmlFor="objectif" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objectifs spécifiques pour la prise en charge orthophonique</label>
          <textarea id="objectif" name="objectif" value={formData.objectif} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Objectifs spécifiques pour la prise en charge orthophonique" />
        </div>
        <div className="sm:col-span-2 mt-2">
          <label htmlFor="attentesPreoccupations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attentes et préoccupations des parents/patients</label>
          <textarea id="attentesPreoccupations" name="attentesPreoccupations" value={formData.attentesPreoccupations} onChange={handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Attentes et préoccupations des parents/patients" />
        </div>
        
      </fieldset>
      <button type="submit" className="mt-4 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900">Enregistrer</button>
    </form>
  </div>
</section>
);
}

export default Profil;