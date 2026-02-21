import { afterAll, beforeAll, describe, expect, it } from "vitest";
import client from "@/db/index.js";
import { createTables, dropTables } from "@/db/tables.js";
import { loginUser, registerUser } from "@/services/users.services.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
});

afterAll(async () => {
	await client.close();
});

describe("TEST USERS SERVICES", () => {
	it("should register successfully", async () => {
		const result = await registerUser({
			email: "test@example.com",
			password: "password123",
			name: "Test User",
		});
		expect(result).toBeDefined();
		expect(result).not.toBe("EMAIL_ALREADY_EXISTS");
		expect(result).not.toBe("DATABASE_ERROR");
		expect(typeof result).toBe("string");
	});

	it("should login successfully", async () => {
		const result = await loginUser({
			email: "test@example.com",
			password: "password123",
		});
		expect(result).toBeDefined();
		expect(result).not.toBe("INVALID_CREDENTIALS");
		expect(result).not.toBe("DATABASE_ERROR");
		expect(typeof result).toBe("string");
	});

	it("should fail with invalid credentials", async () => {
		const result = await loginUser({
			email: "invalid@example.com",
			password: "wrongpassword",
		});
		expect(result).toBe("INVALID_CREDENTIALS");
	});
});
