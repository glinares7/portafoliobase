# Proyecto 1 Convertidor multimedia youtube

Descarga archivos de video mp4
Descarga archivos de audio mp3,m4a

Muestra una pantalla de previsualización del contenido.

Para iniciar los proyectos luego de descargar (npm/yarn)

    Agragar npm o yarn segun sea el caso.

        npm install
        yarn install

    Las variables de entorno para node se encontraran en :
            .env
                Contiene credenciales que no estan en el proyecto, debe agregarlas para que puedan compilar

                        Para extraer los datos de youtube se necesita la api que debemos extraer de:
                                https://developers.google.com/youtube/v3/getting-started?hl=es-419

                                        Seguir los pasos y en consola de api ir a
                                                credenciales y generar una  api

                                        En la paleta del buscador buscar   y habilitar:
                                                YouTYouTube Data API v3ube Data API v3


    Las variables para la concexion con el servidor desde  react las va encontar en:
            ./src/app.jsx


    Para compilar la parte de react
        npm run dev

    Para compilar la parte de node (backend)
            nodemon app.js


    Para la implementación del proyecto usaremos netlify para el lado del frondtend y railway para el lado del backend.

        En caso de querer tener ambos desarrollo(frontend y backend ) tenemos que el frontend subirlo a produccion:
                npm run build

                        luego agregar el contenido a la carpeta public

                        Subir nuestro proyecto con ambos enfoques a railway

    Si va subir proyectos (node) en produccion debe tener
    las variables de entorno(se debe obtener del archivo .env)
     para agregarlo a railway / heroku.

Proyecto inspirado de Online video converter(frontend)

        https://es.onlinevideoconverter.pro/127EQ/

Proyecto diseñado e implementado por Gianmarco Linares L.

        https://test-yt-v2.onrender.com/
