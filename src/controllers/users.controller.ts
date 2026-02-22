import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "@/_infra/errors/AppError.js";
import { BadRequestError } from "@/_infra/errors/errors.js";
import type { LoginUser, RegisterUser } from "@/models/users.models.js";
import { loginUser, registerUser } from "@/services/users.services.js";

function logErrorDetails(error: AppError) {
	console.log(error.stack);
	console.log("Cause:", error.cause ?? "No underlying cause");
	console.log("Cause stack:", (error.cause as Error)?.stack ?? "N/A");
}

export async function loginController(
	request: FastifyRequest<{ Body: LoginUser }>,
	reply: FastifyReply,
) {
	try {
		if (Object.keys(request.body).includes("name")) {
			throw new BadRequestError({});
		}
		const token = await loginUser(request.body as LoginUser);
		return reply.send({ success: "Login successful!", token });
	} catch (error) {
		if (error instanceof AppError) {
			console.log("Error in loginController:");
			logErrorDetails(error);
			return reply.code(error.statusCode).send(error.toJSON());
		}
		console.error("Error during login:", error);
		return reply.code(500).send({ error: "Login failed" });
	}
}

export async function registerController(
	request: FastifyRequest<{ Body: RegisterUser }>,
	reply: FastifyReply,
) {
	try {
		const token = await registerUser(request.body as RegisterUser);
		return reply.code(201).send({ success: "Registration successful!", token });
	} catch (error) {
		if (error instanceof AppError) {
			console.log("Error in registerController:");
			logErrorDetails(error);
			return reply.code(error.statusCode).send(error.toJSON());
		}
		console.error("Error during registration:", error);
		return reply.code(500).send({ error: "Registration failed" });
	}
}
