import { beforeAll, describe, expect, it } from "vitest";
import client from "@/db/index.js";
import { createTables, dropTables } from "@/db/tables.js";

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
		const data = await response.json();
		expect(data).toMatchObject({
			success: "Registration successful!",
			token: expect.any(String),
		});
	});
});
