import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTodo } from "../models/todos.models.js";
import { createTodo } from "../services/todos.services.js";

export async function createTodoController(
	request: FastifyRequest<{
		Headers: { Authorization: string };
		Body: CreateTodo;
	}>,
	reply: FastifyReply,
) {
	try {
		const todoData = request.body;
		const todo = await createTodo(todoData);
		return reply.code(201).send(todo);
	} catch (error: unknown) {
		console.log("Error in createTodoController:", error);
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			(error as { code?: string }).code === "FST_ERR_VALIDATION"
		) {
			return reply.code(400).send(error);
		}

		return reply.code(500).send({ error: "Failed to create todo" });
	}
}
