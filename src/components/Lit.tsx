
import React from "react";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/Patient";
import { Bed } from "lucide-react";

interface LitProps {
  numero: number;
  patient: Patient | null;
  onSelect: (numero: number) => void;
  estSelectionne: boolean;
}

const Lit: React.FC<LitProps> = ({ numero, patient, onSelect, estSelectionne }) => {
  return (
    <Button
      className={`h-24 w-full flex flex-col items-center justify-center gap-1 transition-all ${
        patient ? "bg-medical-600 hover:bg-medical-700" : "bg-gray-200 hover:bg-gray-300"
      } ${estSelectionne ? "ring-2 ring-offset-2 ring-medical-400" : ""}`}
      onClick={() => onSelect(numero)}
    >
      <Bed className="h-6 w-6" />
      <span className="font-semibold">Lit {numero}</span>
      {patient && <span className="text-xs truncate max-w-[90%]">{patient.nom}</span>}
    </Button>
  );
};

export default Lit;
