import { beforeAll, describe, expect, it } from "vitest";
import client from "@/db/index.js";
import { createTables, dropTables } from "@/db/tables.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
	await registerUser({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});
});

import { afterAll } from "vitest";
import { registerUser } from "@/services/users.services.js";

afterAll(async () => {
	await client.close();
});

describe("TEST LOGIN ENDPOINT", () => {
	it("should login successfully", async () => {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: "test@example.com",
				password: "password123",
			}),
		});

		const data = await response.json();

		expect(data).toMatchObject({
			success: "Login successful!",
			token: expect.any(String),
		});
	});
});

describe("TEST INVALID LOGIN", () => {
	it("should fail with invalid credentials", async () => {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: "invalid@example.com",
				password: "wrongpassword",
			}),
		});

		const data = await response.json();

		expect(data).toEqual({ error: "Invalid email or password" });
	});
});
