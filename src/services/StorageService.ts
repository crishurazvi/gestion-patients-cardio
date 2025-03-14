
import { Patient } from "../types/Patient";

// Clés de stockage
const PATIENTS_KEY = "cardio_patients";
const TRANSFERES_KEY = "cardio_patients_transferes";

// Fonction pour sauvegarder les patients dans le stockage local
export const sauvegarderPatients = (patients: Patient[]): void => {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
};

// Fonction pour récupérer les patients du stockage local
export const recupererPatients = (): Patient[] => {
  const patientsStr = localStorage.getItem(PATIENTS_KEY);
  return patientsStr ? JSON.parse(patientsStr) : [];
};

// Fonction pour sauvegarder les patients transférés
export const sauvegarderPatientsTransferes = (patients: Patient[]): void => {
  localStorage.setItem(TRANSFERES_KEY, JSON.stringify(patients));
};

// Fonction pour récupérer les patients transférés
export const recupererPatientsTransferes = (): Patient[] => {
  const patientsStr = localStorage.getItem(TRANSFERES_KEY);
  return patientsStr ? JSON.parse(patientsStr) : [];
};

// Fonction pour générer un document Word pour un patient
export const genererDocumentWord = (patient: Patient): void => {
  // Créer le contenu du document (HTML simplifié)
  const contenu = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Patient ${patient.nom}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 9pt;
          line-height: 1;
          margin: 0;
          padding: 0;
        }
        p {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <p>Fiche Patient - Service de Cardiologie CH Tarbes</p>
      <p>Numéro de lit: ${patient.litNumero}</p>
      <p>Nom: ${patient.nom}</p>
      <p>Âge: ${patient.age} ans</p>
      <p>Date d'admission: ${patient.dateAdmission}</p>
      <p>&nbsp;</p>
      <p>Observations:</p>
      <p>${patient.observations.replace(/\n/g, '<br>')}</p>
      <p>&nbsp;</p>
      <p>Document généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}</p>
    </body>
    </html>
  `;

  // Créer un blob avec le contenu HTML
  const blob = new Blob([contenu], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Créer un lien de téléchargement
  const a = document.createElement('a');
  a.href = url;
  a.download = `Patient_${patient.nom.replace(/\s+/g, '_')}.doc`;
  a.style.display = 'none';
  
  // Simuler un clic pour télécharger le fichier
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Fonction pour générer un document Word pour tous les patients
export const genererDocumentWordTousPatients = (patients: Patient[]): void => {
  if (patients.length === 0) {
    return;
  }

  // Créer le contenu du document (HTML simplifié)
  let contenu = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Tous les Patients</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 9pt;
          line-height: 1;
          margin: 0;
          padding: 0;
        }
        p {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <p>Liste des Patients - Service de Cardiologie CH Tarbes</p>
      <p>&nbsp;</p>
  `;

  // Ajouter chaque patient au document
  patients.forEach((patient, index) => {
    contenu += `
      <p>Patient: ${patient.nom} - Lit ${patient.litNumero}</p>
      <p>Nom: ${patient.nom}</p>
      <p>Âge: ${patient.age} ans</p>
      <p>Date d'admission: ${patient.dateAdmission}</p>
      <p>Observations:</p>
      <p>${patient.observations.replace(/\n/g, '<br>')}</p>
      <p>&nbsp;</p>
    `;
    
    // Ajouter un saut de page entre chaque patient (sauf le dernier)
    if (index < patients.length - 1) {
      contenu += `<br clear=all style='page-break-before:always'>`;
    }
  });

  // Ajouter le pied de page et fermer le document
  contenu += `
      <p>Document généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}</p>
    </body>
    </html>
  `;

  // Créer un blob avec le contenu HTML
  const blob = new Blob([contenu], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Créer un lien de téléchargement
  const a = document.createElement('a');
  a.href = url;
  a.download = `Tous_Les_Patients_${new Date().toISOString().split('T')[0]}.doc`;
  a.style.display = 'none';
  
  // Simuler un clic pour télécharger le fichier
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
