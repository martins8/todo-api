import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";
import { afterAll, beforeAll, expect, it } from "vitest";
import { todoRoutes } from "@/routes/todos.routes.js";
import { userRoutes } from "@/routes/users.routes.js";

let server: ReturnType<typeof Fastify>;
interface RegisterResponse {
	success: string;
	token: string;
}

beforeAll(async () => {
	server = Fastify();
	server.register(fastifyJwt, { secret: "testsecret" });
	await server.register(userRoutes);
	await server.register(todoRoutes);
	await server.listen({ port: 3333 });
});

afterAll(async () => {
	await server.close();
});

it("should create a todo with valid token", async () => {
	// Primeiro registra usuário
	const registerResponse = await fetch("http://localhost:3333/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Test User 2",
			email: "test2@example.com",
			password: "password123",
		}),
	});
	const registerData = (await registerResponse.json()) as RegisterResponse;
	const token = registerData.token;

	// Agora cria o todo com o token
	const response = await fetch("http://localhost:3333/todos/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			title: "Test Todo",
			description: "This is a test todo item",
		}),
	});

	expect(response.status).toBe(201);
	const obj = (await response.json()) as {
		id: number;
		title: string;
		description: string;
	};
	expect(obj).toEqual({
		id: obj.id,
		title: "Test Todo",
		description: "This is a test todo item",
	});
});
