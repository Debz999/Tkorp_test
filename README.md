# Tkorp - Projet Fullstack

Ce projet est une application web composée de deux parties :
- 🔙 Un **backend** NestJS avec Prisma pour gérer les données et la logique métier
- 🔜 Un **frontend** Next.js avec TypeScript pour l’interface utilisateur

## 📁 Structure du projet

```
Tkorp_test/
│
├── backend/       → API NestJS + Prisma
│   ├── .env.example
│   └── README.md
│
├── frontend/      → Interface utilisateur Next.js + TS
│   └── README.md
│
└── README.md      → Ce fichier
```

## 🚀 Lancer le projet localement

### 1. Cloner le dépôt
```bash
git clone https://github.com/Debz999/Tkorp_test.git
cd Tkorp_test
```

### 2. Installer les dépendances
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configurer les environnements
- Copier le fichier `.env.example` dans `backend/` et le renommer en `.env`
- Adapter les valeurs si nécessaire

### 4. Lancer le backend
```bash
cd backend
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 5. Lancer le frontend
```bash
cd ../frontend
npm run dev
```

---

## 📌 Infos techniques

- Backend : NestJS, Prisma, MySQL
- Frontend : Next.js, TypeScript
- Base de données : hébergée localement ou à distance
