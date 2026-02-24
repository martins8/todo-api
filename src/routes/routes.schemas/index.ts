import { createTodoSchema } from "./createTodos.schema.js";
import { loginRouteSchema } from "./login.schema.js";
import { registerRouteSchema } from "./register.schema.js";

const allSchemas = {
	loginRouteSchema,
	registerRouteSchema,
	createTodoSchema,
};

export default allSchemas;
