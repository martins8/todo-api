import client from "../_infra/db/index.js";
import type { TodoRequest, TodoResponse } from "../models/todos.models.js";

export async function createTodo(todoData: TodoRequest): Promise<TodoResponse> {
	const { title, description } = todoData;
	try {
		await client.execute({
			sql: "INSERT INTO todos (title, description) VALUES (?, ?)",
			args: [title, description],
		});
		const result = await client.execute({
			sql: "SELECT * FROM todos WHERE id = LAST_INSERT_ROWID()",
			args: [],
		});
		console.log("Created todo:", result.rows[0]);
		const row = result.rows[0];
		const todo: TodoResponse = {
			id: row.id as string,
			title: row.title as string,
			description: row.description as string,
		};
		return todo;
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
		await client.execute({
			sql: "UPDATE todos SET title = ?, description = ? WHERE id = ?",
			args: [title, description, id],
		});
		const result = await client.execute({
			sql: "SELECT * FROM todos WHERE id = ?",
			args: [id],
		});
		console.log("Updated todo:", result.rows[0]);
		const row = result.rows[0];
		const todo: TodoResponse = {
			id: row.id as string,
			title: row.title as string,
			description: row.description as string,
		};
		return todo;
	} catch (error) {
		console.error("Error updating todo:", error);
		throw error;
	}
}
