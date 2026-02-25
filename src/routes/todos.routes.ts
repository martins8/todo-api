import type { FastifyInstance, RouteHandler } from "fastify";
import {
	createTodoController,
	deleteTodoController,
	updateTodoController,
} from "../controllers/todos.controller.js";

import allSchemas from "./routes.schemas/index.js";

const { createTodoSchema, deleteTodoSchema, getTodosSchema } = allSchemas;

import { getTodosController } from "@/controllers/todos.controller.js";

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

	server.delete(
		"/todos/delete/:id",
		deleteTodoSchema,
		deleteTodoController as RouteHandler,
	);

	server.get("/todos", getTodosSchema, getTodosController as RouteHandler);
}
