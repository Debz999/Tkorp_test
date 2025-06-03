'use client';
import React from 'react';


interface CardProps {
  
  children: React.ReactNode;
  loading?: boolean;
  errorMessage?: string;
  className?: string;
  onClick?: () => void;
}

export default function CardA({ children, className = '', onClick }: CardProps) {
    
  return (
    <div
      onClick={onClick}
      className={
        `bg-white rounded-xl shadow-md p-4 mb-4 text-black text-center  hover:bg-gray-100 transition ` +
        className
      }
    >
      {children}
    </div>
  );
}
