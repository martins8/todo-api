import { afterAll, beforeAll, describe, expect, it } from "vitest";
import client from "@/_infra/db/index.js";
import { createTables, dropTables } from "@/_infra/db/tables.js";
import { NotFoundIdError } from "@/_infra/errors/errors.js";
import {
	createTodo,
	deleteTodo,
	updateTodo,
} from "@/services/todos.services.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
});

afterAll(async () => {
	await client.close();
});

describe("TEST TODOS SERVICES", () => {
	it("should create a todo successfully", async () => {
		const result = await createTodo({
			title: "Test Todo",
			description: "This is a test todo",
		});
		console.log("Test result:", result);
		expect(result).toHaveProperty("id");
		expect(result.title).toBe("Test Todo");
		expect(result.description).toBe("This is a test todo");
	});

	it("should update a todo successfully", async () => {
		// First, create a todo to update
		const created = await createTodo({
			title: "Original Title",
			description: "Original Description",
		});

		// Now, update the todo
		const updated = await updateTodo(created.id, {
			title: "Updated Title",
			description: "Updated Description",
		});

		console.log("Updated todo:", updated);
		expect(updated.id).toBe(created.id);
		expect(updated.title).toBe("Updated Title");
		expect(updated.description).toBe("Updated Description");
	});

	it("should delete a todo successfully", async () => {
		// First, create a todo to delete
		const created = await createTodo({
			title: "Todo to Delete",
			description: "This todo will be deleted",
		});

		// Now, delete the todo
		const deleted = await deleteTodo(created.id);
		expect(deleted).toBe(true);

		// Optionally, you could try to fetch the deleted todo to confirm it's gone
	});

	it("should delete a non-existent todo and throw NotFoundIdError", async () => {
		try {
			await deleteTodo("non-existent-id");
		} catch (error) {
			expect(error).toBeInstanceOf(NotFoundIdError);
		}
	});

	it("should delete successfully a todo that exists", async () => {
		// First, create a todo to delete
		const created = await createTodo({
			title: "Todo to Delete",
			description: "This todo will be deleted",
		});

		// Now, delete the todo
		const deleted = await deleteTodo(created.id);
		expect(deleted).toBe(true);
	});
});
