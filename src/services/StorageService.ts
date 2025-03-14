
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
  // Créer le contenu du document (HTML formaté)
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
        }
        h1 {
          font-size: 12pt;
          color: #3b75b5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h1>Fiche Patient - Service de Cardiologie CH Tarbes</h1>
      <table>
        <tr>
          <th>Numéro de lit</th>
          <td>${patient.litNumero}</td>
        </tr>
        <tr>
          <th>Nom</th>
          <td>${patient.nom}</td>
        </tr>
        <tr>
          <th>Âge</th>
          <td>${patient.age} ans</td>
        </tr>
        <tr>
          <th>Date d'admission</th>
          <td>${patient.dateAdmission}</td>
        </tr>
      </table>
      
      <h2>Observations</h2>
      <p>${patient.observations.replace(/\n/g, '<br>')}</p>
      
      <p style="font-style: italic; margin-top: 30px;">
        Document généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}
      </p>
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
