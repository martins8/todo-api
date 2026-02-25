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

		type LoginResponse = {
			success?: string;
			token?: string;
			name?: string;
			statusCode?: number;
			message?: string;
			action?: string;
		};
		const data = await response.json() as LoginResponse;

		if (data.success && data.token) {
			expect(data).toMatchObject({
				success: "Login successful!",
				token: expect.any(String),
			});
		} else if (data.name === "InvalidCredentialsError") {
			expect(data).toMatchObject({
				name: "InvalidCredentialsError",
				statusCode: 401,
				message: "Invalid credentials",
				action: "check your credentials and try again",
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

		type LoginResponse = {
			success?: string;
			token?: string;
			name?: string;
			statusCode?: number;
			message?: string;
			action?: string;
		};
		const data = await response.json() as LoginResponse;

		if (data.name === "InvalidCredentialsError") {
			expect(data).toEqual({
				name: "InvalidCredentialsError",
				action: "check your credentials and try again",
				message: "Invalid credentials",
				statusCode: 401,
			});
		} else {
			expect(data).toEqual({
				name: "InternalServerError",
				action: "contact support",
				message: "An internal server error occurred",
				statusCode: 500,
			});
		}
	});
});
