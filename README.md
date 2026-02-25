# Todo API

A RESTful API for managing tasks (todos), built with Node.js and TypeScript, following the MVC pattern and using SQLite as the database.

## Requirements

- Node.js (version 16+ recommended)
- npm or yarn

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/martins8/todo-api.git
   cd todo-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure the SQLite database:**
   - The database file will be created automatically when you run the application.
   - By default, it will be located at `./local.db` (check your code for the exact path).
   - Make sure the directory has write permissions.
   - run the test files with npm run test to generate database tables
  


5. **Start the server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The server will be available at `http://localhost:3000` (or the configured port).

## Main Endpoints

### Authentication

- `POST /register` — Create a new user.
- `POST /login` — Log in and receive an authentication token.

### Todos

- `GET /todos?page=?&limit=?` — List a pagination todos for the authenticated user.
- `POST /todos/create` — Create a new todo.
- `PUT /todos/update/:id` — Update an existing todo.
- `DELETE /todos/delete/:id` — Delete a todo.

> **Note:** For protected routes, send the JWT token in the `Authorization: Bearer <token>` header.

## Running Tests

```bash
npm test
# or
yarn test
```

## Notes

- The project uses SQLite for easy local development.
- Ensure the database file is accessible and has the correct permissions.
- To reset the database, simply delete the `.db` file and restart the server.

## License

MIT