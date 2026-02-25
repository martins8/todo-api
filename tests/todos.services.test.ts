import { afterAll, beforeAll, describe, expect, it } from "vitest";
import client from "@/_infra/db/index.js";
import { createTables, dropTables } from "@/_infra/db/tables.js";
import { createTodo } from "@/services/todos.services.js";

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
});
