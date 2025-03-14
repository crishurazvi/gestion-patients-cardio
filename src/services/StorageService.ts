
import { Patient } from "../types/Patient";

// Clés de stockage
const PATIENTS_KEY = "cardio_patients";
const TRANSFERES_KEY = "cardio_patients_transferes";

// Fonction pour sauvegarder les patients dans le stockage local
export const sauvegarderPatients = (patients: Patient[]): void => {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  
  // Générer un fichier texte pour le téléchargement
  const contenu = patients.map(patient => `
Lit ${patient.litNumero}
Nom: ${patient.nom}
Âge: ${patient.age}
Date d'admission: ${patient.dateAdmission}
Observations: ${patient.observations}
-------------------
  `).join('\n');
  
  const blob = new Blob([contenu], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  // Créer un lien de téléchargement invisible
  const a = document.createElement('a');
  a.href = url;
  a.download = 'patients_cardiologie.txt';
  a.style.display = 'none';
  
  // Simuler un clic pour télécharger le fichier
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
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
