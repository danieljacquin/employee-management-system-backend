# 📦 Employee management system

An educational Employee Management System (EMS) built for learning purposes.
The goal of this project is to practice backend development with Node.js and frontend development with TypeScript, while simulating a real-world HR management system

## 🚀 Features

- ⚡️ **Express.js** for server logic
- 🔒 **TypeScript** for static typing
- 📁 **Domain-based modular architecture** (routes, controllers, services, middlewares)
- 🔧 Configuration with **dotenv**
- 🐞 Centralized error handling
- ✅ Linter with **ESLint** and formatting with **Prettier**
- 📊 **Swagger (OpenAPI)** documentation and consumption


## 📁 Project Structure

```
src/
├── config/         # General configuration (e.g., dotenv)
├── database/       # Database logic (connection, migrations, seeders, etc.)
├── enums/          # Enumerations (e.g., routes, global constants)
├── errors/         # Error handling classes and utilities
├── middlewares/    # Custom middlewares (authentication, logs, etc.)
├── modules/        # Domain-specific logic (controllers, services, models)
├── routes/         # Main and grouped routes
├── utils/          # General helpers and utilities
└── server.ts       # Main entry point

```


## 🛠️ Installation & Setup

Follow these steps to set up the project locally:


1️⃣ Clone the repository
```bash
git clone https://github.com/danieljacquin/employee-management-system-backend.git
cd employee-management-system-backend
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Configure environment variables
Copy the provided example file and adjust values if necessary:
```bash
cp .env.example .env
```

4️⃣ Run database migrations
```bash
npm run migration:run
```


5️⃣ Start the development server
```bash
npm run dev
```


 ## ⚙️ Scripts

| Command               | Description                                     | Example(optional)
| ----------------      | ----------------------------------------------- | ---------------
| `npm run dev`         | Starts the server in development mode           |
| `npm run build`       | Transpiles TypeScript code                      |
| `npm start`           | Runs the compiled code                          |
| `npm run lint`        | Runs ESLint                                     |
| `npm run lint:fix`    | Runs ESLint and fixes errors automatically      |
| `npm run format`      | Formats code with Prettier                      |
| `migration:create`    | Creates a migration                             | npm run migration:create -- src/database/migrations/create-users-table
| `migration:run`       | Runs migrations                                 |
| `migration:revert`    | Reverts the last executed migration             |



## 📦 Key Dependencies
express

typescript

ts-node-dev

dotenv

cors

eslint, prettier


## ✨ Author
Developed by Daniel Jacquin