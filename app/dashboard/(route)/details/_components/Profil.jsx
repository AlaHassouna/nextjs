"use client";
import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import { toast, Toaster } from 'sonner';

function Profil({ user }) {
  // const { user } = useKindeBrowserClient();
  // console.log('user',user)
  const [formData, setFormData] = useState({

    family_name: '',
    given_name: '',
    Date_de_naissance: '',
    Adresse: '',
    Phone: '',
    email: '',
    historique_medical: '',
    medicaments_actuels: '',
    Allergies: '',
    Antecedents_orthophoniques:'',
    cas_echeant: '',
    Resultats_des_evaluations_precedentes: '',
    Developpement_moteur: '',
    Acquisition_du_langage: '',
    Antecedents_de_retard_de_langage_ou_de_developpement: false,
    Composition_de_la_famille: '',
    Langues_parlees_a_la_maison: [],
    Dynamique_familiale: '',
    Niveau_scolaire_actuel: '',
    Performances_academiques: '',
    Existence_de_difficultes_en_classe: false,
    Langues_parlees: [],
    Comprehension_verbale: '',
    expressionVerbale: '',
    comprehensionUtilisationGestes: '',
    Contact_visuel: '',
    Expressions_faciales: '',
    Loisirs_et_activites_preferes: '',
    Interactions_sociales: '',
    Evenements_significatifs_recents: '',
    Objectifs_specifiques_pour_la_prise_en_charge_orthophonique: '',
    Attentes_et_preoccupations_des_parents_patients: '',
  });
  useEffect(() => {
    if (user) {
      setFormData({

        family_name: user.attributes.family_name || '',
        given_name: user.attributes.given_name || '',
        Date_de_naissance: user.attributes.Date_de_naissance || '',
        Adresse: user.attributes.Adresse || '',
        Phone: user.attributes.Phone || '',
        email: user.attributes.email || '',
        historique_medical: user.attributes.historique_medical || '',
        medicaments_actuels: user.attributes.medicaments_actuels || '',
        Allergies: user.attributes.Allergies || '',
        Antecedents_orthophoniques: user.attributes.Antecedents_orthophoniques || '',
        cas_echeant: user.attributes.cas_echeant || '',
        Resultats_des_evaluations_precedentes: user.attributes.Resultats_des_evaluations_precedentes || '',
        Developpement_moteur: user.attributes.Developpement_moteur || '',
        Acquisition_du_langage: user.attributes.Acquisition_du_langage || '',
        Antecedents_de_retard_de_langage_ou_de_developpement: user.attributes.Antecedents_de_retard_de_langage_ou_de_developpement || false,
        Composition_de_la_famille: user.attributes.Composition_de_la_famille || '',
        Langues_parlees_a_la_maison: user.attributes.Langues_parlees_a_la_maison?.split(", ") || [],
        Dynamique_familiale: user.attributes.Dynamique_familiale || '',
        Niveau_scolaire_actuel: user.attributes.Niveau_scolaire_actuel || '',
        Performances_academiques: user.attributes.Performances_academiques || '',
        Existence_de_difficultes_en_classe: user.attributes.Existence_de_difficultes_en_classe || false,
        Langues_parlees: user.attributes.Langues_parlees?.split(", ") || [],
        Comprehension_verbale: user.attributes.Comprehension_verbale || '',
        expressionVerbale: user.attributes.expressionVerbale || '',
        comprehensionUtilisationGestes: user.attributes.comprehensionUtilisationGestes || '',
        Contact_visuel: user.attributes.Contact_visuel || '',
        Expressions_faciales: user.attributes.Expressions_faciales || '',
        Loisirs_et_activites_preferes: user.attributes.Loisirs_et_activites_preferes || '',
        Interactions_sociales: user.attributes.Interactions_sociales || '',
        Evenements_significatifs_recents: user.attributes.Evenements_significatifs_recents || '',
        Objectifs_specifiques_pour_la_prise_en_charge_orthophonique: user.attributes.Objectifs_specifiques_pour_la_prise_en_charge_orthophonique || '',
        Attentes_et_preoccupations_des_parents_patients: user.attributes.Attentes_et_preoccupations_des_parents_patients || '',
      });
    }
  }, [user]);
    // const [formData, setFormData] = useState({
    //       family_name: '',
    //       given_name: '',
    //       Date_de_naissance: '',
    //       Adresse: '',
    //       Phone: '',
    //       email: '',
          
    //       historique_medical: '',
    //       medicaments_actuels: '',
    //       Allergies: '',

    //       Antecedents_orthophoniques:'',
    //       cas_echeant: '',
    //       Resultats_des_evaluations_precedentes: '',
    
    //       Developpement_moteur: '',
    //       Acquisition_du_langage: '',
    //       Antecedents_de_retard_de_langage_ou_de_developpement: false,
    
    //       Composition_de_la_famille: '',
    //       Langues_parlees_a_la_maison: [],
    //       Dynamique_familiale: '',
    
    //       Niveau_scolaire_actuel: '',
    //       Performances_academiques: '',
    //       Existence_de_difficultes_en_classe: false,
    
    //       Langues_parlees: [],
    //       Comprehension_verbale :'',
    //       expressionVerbale : '',
    
    //       comprehensionUtilisationGestes : '',
    //       Contact_visuel:'',
    //       Expressions_faciales:'',
    
    //       Loisirs_et_activites_preferes:'',
    //       Interactions_sociales:'',
    //       Evenements_significatifs_recents:'',
    
    //       Objectifs_specifiques_pour_la_prise_en_charge_orthophonique:'',
    //       Attentes_et_preoccupations_des_parents_patients:'',
    //     });
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('Form data:', formData);
      const updatedObject = {
        "data":{
        ...formData,
        Langues_parlees_a_la_maison: formData.Langues_parlees_a_la_maison.join(', '),
        Langues_parlees: formData.Langues_parlees.join(', ')
        }
      };
      // console.log('updatedObject:', updatedObject);

      GlobalApi.updatePatient(user.id, updatedObject)
      .then(response => {
        toast.success("Modification enregistrée avec succès.");

        // console.log("Patient updated successfully:", response);
        // Ajoutez ici tout autre traitement après la mise à jour du patient.
      })
      .catch(error => {
        console.error("Error updating patient:", error);
        // Gérez les erreurs ici.
      });
      // Envoyer formData au backend ou effectuer d'autres actions
    };
    const handleCheckboxChange = (e) => {
      const { name, value } = e.target;
    
      setFormData((prevData) => {
        if (prevData[name].includes(value)) {
          // Si la langue est déjà sélectionnée, on la retire
          return {
            ...prevData,
            [name]: prevData[name].filter((langue) => langue !== value),
          };
        } else {
          // Si la langue n'est pas encore sélectionnée, on l'ajoute
          return {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        }
      });
      
    };
    
        
    return (
    
    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16 mt-6">

<Toaster />
     <form onSubmit={handleSubmit}>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Informations générales</h2>
    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
    <div className="w-full">
    <label htmlFor="family_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
    <input type="text" name="family_name" id="family_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.family_name}  onChange={handleChange} placeholder="Nom"  />
    </div>
    <div className="w-full">
    <label htmlFor="given_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
    <input type="text" name="given_name" id="given_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.given_name}  onChange={handleChange} placeholder="Prénom"  />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.email}  onChange={handleChange} placeholder="E-mail"  />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Adresse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
    <input type="text" name="Adresse" id="Adresse" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.Adresse}  onChange={handleChange} placeholder="Adresse"  />
    </div>
    <div>
    <label htmlFor="Date_de_naissance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de naissance</label>
    <input type="date" name="Date_de_naissance" id="Date_de_naissance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.Date_de_naissance} onChange={handleChange}  />
    </div>
    <div>
    <label htmlFor="Phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de téléphone</label>
    <input type="text" name="Phone" id="Phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Numéro de téléphone" value={formData.Phone}    />
    </div>
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents médicaux</h2>
    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
    <div className="sm:col-span-2">
    <label htmlFor="historique_medical" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Historique médical</label>
    <textarea id="historique_medical" name="historique_medical"  value={formData.historique_medical}  rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  onChange={handleChange} placeholder="Historique médical " />
    </div>
    <div className="sm:col-span-2">
    <label htmlFor="medicaments_actuels" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Médicaments actuels</label>
    <textarea id="medicaments_actuels" name="medicaments_actuels" value={formData.medicaments_actuels}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Médicaments actuels " />
    </div>
    <div className="sm:col-span-2">
    <label htmlFor="Allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allergies</label>
    <textarea id="Allergies" name="Allergies" value={formData.Allergies}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Allergies " />
    </div>
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Antécédents orthophoniques</h2>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Antecedents_orthophoniques" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Antécédents orthophoniques</label>
    <input type="text" name="Antecedents_orthophoniques" value={formData.Antecedents_orthophoniques} id="Antecedents_orthophoniques" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Antécédents orthophoniques"  />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="cas_echeant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Le cas échéant</label>
    <textarea id="cas_echeant" name="cas_echeant" value={formData.cas_echeant}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Le cas échéant " />
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Développement moteur et acquisition du langage</h2>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Resultats_des_evaluations_precedentes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Résultats des évaluations précédentes</label>
    <textarea id="Resultats_des_evaluations_precedentes" name="Resultats_des_evaluations_precedentes" value={formData.Resultats_des_evaluations_precedentes}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Résultats des évaluations précédentes " />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Developpement_moteur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Développement moteur</label>
    <textarea id="Developpement_moteur" name="Developpement_moteur" value={formData.Developpement_moteur}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Développement moteur " />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Acquisition_du_langage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Acquisition du langage</label>
    <textarea id="Acquisition_du_langage" name="Acquisition_du_langage" value={formData.Acquisition_du_langage}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Acquisition du langage " />
    </div>
    <div className="flex items-center mt-2">
    <input type="checkbox" id="Antecedents_de_retard_de_langage_ou_de_developpement" name="Antecedents_de_retard_de_langage_ou_de_developpement" checked={formData.Antecedents_de_retard_de_langage_ou_de_developpement}
  onChange={handleChange} className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="Antecedents_de_retard_de_langage_ou_de_developpement" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Antécédents de retard de langage ou de développement</label>
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Composition familiale</h2>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Composition_de_la_famille" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Composition de la famille</label>
    <textarea id="Composition_de_la_famille" name="Composition_de_la_famille" value={formData.Composition_de_la_famille}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Composition de la famille " />
    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="languesParlees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  Langues parlées à la maison
</label>

<label>
  <input
    type="checkbox"
    name="Langues_parlees_a_la_maison"
    id="Arabe"
    value="Arabe"
    checked={formData.Langues_parlees_a_la_maison.includes('Arabe')}
    onChange={handleCheckboxChange}
  /> Arabe
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees_a_la_maison"
    id="Français"
    value="Français"
    checked={formData.Langues_parlees_a_la_maison.includes('Français')}
    onChange={handleCheckboxChange}
  /> Français
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees_a_la_maison"
    id="Anglais"
    value="Anglais"
    checked={formData.Langues_parlees_a_la_maison.includes('Anglais')}
    onChange={handleCheckboxChange}
  /> Anglais
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees_a_la_maison"
    id="Allemand"
    value="Allemand"
    checked={formData.Langues_parlees_a_la_maison.includes('Allemand')}
    onChange={handleCheckboxChange}
  /> Allemand
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees_a_la_maison"
    id="Espagnol"
    value="Espagnol"
    checked={formData.Langues_parlees_a_la_maison.includes('Espagnol')}
    onChange={handleCheckboxChange}
  /> Espagnol
</label>

    </div>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="Dynamique_familiale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dynamique familiale</label>
    <input type="text" name="Dynamique_familiale" id="Dynamique_familiale" value={formData.Dynamique_familiale}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Dynamique familiale"  />
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Scolarité </h2>
    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
    <div className="w-full">
    <label htmlFor="niveau-scolaire-actuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Niveau scolaire actuel</label>
    <input type="text" name="Niveau_scolaire_actuel" value={formData.Niveau_scolaire_actuel}  id="niveau-scolaire-actuel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Niveau scolaire actuel"  />
    </div>
    <div className="w-full">
    <label htmlFor="Performances_academiques" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Performances académiques</label>
    <input type="text" name="Performances_academiques" value={formData.Performances_academiques}  id="Performances_academiques" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Prénom"  />
    </div>
    <div className="flex items-center">
  <input
    type="checkbox"
    id="Existence_de_difficultes_en_classe"
    name="Existence_de_difficultes_en_classe"
    checked={formData.Existence_de_difficultes_en_classe}
    onChange={handleChange}
    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label
    htmlFor="Existence_de_difficultes_en_classe"
    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    Existence de difficultés en classe
  </label>
</div>
    
    </div>
    </fieldset>
    <fieldset>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Compétences linguistiques</h2>
    <div className="sm:col-span-2 mt-2">
    <label htmlFor="languesParlees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  Langues parlées
</label>

<label>
  <input
    type="checkbox"
    name="Langues_parlees"
    id="Arabe"
    value="Arabe"
    checked={formData.Langues_parlees.includes('Arabe')}
    onChange={handleCheckboxChange}
  /> Arabe
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees"
    id="Français"
    value="Français"
    checked={formData.Langues_parlees.includes('Français')}
    onChange={handleCheckboxChange}
  /> Français
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees"
    id="Anglais"
    value="Anglais"
    checked={formData.Langues_parlees.includes('Anglais')}
    onChange={handleCheckboxChange}
  /> Anglais
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees"
    id="Allemand"
    value="Allemand"
    checked={formData.Langues_parlees.includes('Allemand')}
    onChange={handleCheckboxChange}
  /> Allemand
</label>

<label>
  <input
    type="checkbox"
    className="ml-3"
    name="Langues_parlees"
    id="Espagnol"
    value="Espagnol"
    checked={formData.Langues_parlees.includes('Espagnol')}
    onChange={handleCheckboxChange}
  /> Espagnol
</label>

    </div>
    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
    <div className="w-full">
    <label htmlFor="comprehension-verbale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Compréhension verbale</label>
    <input type="text" name="Comprehension_verbale" value={formData.Comprehension_verbale}  id="comprehension-verbale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Comprehension Verbale"  />
    </div>
    <div className="w-full">
    <label htmlFor="expressionVerbale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expression verbale</label>
    <input type="text" name="expressionVerbale" value={formData.expressionVerbale}  id="expressionVerbale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Expression verbale"  />
    </div>
    </div>
    </fieldset>
          <fieldset>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Communication non verbale</h2>
            <div className="sm:col-span-2 mt-2">
              <label htmlFor="comprehensionUtilisationGestes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Compréhension et utilisation des gestes</label>
              <input type="text" name="comprehensionUtilisationGestes" value={formData.comprehensionUtilisationGestes}  id="comprehensionUtilisationGestes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Compréhension et utilisation des gestes"  />
            </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
                <div className="w-full">
                    <label htmlFor="Contact_visuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact visuel</label>
                    <input type="text" name="Contact_visuel" value={formData.Contact_visuel}  id="Contact_visuel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Contact visuel"  />
                </div>
                <div className="w-full">
                    <label htmlFor="Expressions_faciales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expressions faciales</label>
                    <input type="text" name="Expressions_faciales" value={formData.Expressions_faciales}  id="Expressions_faciales" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Expressions faciales"  />
                </div>
              </div>
    
          </fieldset>
          <fieldset>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Histoire sociale</h2>
            
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 mt-2">
                    <div className="w-full">
                        <label htmlFor="Loisirs_et_activites_preferes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loisirs et activités préférés</label>
                        <input type="text" name="Loisirs_et_activites_preferes" value={formData.Loisirs_et_activites_preferes}  id="Loisirs_et_activites_preferes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Loisirs et activités préférés"  />
                    </div>
                    <div className="w-full">
                        <label htmlFor="Interactions_sociales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interactions sociales (amis, famille)</label>
                        <input type="text" name="Interactions_sociales" value={formData.Interactions_sociales}  id="Interactions_sociales" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Interactions sociales (amis, famille)"  />
                    </div>
              </div>
              <div className="sm:col-span-2 mt-2">
                    <label htmlFor="Evenements_significatifs_recents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Événements significatifs récents</label>
                    <input type="text" name="Evenements_significatifs_recents" value={formData.Evenements_significatifs_recents}  id="Evenements_significatifs_recents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Événements significatifs récents"  />
              </div>
    
          </fieldset>
          <fieldset>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-5">Objectifs thérapeutiques</h2>
            <div className="sm:col-span-2 mt-2">
              <label htmlFor="Objectifs_specifiques_pour_la_prise_en_charge_orthophonique" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objectifs spécifiques pour la prise en charge orthophonique</label>
              <textarea id="Objectifs_specifiques_pour_la_prise_en_charge_orthophonique" name="Objectifs_specifiques_pour_la_prise_en_charge_orthophonique" value={formData.Objectifs_specifiques_pour_la_prise_en_charge_orthophonique}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Objectifs spécifiques pour la prise en charge orthophonique" />
            </div>
            <div className="sm:col-span-2 mt-2">
              <label htmlFor="Attentes_et_preoccupations_des_parents_patients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attentes et préoccupations des parents/patients</label>
              <textarea id="Attentes_et_preoccupations_des_parents_patients" name="Attentes_et_preoccupations_des_parents_patients" value={formData.Attentes_et_preoccupations_des_parents_patients}  rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} placeholder="Attentes et préoccupations des parents/patients" />
            </div>
            
          </fieldset>
          <button type="submit" className="mt-4 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900">Enregistrer</button>
        </form>
      </div>
    
    );
    }
    
    export default Profil;