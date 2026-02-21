import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginUser, RegisterUser } from "@/models/users.models.js";
import { loginUser, registerUser } from "@/services/users.services.js";

export async function loginController(
	request: FastifyRequest<{ Body: LoginUser }>,
	reply: FastifyReply,
) {
	try {
		const result = await loginUser(request.body as LoginUser);
		if (result === "INVALID_CREDENTIALS") {
			return reply.code(401).send({ error: "Invalid email or password" });
		}
		return reply.send({ success: "Login successful!", token: result });
	} catch (error) {
		console.error("Error during login:", error);
		return reply.code(500).send({ error: "Login failed" });
	}
}

export async function registerController(
	request: FastifyRequest<{ Body: RegisterUser }>,
	reply: FastifyReply,
) {
	try {
		const result = await registerUser(request.body as RegisterUser);
		if (result === "EMAIL_ALREADY_EXISTS") {
			return reply.code(409).send({ error: "Email already exists" });
		}
		return reply
			.code(201)
			.send({ success: "Registration successful!", token: result });
	} catch (error) {
		console.error("Error during registration:", error);
		return reply.code(500).send({ error: "Registration failed" });
	}
}
