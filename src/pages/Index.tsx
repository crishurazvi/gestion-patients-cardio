
import React, { useEffect, useState } from "react";
import Lit from "@/components/Lit";
import FormulairePatient from "@/components/FormulairePatient";
import ListePatientsTransferes from "@/components/ListePatientsTransferes";
import { Patient } from "@/types/Patient";
import {
  recupererPatients,
  sauvegarderPatients,
  recupererPatientsTransferes,
  sauvegarderPatientsTransferes,
  genererDocumentWordTousPatients,
} from "@/services/StorageService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsTransferes, setPatientsTransferes] = useState<Patient[]>([]);
  const [litSelectionne, setLitSelectionne] = useState<number | null>(null);
  const numeros = [301, 302, 303, 304, 305, 306, 307, 308, 309, 310];

  // Charger les données au démarrage
  useEffect(() => {
    const patientsStockes = recupererPatients();
    const patientsTransferesStockes = recupererPatientsTransferes();
    
    setPatients(patientsStockes);
    setPatientsTransferes(patientsTransferesStockes);
  }, []);

  // Trouver le patient pour le lit sélectionné
  const patientSelectionne = litSelectionne
    ? patients.find((p) => p.litNumero === litSelectionne) || null
    : null;

  const handleSelectLit = (numero: number) => {
    setLitSelectionne(numero);
  };

  const handleSauvegarderPatient = (patient: Patient) => {
    const nouveauxPatients = patients.filter((p) => p.litNumero !== patient.litNumero);
    const patientsAJour = [...nouveauxPatients, patient];
    
    setPatients(patientsAJour);
    sauvegarderPatients(patientsAJour);
  };

  const handleEffacerPatient = (litNumero: number) => {
    const nouveauxPatients = patients.filter((p) => p.litNumero !== litNumero);
    setPatients(nouveauxPatients);
    sauvegarderPatients(nouveauxPatients);
  };

  const handleTransfererPatient = (patient: Patient) => {
    // Supprimer le patient des lits
    handleEffacerPatient(patient.litNumero);
    
    // Ajouter aux patients transférés
    const nouveauxTransferes = [...patientsTransferes, patient];
    setPatientsTransferes(nouveauxTransferes);
    sauvegarderPatientsTransferes(nouveauxTransferes);
  };

  const handleSupprimerTransfere = (id: string) => {
    const nouveauxTransferes = patientsTransferes.filter((p) => p.id !== id);
    setPatientsTransferes(nouveauxTransferes);
    sauvegarderPatientsTransferes(nouveauxTransferes);
    
    toast({
      title: "Succès",
      description: "Le patient a été supprimé de la liste des transferts",
    });
  };

  const handleImprimerTousPatients = () => {
    if (patients.length === 0) {
      toast({
        title: "Information",
        description: "Il n'y a pas de patients à imprimer",
      });
      return;
    }
    
    genererDocumentWordTousPatients(patients);
    toast({
      title: "Succès",
      description: "Le document avec tous les patients a été généré et téléchargé",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-medical-800">
          Gestion des Lits - Service de Cardiologie
        </h1>
        <p className="text-gray-600 mt-2">CH Tarbes</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-end">
          <Button 
            onClick={handleImprimerTousPatients}
            className="bg-medical-600 hover:bg-medical-700"
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimer tous les patients
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section des lits */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-medical-800">Lits</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {numeros.map((numero) => (
                <Lit
                  key={numero}
                  numero={numero}
                  patient={patients.find((p) => p.litNumero === numero) || null}
                  onSelect={handleSelectLit}
                  estSelectionne={litSelectionne === numero}
                />
              ))}
            </div>
          </div>

          {/* Section du formulaire patient */}
          <div className="lg:col-span-2">
            <FormulairePatient
              litNumero={litSelectionne || 0}
              patient={patientSelectionne}
              onSauvegarder={handleSauvegarderPatient}
              onEffacer={handleEffacerPatient}
              onTransferer={handleTransfererPatient}
            />

            {/* Liste des patients transférés */}
            <ListePatientsTransferes
              patients={patientsTransferes}
              onSupprimer={handleSupprimerTransfere}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
