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
