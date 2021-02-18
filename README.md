# GraphQL

1. Aprende a crear una API con GraphQL, Node y TypeScript.
2. Almacena tus datos en una base de datos de MongoDB y despliégala en Vercel hacia producción.
3. Crea un frontend con React y Apollo Client para consumirla.

**Playlist:** [Curso básico de GraphQL](https://www.youtube.com/playlist?list=PL4n0o4LiEbG-UAnyVmjhZe0WhpjyYig3q)

## Dependencias de producción #1

| Dependencia           | Descripción                                     |
| --------------------- | ----------------------------------------------- |
| express               | Servidor                                        |
| cors                  | Habilita la comunicación entre servidores       |
| apollo-server-express | Integración de GraphQL con Express              |
| graphql               | GraphQL                                         |
| graphql-import-node   | Para que NodeJS pueda importar archivos graphql |
| graphql-tools         | Herramientas para GraphQL                       |
| ncp                   | Copiado de archivos y directorios               |

**Instalación:** `npm i express cors apollo-server-express graphql graphql-import-node graphql-tools ncp`

## Dependencias de desarrollo #1

| Dependencia            | Descripción                                     |
| ---------------------- | ----------------------------------------------- |
| @types/cors            | (TS) Habilita la comunicación entre servidores  |
| @types/express         | (TS) Servidor                                   |
| @types/express-graphql | (TS) Integración de GraphQL con Express         |
| @types/node            | (TS) Runtime JavaScript para servidores         |
| nodemon                | Reiniciador de servidor ante cambios detectados |
| ts-node                | Interpretador TypeScript para Nodemon           |
| typescript             | TypeScript                                      |

**Instalación:** `npm i -D @types/cors @types/express @types/express-graphql @types/node nodemon ts-node typescript`

## Scripts

- `"dev": "nodemon src/index.ts --exec ts-node src/index.ts -e ts,graphql"`

---

## Dependencias de producción #2:

| Dependencia | Descripción                                  |
| ----------- | -------------------------------------------- |
| mongodb     | Driver nativo de MongoDB                     |
| dotenv      | Manejador de archivo de variables de entorno |

**Instalación:** `npm i mongodb dotenv`

## Dependencias de desarrollo #2

| Dependencia    | Descripción             |
| -------------- | ----------------------- |
| @types/mongodb | (TS) Tipos para MongoDB |
| @types/nodenv  | (TS) Tipos para nodenv  |

**Instalación:** `npm i -D @types/mongodb @types/dotenv`
