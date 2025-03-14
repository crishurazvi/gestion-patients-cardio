
import React from "react";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/Patient";
import { Bed, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LitProps {
  numero: number;
  patient: Patient | null;
  onSelect: (numero: number) => void;
  estSelectionne: boolean;
}

const Lit: React.FC<LitProps> = ({ numero, patient, onSelect, estSelectionne }) => {
  // Si le lit est vide, afficher un simple bouton
  if (!patient) {
    return (
      <Button
        className={`h-24 w-full flex flex-col items-center justify-center gap-1 transition-all
        bg-gray-200 hover:bg-gray-300
        ${estSelectionne ? "ring-2 ring-offset-2 ring-medical-400" : ""}`}
        onClick={() => onSelect(numero)}
      >
        <Bed className="h-6 w-6" />
        <span className="font-semibold">Lit {numero}</span>
        <span className="text-xs">Disponible</span>
      </Button>
    );
  }

  // Si le lit est occupé, afficher une carte similaire aux patients transférés
  return (
    <Card 
      className={`w-full h-full overflow-hidden cursor-pointer hover:shadow-md transition-all
      ${estSelectionne ? "ring-2 ring-offset-2 ring-medical-400" : ""}`}
      onClick={() => onSelect(numero)}
    >
      <CardHeader className="bg-medical-100 py-2 px-3">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            Lit {numero}
          </span>
          <span className="bg-medical-600 text-white text-xs px-2 py-0.5 rounded-full">
            Occupé
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 bg-medical-50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <User className="h-3 w-3" />
            {patient.nom} 
            <span className="text-xs font-normal">({patient.age} ans)</span>
          </div>
          <div className="text-xs text-gray-600">
            Admission: {patient.dateAdmission}
          </div>
          <div className="text-xs text-gray-600 line-clamp-1 mt-1">
            {patient.observations ? patient.observations.substring(0, 40) + (patient.observations.length > 40 ? "..." : "") : "Aucune observation"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Lit;
