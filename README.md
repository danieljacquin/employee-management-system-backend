# 📦 technical-assessments-template-express

Proyecto backend construido con [Express](https://expressjs.com/) y [TypeScript](https://www.typescriptlang.org/). Este proyecto sirve como base para crear APIs robustas, escalables y con tipado estático.

## 🚀 Características

- ⚡️ Express.js para la lógica del servidor
- 🔒 TypeScript para tipado estático
- 📁 Arquitectura modularizada por dominio (routes, controllers, services, middlewares)
- 🔧 Configuración con `dotenv`
- 🐞 Manejo de errores centralizado
- ✅ Linter con ESLint y formateo con Prettier
- 📊 Swagger (OpenAPI) documentación y consumo.

## 📁 Estructura del Proyecto

```
src/
├── config/         # Configuración general (ej. dotenv)
├── database/       # Lógica relacionada con la base de datos(ej. conexión DB, migraciones, seeders, etc)
├── enums/          # Enumeraciones (ej. rutas, constantes globales)
├── errors/         # Clases y utilidades para manejo de errores
├── middlewares/    # Middlewares personalizados (autenticación, logs, etc)
├── modules/        # Lógica separada por dominio (controllers, services, models)
├── routes/         # Rutas principales y agrupadas
├── utils/          # Helpers y utilidades generales
└── server.ts       # Punto de entrada principal
```


## 🛠️ Instalación

```bash
git clone https://github.com/danieljacquin/technical-assessments-template-express.git
cd technical-assessments-template-express
npm install
```



 ## ⚙️ Scripts

| Comando               | Descripción                                     | Ejemplo(opcional)
| ----------------      | ----------------------------------------------- | ---------------
| `npm run dev`         | Inicia el servidor en modo desarrollo           |
| `npm run build`       | Transpila el código TypeScript                  |
| `npm start`           | Ejecuta el código compilado                     |
| `npm run lint`        | Ejecuta ESLint                                  |
| `npm run lint:fix`    | Ejecuta ESLint y corrige errores automáticamente|
| `npm run format`      | Formatea el código con Prettier                 |
| `migration:create`    | Crea una migracion                              | npm run migration:create -- src/database/migrations/create-users-table
| `migration:run`       | Ejecuta las migraciones                         |
| `migration:revert`    | Revierte la ultima migracion ejecutada          |


## 🌱 Variables de Entorno
Crea un archivo .env en la raíz con variables necesarias. Ejemplo básico:

```bash
PORT=3000
```


## 📦 Dependencias Clave
express

typescript

ts-node-dev

dotenv

cors

eslint, prettier


## ✨ Autor
Desarrollado por Daniel Jacquin