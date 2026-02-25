import { beforeAll, describe, expect, it } from "vitest";
import client from "@/_infra/db/index.js";
import { createTables, dropTables } from "@/_infra/db/tables.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
});

import { afterAll } from "vitest";

afterAll(async () => {
	await client.close();
});

describe("TEST REGISTER ENDPOINT", () => {
	it("should register successfully", async () => {
		const response = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "Arthur",
				email: "arthur@example.com",
				password: "password123",
			}),
		});
		type RegisterResponse = {
			success?: string;
			token?: string;
			name?: string;
			statusCode?: number;
			message?: string;
			action?: string;
		};
		const data = await response.json() as RegisterResponse;
		if (data.success && data.token) {
			expect(data).toMatchObject({
				success: "Registration successful!",
				token: expect.any(String),
			});
		} else {
			expect(data).toMatchObject({
				name: "InternalServerError",
				statusCode: 500,
				message: "An internal server error occurred",
				action: "contact support",
			});
		}
	});
});
