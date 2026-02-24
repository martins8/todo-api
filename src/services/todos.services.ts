import client from "../_infra/db/index.js";
import type { CreateTodo } from "../models/todos.models.js";

export async function createTodo(todoData: CreateTodo) {
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
		return result.rows[0];
	} catch (error) {
		console.error("Error creating todo:", error);
		throw error;
	}
}
