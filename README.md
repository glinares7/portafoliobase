# portafolio sections

Para iniciar los proyectos luego de descargar (npm/yarn)

    Agragar npm o yarn segun sea el caso.

        npm install
        yarn install

    Los archivos
        .env

            Contiene credenciales que no estan en el proyecto, debe agregarlas para que puedan compilar algunos proyectos (node)


    Para compilar la parte de ts (node)
        Para ejecutar los proyectos con TypeScrip
            tsc --watch
            nodemon server/server


    Si va subir proyectos (node) en produccion debe tener
    las variables de entorno(se debe obtener del archivo .env)
     para agregarlo a railway / heroku .
