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

#expone el puerto 8000
EXPOSE 3000



# Especifica el comando que se ejecutará cuando se inicie el contenedor
CMD [ "npm","run", "start" ]