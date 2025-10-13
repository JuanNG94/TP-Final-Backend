# 🎬 Pelis API

¡Bienvenido a la API de Pelis! Este backend gestiona una colección de películas, permitiendo a los usuarios buscar, ver detalles y gestionar sus listas de favoritos.

## 🚀 Características

- Búsqueda y paginación de películas.
- Gestión de usuarios (registro y login con JWT).
- Sistema de favoritos para cada usuario.

## 🚀 Empezando

Sigue estas instrucciones para tener una copia del proyecto corriendo en tu máquina local para desarrollo y pruebas.

### 📋 Pre-requisitos

Necesitarás tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/).

### 🔧 Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/JuanNG94/TP-Final-Backend.git
   ```
2. Navega al directorio del backend:
   ```sh
   cd backend
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Inicia el servidor en modo de desarrollo:
   ```sh
   npm run dev
   ```
El servidor estará corriendo en `http://localhost:3000` (o el puerto que hayas configurado).

## 📝 Configuración

Crea un archivo `.env` en la raíz del directorio `backend/` y añade las siguientes variables de entorno:

```env
PORT=3000
SECRET='my-secret';
NODE_ENV='env'
MONGO_DB_CONNECTION_STRING='' # La URL de la base de datos de MongoDB
VITE_API_KEY='' # La key de acceso a la API de Peliculas
```

## 🛠️ Herramientas y Frameworks

- **[Node.js](https://nodejs.org/)**: Entorno de ejecución para JavaScript.
- **[Express](https://expressjs.com/)**: Framework para construir la API REST.
- **[Mongoose](https://mongoosejs.com/)**: ODM para modelar y trabajar con MongoDB.
- **[JWT (JSON Web Token)](https://jwt.io/)**: Para la autenticación de usuarios.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Para el hasheo de contraseñas.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: Para gestionar variables de entorno.
- **[Cors](https://www.npmjs.com/package/cors)**: Para habilitar CORS.
- **[Winston](https://www.npmjs.com/package/winston)**: Para el logging de la aplicación.

## 🗂️ Estructura de Carpetas

El proyecto sigue una estructura organizada para separar las responsabilidades:

```
backend/
├── src/
│   ├── controllers/      # Lógica de negocio y manejo de peticiones
│   ├── core/             # Configuración central (DB, logger)
│   ├── middleware/       # Middlewares de Express
│   ├── models/           # Modelos de Mongoose para la base de datos
│   ├── routers/          # Definición de rutas de la API
│   └── services/         # Lógica de acceso y manipulación de datos
├── .env.example          # Ejemplo de variables de entorno
├── .gitignore
├── index.js              # Punto de entrada de la aplicación
├── package.json
└── README.md
```

## 📚 Endpoints de la API

A continuación se detallan los endpoints disponibles en la API.

**Nota**: Todos los endpoints que requieren autenticación deben incluir el token JWT en la cabecera `Authorization` como `Bearer <token>`.

### 👤 Usuarios y Autenticación

- **`POST /api/user/create`**: Registrar un nuevo usuario.
  - **Body**:
    ```json
    {
    "name": "pepe",
    "lastName": "gomez",
    "email": "juan@email.com",
    "password": "Hola1234?"
    }
    ```

- **`POST /api/login`**: Iniciar sesión para obtener un token.
  - **Body**:
    ```json
    {
      "email": "testuser",
      "password": "password123"
    }
    ```

- **`GET /api/user/getUserById/:id`**: Obtener los detalles de un usuario por su ID. (Requiere autenticación 🔒)

- **`DELETE /api/user/deleteUser/:id`**: Eliminar un usuario por su ID. (Requiere autenticación 🔒)

- **`PATCH /api/user/changePassword`**: Cambiar la contraseña del usuario autenticado. (Requiere autenticación 🔒)
  - **Body**:
    ```json
    {
      "id": "id del usuario",
      "password": "newPassword456"
    }
    ```

### 🎞️ Películas

- **`GET /api/pelis`**: Obtener una lista paginada de películas. Se pueden usar query params para buscar y paginar.
  - **Ejemplo**: `GET /api/pelis?page=1&limit=10`

- **`GET /api/pelis/content/:id`**: Obtener los detalles de una película por su ID.
- **`POST /api/pelis/search`**: Buscar películas por nombre.
  - **Body**:
    ```json
    {
      "name": "nombre de la película"
    }
    ```

### ❤️ Favoritos (Requiere autenticación 🔒)

- **`GET /api/fav/:id`**: Obtener la lista de películas favoritas del usuario autenticado.

- **`POST /api/fav/addToFav`**: Añadir una película a la lista de favoritos.
  - **Body**:
    ```json
    {
      "userId": "68e90ea012a5a45850e7b6d7",
      "movieId": "68e406daaf0f2dabe54d4dc7"
    }
    ```

- **`DELETE /api/fav/:id`**: Eliminar una película de la lista de favoritos dando el id de favorito

## 📝 Modelos de Datos

### `User`

| Campo      | Tipo     | Descripción                      |
|------------|----------|----------------------------------|
| `name`     | `String` | Nombre.                          |
| `lastName` | `String` | Apellido del usuario.            |
| `email`    | `String` | Email del usuario.               |
| `password` | `String` | Contraseña hasheada del usuario. |


### `Peli`

| Campo                | Tipo     | Descripción                    |
|----------------------|----------|--------------------------------|
| `adult`              | `bool`   | Si es para adultos la película |
| `backdrop_path`      | `String` | Path de imagen.                |
| `genre_ids`          | `Number` | Id de género                   |
| `id`                 | `Number` | Id de la película              |
| `original_language`  | `String` | Lenguaje original              |
| `original_title`     | `String` | Nombre original de la película |
| `overview`           | `String` | Descripción de la película     |
| `popularity`         | `Number` | Popularidad de la película     |
| `poster_path`        | `String` | Path de imagen del poster      |
| `release_date`       | `String` | Fecha de lanzamiento.          |
| `title`              | `String` | Título                         |
| `video`              | `Bool`   | Si hay algún video asociado.   |
| `vote_average`       | `Number` | Promedio de votos.             |
| `vote_count`         | `Number` | Cantidad de Votos.             |

### `Favorite`

| Campo      | Tipo                     | Descripción                                      |
|------------|--------------------------|--------------------------------------------------|
| `userId`   | `ObjectId` (ref: User)   | ID del usuario al que pertenece la lista.        |
| `movieId`  | `[ObjectId]` (ref: Peli) | Array de IDs de las películas favoritas.         |

---
## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles
