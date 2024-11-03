# Choisir une image de base pour Node.js
FROM node:18

# Créer un répertoire de travail

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Copier le reste de l'application
COPY . .

EXPOSE 5173

RUN npm install

WORKDIR /app

CMD ["npm", "run", "dev", "--", "--host"]