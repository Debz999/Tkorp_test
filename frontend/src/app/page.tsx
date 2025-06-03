'use client';

import { useRouter } from 'next/navigation';
import CardA from '../components/CardA';

export default function Home() {
  const router = useRouter();

  const questions = [
    {
      question: 'Quel animal est le plus vieux?',
      path: '/oldest-animal',
    },
    {
      question: 'Quelle espèce est la mieux representée?',
      path: '/most-represented-species',
    },
    {
      question: 'Qui possède le plus de chats ?',
      path: '/most-cat',
    },
    {
      question: 'Qui possède le plus d’animaux ?',
      path: '/most-animals',
    },
    {
      question: 'Qui possède l’animal le plus lourd ? Comment s’appelle cet animal et quel est son poids ?' ,
      path: '/heaviest-animal',
    },
    {
      question: 'Qui possède le groupe d’animaux le plus lourd ? Quel est le poids total de ce groupe d’animaux ?' ,
      path: '/heaviest-animal-group',
    },
    {
      question: 'Liste des personnes' ,
      path: '/list-person',
    },
    {
      question: 'Liste des animaux' ,
      path: '/list-animal',
    },
    
  ];

  return (
    <main className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        Questions sur les animaux
      </h1>

      <div className="grid gap-0 w-full max-w-xl">
        {questions.map((q, index) => (
          <CardA
            key={index}
            className="p-4"
          >
            <p className="text-lg text-center mb-2">{q.question}</p>
            <button
              onClick={() => router.push(q.path)}
              className="block mx-auto bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition cursor-pointer"
            >
              Voir la réponse
            </button>
          </CardA>
        ))}
      </div>
    </main>
  );
}


