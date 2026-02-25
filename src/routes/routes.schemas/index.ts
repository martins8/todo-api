import { createTodoSchema } from "./createTodos.schema.js";
import { deleteTodoSchema } from "./deleteTodos.schema.js";
import { getTodosSchema } from "./getTodos.schema.js";
import { loginRouteSchema } from "./login.schema.js";
import { registerRouteSchema } from "./register.schema.js";

const allSchemas = {
	loginRouteSchema,
	registerRouteSchema,
	createTodoSchema,
	deleteTodoSchema,
	getTodosSchema,
};

export default allSchemas;
