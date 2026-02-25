import { createTodoSchema } from "./createTodos.schema.js";
import { deleteTodoSchema } from "./deleteTodos.schema.js";
import { loginRouteSchema } from "./login.schema.js";
import { registerRouteSchema } from "./register.schema.js";

const allSchemas = {
	loginRouteSchema,
	registerRouteSchema,
	createTodoSchema,
	deleteTodoSchema,
};

export default allSchemas;
