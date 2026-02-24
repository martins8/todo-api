import type { FastifyInstance, RouteHandler } from "fastify";
import { createTodoController } from "../controllers/todos.controller.js";
import { createTodoSchema } from "./routes.schemas/createTodos.schema.js";

export async function todoRoutes(server: FastifyInstance) {
	server.post(
		"/todos/create",
		createTodoSchema,
		createTodoController as RouteHandler,
	);
}
