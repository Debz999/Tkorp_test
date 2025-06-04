"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SpeciesData = {
  species: string;
  count : number;
};

export default function MostSpeciesPage() {
  const [species, setSpecies] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/animal/species")
      .then((res) => res.json())
      .then((data) => {
        setSpecies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
        
      });
      
  }, []);

  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-black text-center">
        <h2 className="text-2xl font-semibold">Résultat espèce la plus representée</h2>

        {loading ? (
          <p className="text-gray-600">Chargement...</p>
        ) : species ? (
          <div className="space-y-2 text-left text-lg">
            <p>
              <strong>Espece:</strong> {species.species}
            </p>
            <p>
              <strong>Nombre de representants :</strong> {species.count}
            </p>
           
          </div>
        ) : (
          <p className="text-red-500">Aucun propriétaire trouvé.</p>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Retour à l’accueil
        </button>
      </div>
    </main>
  );
}
