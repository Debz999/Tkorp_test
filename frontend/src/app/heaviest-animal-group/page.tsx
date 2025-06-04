"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HeaviestGroupData = {
  owner: {
    id?: number;
    lastName: string;
    firstName: string;
  };
  totalWeight: number;
  animals: {
    name: string;
    weight: number;
    species: string;
    breed: string;
    color: string;
  }[];
  animalCount: number;
};

export default function HeaviestAnimalGroupPage() {
  const [heaviest, setHeaviest] = useState<HeaviestGroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/animal/heaviest-group")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.owner && data.animals) {
          setHeaviest(data);
        } else {
          setHeaviest(null);
        }
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
        <h2 className="text-2xl font-semibold">
          Résultat groupe animaux le plus lourd
        </h2>

        {loading ? (
          <p className="text-gray-600">Chargement...</p>
        ) : heaviest ? (
          <div className="space-y-2 text-left text-lg">
            <p>
              <strong>Nom :</strong> {heaviest.owner.lastName}
            </p>
            <p>
              <strong>Prénom :</strong> {heaviest.owner.firstName}
            </p>
            <p>
              <strong>ID :</strong> {heaviest.owner.id}
            </p>
            <p>
              <strong>Nombre animaux :</strong> {heaviest.animalCount}
            </p>
            <p>
              <strong>Poids total groupe :</strong> {heaviest.totalWeight}g
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
