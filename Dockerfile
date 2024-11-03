# Choisir une image de base pour Node.js
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
# Copier le reste de l'application
COPY . .


#FROM php:8.1-cli

# Exposer le port sur lequel l'application écoute
EXPOSE 5173

#RUN apt-get update && apt-get install -y git unzip supervisor
#
#COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Lancer Supervisor comme processus principal
#CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

CMD ["npm", "run", "dev", "--", "--host"]