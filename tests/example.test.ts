import { describe, expect, it } from "vitest";

describe("TEST LOGIN ENDPOINT", () => {
	it("should login successfully", async () => {
		await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: "test@example.com",
				password: "password123",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				expect(data).toEqual({
					success: "Login successFULly!",
					token: "fake-jwt-token",
				});
			});
	});
});

describe("TEST REGISTER ENDPOINT", () => {
	it("should register successfully", async () => {
		await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "John Doe",
				email: "john.doe@example.com",
				password: "password123",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				expect(data).toEqual({
					success: "Registration successful!",
					token: "fake-jwt-token",
				});
			});
	});
});
