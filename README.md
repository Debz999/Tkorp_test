 Test Tkorp

Ce projet a été réalisé dans le cadre d'un test technique pour l’entreprise Tkorp, en vue d’un stage de 6 mois.

## 🛠️ Stack technique

### Backend

- **NestJS**  
  
- **Prisma**  

- **BDD MySQL**  

### Frontend

- **Next.js**  


## ✨ Fonctionnalités principales

- Création et consultation de données via une API REST (Nest + Prisma)
- Interface responsive en React avec Next.js
- Connexion sécurisée entre le front et le back

## 🚀 Lancer le projet en local

### Prérequis



### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/ton-utilisateur/test-tkorp.git
cd test-tkorp

# 2. Installer les dépendances pour le backend
cd backend
npm install

# 3. Configurer l'environnement
cp .env.example .env
# puis renseigner les infos de connexion à la base

# 4. Lancer Prisma
npx prisma generate
npx prisma migrate dev --name init

# 5. Lancer le serveur NestJS
npm run start:dev

# 6. Installer les dépendances du frontend
cd ../frontend
npm install

# 7. Lancer le front Next.js
npm run dev

## 🙋‍♀️ Auteur

- Déborah Setboune
  Développeuse fullstack 