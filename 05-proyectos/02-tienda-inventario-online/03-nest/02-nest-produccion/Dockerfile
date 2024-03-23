# Selecciona la imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto
COPY . .

# Compilar la aplicación (si es necesario)
RUN npm run build

#expone el puerto 8000
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]

