"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type PersonData = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
};

export default function PersonDetailPage() {
  const [person, setPerson] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/person/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
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
        <h2 className="text-2xl font-semibold">Détails propriétaire</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : person ? (
          <div className="text-left text-lg space-y-2">
            <p>
              <strong>Nom :</strong> {person.lastName}
            </p>
            <p>
              <strong>Prénom :</strong> {person.firstName}
            </p>
            <p>
              <strong>ID :</strong> {person.id}
            </p>
            <p>
              <strong>Telephone:</strong> {person.phoneNumber}
            </p>
            <p>
              <strong>Email :</strong> {person.email}g
            </p>
          </div>
        ) : (
          <p className="text-red-500">Personne introuvable.</p>
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
