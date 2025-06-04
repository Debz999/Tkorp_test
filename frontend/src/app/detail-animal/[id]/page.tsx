"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type AnimalData = {
  id: number;
  name: string;
  weight: number;
  species: string;
  breed: string;
  color: string;
  dateOfBirth: string;
  ownerId: number;
};

export default function AnimalDetailPage() {
  const [animal, setAnimal] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/animal/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-black text-center">
        <h2 className="text-2xl font-semibold">Détails de l’animal</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : animal ? (
          <div className="text-left text-lg space-y-2">
            <p><strong>Nom :</strong> {animal.name}</p>
            <p><strong>Espèce :</strong> {animal.species}</p>
            <p><strong>Race :</strong> {animal.breed}</p>
            <p><strong>Couleur :</strong> {animal.color}</p>
            <p><strong>Poids :</strong> {animal.weight}g</p>
            <p><strong>Date de naissance :</strong> {animal.dateOfBirth}</p>
            <p><strong>Propriétaire ID :</strong> {animal.ownerId}</p>
          </div>
        ) : (
          <p className="text-red-500">Animal introuvable.</p>
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
