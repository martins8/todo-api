import { NotFoundIdError } from "@/_infra/errors/errors.js";
import client from "../_infra/db/index.js";
import type { TodoRequest, TodoResponse } from "../models/todos.models.js";

export async function createTodo(todoData: TodoRequest): Promise<TodoResponse> {
	const { title, description } = todoData;
	try {
		const result = await client.execute({
			sql: "INSERT INTO todos (title, description) VALUES (?, ?) RETURNING *",
			args: [title, description],
		});
		const row = result.rows[0];
		return {
			id: row.id as string,
			title: row.title as string,
			description: row.description as string,
		};
	} catch (error) {
		console.error("Error creating todo:", error);
		throw error;
	}
}

export async function updateTodo(
	id: string,
	todoData: TodoRequest,
): Promise<TodoResponse> {
	const { title, description } = todoData;
	try {
		const result = await client.execute({
			sql: "UPDATE todos SET title = ?, description = ? WHERE id = ? RETURNING *",
			args: [title, description, id],
		});
		if (result.rows.length === 0) throw new NotFoundIdError({});
		const row = result.rows[0];
		return {
			id: row.id as string,
			title: row.title as string,
			description: row.description as string,
		};
	} catch (error) {
		console.error("Error updating todo:", error);
		throw error;
	}
}

export async function deleteTodo(id: string): Promise<boolean> {
	try {
		const result = await client.execute({
			sql: "DELETE FROM todos WHERE id = ? RETURNING id",
			args: [id],
		});
		if (result.rows.length === 0) throw new NotFoundIdError({});
		return true;
	} catch (error) {
		console.error("Error deleting todo:", error);
		throw error;
	}
}
