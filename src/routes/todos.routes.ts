import type { FastifyInstance, RouteHandler } from "fastify";
import {
	createTodoController,
	updateTodoController,
} from "../controllers/todos.controller.js";
import { createTodoSchema } from "./routes.schemas/createTodos.schema.js";

export async function todoRoutes(server: FastifyInstance) {
	server.post(
		"/todos/create",
		createTodoSchema,
		createTodoController as RouteHandler,
	);

	server.put(
		"/todos/update/:id",
		createTodoSchema,
		updateTodoController as RouteHandler,
	);
}
