import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "@/_infra/errors/AppError.js";
import type { TodoRequest } from "../models/todos.models.js";
import {
	createTodo,
	deleteTodo,
	updateTodo,
} from "../services/todos.services.js";

export async function createTodoController(
	request: FastifyRequest<{
		Headers: { Authorization: string };
		Body: TodoRequest;
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

export async function updateTodoController(
	request: FastifyRequest<{
		Headers: { Authorization: string };
		Body: TodoRequest;
		Params: { id: string };
	}>,
	reply: FastifyReply,
) {
	try {
		const { id } = request.params;
		const todoData = request.body;
		const todo = await updateTodo(id, todoData);
		return reply.code(200).send(todo);
	} catch (error: unknown) {
		console.log("Error in updateTodoController:", error);
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			(error as { code?: string }).code === "FST_ERR_VALIDATION"
		) {
			return reply.code(400).send(error);
		}

		return reply.code(500).send({ error: "Failed to update todo" });
	}
}

export async function deleteTodoController(
	request: FastifyRequest<{
		Headers: { Authorization: string };
		Params: { id: string };
	}>,
	reply: FastifyReply,
) {
	try {
		const { id } = request.params;
		const success = await deleteTodo(id);
		if (success) {
			return reply.code(200).send({ message: "Todo deleted successfully" });
		} else {
			return reply.code(404).send({ message: "Todo not found" });
		}
	} catch (error: unknown) {
		console.log("Error in deleteTodoController:", error);
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			(error as { code?: string }).code === "FST_ERR_VALIDATION"
		) {
			return reply.code(400).send(error);
		}
		if (error instanceof AppError) {
			console.log("AppError in deleteTodoController:", error);
			return reply.code(error.statusCode).send(error.toJSON());
		}

		return reply.code(500).send({ error: "Failed to delete todo" });
	}
}
