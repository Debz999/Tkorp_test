'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  errorMessage?: string;
  className?: string;
  onClick?: () => void;
}

export default function Card({ title,
  children,
  loading = false,
  errorMessage = 'Aucun résultat trouvé.', }: CardProps) {
    const router = useRouter();
  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-black text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {loading ? (
          <p className="text-gray-600">Chargement...</p>
        ) : children ? (
          <div className="space-y-2 text-left text-lg">{children}</div>
        ) : (
          <p className="text-red-500">{errorMessage}</p>
        )}

        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition cursor-pointer"
        >
          Retour à l’accueil
        </button>
      </div>
    </main>
  );
}
