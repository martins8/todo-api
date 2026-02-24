import { beforeAll, describe, expect, it } from "vitest";
import client from "@/_infra/db/index.js";
import { createTables, dropTables } from "@/_infra/db/tables.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
	await registerUser({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});
	await loginUser({
		email: "test@example.com",
		password: "password123",
	});
});

import { afterAll } from "vitest";
import { loginUser, registerUser } from "@/services/users.services.js";

afterAll(async () => {
	await client.close();
});

describe("todo endpoint tests", () => {
	it("should be existing", async () => {
		const response = await fetch("http://localhost:3000/todos", {
			method: "POST",
		});
		expect(response.status).not.toBe(404);
	});

	it("should negatively test todo creation without token", async () => {
		const response = await fetch("http://localhost:3000/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: "Test Todo",
				description: "This is a test todo item",
			}),
		});
		const obj = await response.json();
		expect(obj).toEqual({
			code: "FST_ERR_VALIDATION",
			error: "Bad Request",
			message: "headers must have required property 'authorization'",
			statusCode: 400,
		});
	});

	it("should create a todo with valid token", async () => {
		const response = await fetch("http://localhost:3000/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "jwt dummy-token",
			},
			body: JSON.stringify({
				title: "Test Todo",
				description: "This is a test todo item",
			}),
		});
		expect(response.status).toBe(201);
		const obj = await response.json();
		expect(obj).toEqual({
			id: 1,
			title: "Test Todo",
			description: "This is a test todo item",
		});
	});
});
