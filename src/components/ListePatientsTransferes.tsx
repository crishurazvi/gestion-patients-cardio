
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Patient } from "@/types/Patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ListePatientsTransferesProps {
  patients: Patient[];
  onSupprimer: (id: string) => void;
}

const ListePatientsTransferes: React.FC<ListePatientsTransferesProps> = ({
  patients,
  onSupprimer,
}) => {
  if (patients.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
        Aucun patient transféré
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-medical-800">Patients Transférés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <CardHeader className="bg-medical-100 py-3">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                <span>{patient.nom} ({patient.age} ans)</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSupprimer(patient.id)}
                  className="h-7 w-7 text-destructive hover:text-destructive/90"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-sm">
              <p><strong>Ancien lit:</strong> {patient.litNumero}</p>
              <p><strong>Date d'admission:</strong> {patient.dateAdmission}</p>
              <p className="mt-1 line-clamp-2 text-gray-600">
                <strong>Observations:</strong> {patient.observations}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListePatientsTransferes;
