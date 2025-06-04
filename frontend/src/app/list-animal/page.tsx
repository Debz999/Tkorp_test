"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function ListAnimalPage() {
  const [animal, setAnimal] = useState<AnimalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/animal")
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(animal.length / pageSize);
  const paginatedAnimals = animal.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-black text-center">
        <h2 className="text-2xl font-semibold">Liste des animaux</h2>

        {loading ? (
          <p className="text-gray-600">Chargement...</p>
        ) : paginatedAnimals.length > 0 ? (
          paginatedAnimals.map((animal) => (
            <div
              key={animal.id}
              className="border p-4 rounded-md text-left text-lg bg-gray-100 mb-4"
            >
              <p>
                <strong>Nom :</strong>{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => router.push(`/detail-animal/${animal.id}`)}
                >
                  {animal.name}
                </span>
              </p>
              <p>
                <strong>Espèce :</strong> {animal.species}
              </p>
              <p>
                <strong>Id propriétaire :</strong> {animal.ownerId}
              </p>
            </div>
          ))
        ) : (
          <p className="text-red-500">Aucun animal trouvé.</p>
        )}

        {/* Pagination avec numéros de page */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-black text-white font-bold"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Retour à l’accueil
        </button>
      </div>
    </main>
  );
}
