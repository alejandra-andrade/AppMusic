
Reproductor de Música - Fullstack App (React + Express + MongoDB)

Este proyecto es una aplicación web para reproducir música, que incluye autenticación de usuarios, creación de playlists, reproducción en tiempo real, y exploración por géneros.

Tecnologías utilizadas:
- Frontend: React, React Router, Redux
- Backend: Express.js, Node.js
- Base de datos: MongoDB (local)
- Autenticación: JWT

Requisitos:
- Node.js y npm instalados
- MongoDB instalado localmente

Pasos para iniciar el proyecto:

1. Clonar el repositorio:
   git clone https://github.com/alejandra-andrade/AppMusic
   cd AppMusic

2. Instalar dependencias del backend:
   cd backend
   npm install

3. Instalar dependencias del frontend:
   cd ../frontend
   npm install

4. Iniciar MongoDB local:
   Asegúrate de que el servicio de MongoDB esté corriendo en consola con el comando:
   mongod

5. Configurar variables de entorno en el backend:
   Crear un archivo .env en la carpeta 'backend' con el contenido:
	PORT=5000
	MONGO_URI=mongodb://localhost:27017/musicdb
	JWT_SECRET=secret_key_fuerte
	GOOGLE_CLIENT_ID=tu_id
	GOOGLE_CLIENT_SECRET=tu_secret
	FACEBOOK_APP_ID=tu_app_id
	FACEBOOK_APP_SECRET=tu_secret
	CLIENT_URL=http://localhost:3000

6. Iniciar el backend:
   cd backend
   npm start

   (Disponible en: http://localhost:5000)

7. Iniciar el frontend:
   cd ../frontend
   npm start

   (Disponible en: http://localhost:3000)

Notas:
- Verifica que MongoDB esté ejecutándose antes de levantar el backend.
- Si cambias los puertos, asegúrate de actualizar las URLs en el archivo api.js del frontend.
