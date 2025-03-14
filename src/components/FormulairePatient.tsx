
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Patient } from "@/types/Patient";
import { Save, Trash, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormulairePatientProps {
  litNumero: number;
  patient: Patient | null;
  onSauvegarder: (patient: Patient) => void;
  onEffacer: (litNumero: number) => void;
  onTransferer: (patient: Patient) => void;
}

const FormulairePatient: React.FC<FormulairePatientProps> = ({
  litNumero,
  patient,
  onSauvegarder,
  onEffacer,
  onTransferer,
}) => {
  const { toast } = useToast();
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [dateAdmission, setDateAdmission] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (patient) {
      setNom(patient.nom);
      setAge(patient.age.toString());
      setDateAdmission(patient.dateAdmission);
      setObservations(patient.observations);
    } else {
      // Réinitialiser le formulaire
      setNom("");
      setAge("");
      setDateAdmission("");
      setObservations("");
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du patient est requis",
        variant: "destructive",
      });
      return;
    }

    const nouveauPatient: Patient = {
      id: patient?.id || Date.now().toString(),
      nom,
      age: parseInt(age) || 0,
      dateAdmission,
      observations,
      litNumero,
      transfere: false,
    };

    onSauvegarder(nouveauPatient);
    toast({
      title: "Succès",
      description: "Les informations du patient ont été sauvegardées",
    });
  };

  const handleEffacer = () => {
    onEffacer(litNumero);
    toast({
      title: "Succès",
      description: "Les informations du patient ont été effacées",
    });
  };

  const handleTransferer = () => {
    if (patient) {
      onTransferer({ ...patient, transfere: true });
      toast({
        title: "Succès",
        description: "Le patient a été transféré",
      });
    }
  };

  if (!litNumero) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p>Sélectionnez un lit pour afficher ou ajouter un patient</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center text-medical-800">
        Patient - Lit {litNumero}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="nom">Nom du patient</Label>
        <Input
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Entrez le nom du patient"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Âge</Label>
        <Input
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Entrez l'âge du patient"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateAdmission">Date d'admission</Label>
        <Input
          id="dateAdmission"
          value={dateAdmission}
          onChange={(e) => setDateAdmission(e.target.value)}
          type="date"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Fiche d'observation</Label>
        <Textarea
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Entrez les observations, examens et évolution du patient"
          rows={6}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-between mt-6">
        <Button type="submit" className="bg-medical-600 hover:bg-medical-700">
          <Save className="mr-2 h-4 w-4" /> Sauvegarder
        </Button>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleEffacer}
            disabled={!patient}
          >
            <Trash className="mr-2 h-4 w-4" /> Effacer
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleTransferer}
            disabled={!patient}
            className="border-medical-600 text-medical-600 hover:bg-medical-50"
          >
            <ArrowRight className="mr-2 h-4 w-4" /> Transférer
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormulairePatient;
