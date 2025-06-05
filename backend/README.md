# Backend - API NestJS + Prisma

## 🚀 Démarrage

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration des variables d'environnement
Créer un fichier `.env` à la racine du dossier `backend` en vous basant sur `.env.example`.

### 3. Générer le client Prisma
```bash
npx prisma generate
```

### 4. Appliquer les migrations (si existantes)
```bash
npx prisma migrate dev
```

### 5. Lancer le serveur
```bash
npm run start:dev
```

---

## 📄 Variables d’environnement (`.env`)

- `DATABASE_URL` : chaîne de connexion à ta base de données MySQL
- `PORT` : port sur lequel tourne l’API
- `FRONTEND_URL` : URL du frontend autorisée en CORS

---

## 🔧 Scripts utiles

- `start:dev` – Lancer le serveur NestJS en mode développement
- `prisma generate` – Générer le client Prisma à partir du schéma
- `prisma migrate dev` – Appliquer les migrations Prisma (dev)

---

## 📁 Structure

- `src/` – Code source NestJS
- `prisma/` – Schéma Prisma et migrations
