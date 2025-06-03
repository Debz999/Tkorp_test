"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OwnerData = {
  ownerId: string;
  ownerName: string;
  ownerFirstName: string;
  numberOfCat: number;
};

export default function MostCatPage() {
  const [owner, setOwner] = useState<OwnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/animal/most-Cat")
      .then((res) => res.json())
      .then((data) => {
        setOwner(data);
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
        <h2 className="text-2xl font-semibold">Résultat</h2>

        {loading ? (
          <p className="text-gray-600">Chargement...</p>
        ) : owner ? (
          <div className="space-y-2 text-left text-lg">
            <p>
              <strong>Nom :</strong> {owner.ownerName}
            </p>
            <p>
              <strong>Prénom :</strong> {owner.ownerFirstName}
            </p>
            <p>
              <strong>ID :</strong> {owner.ownerId}
            </p>
            <p>
              <strong>Nombre de chats :</strong> {owner.numberOfCat}
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
