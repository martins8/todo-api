import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import allSchemas from "./routes.schemas/index.js";
import { loginUser, registerUser } from "./services/users.services.js";
import type { LoginUser, RegisterUser } from "./types/index.js";

//import { IncomingMessage, request, Server, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

server.get("/", async (_request, reply) => {
	reply.send({
		message: "Welcome to the Todo API",
		endpoints: ["/login", "/register"],
	});
});

server.post("/login", allSchemas.loginRouteSchema, async (request, reply) => {
	try {
		const { email, password } = request.body as LoginUser;
		const result = await loginUser({ email, password });
		if (result === "INVALID_CREDENTIALS") {
			reply.code(401).send({ error: "Invalid email or password" });
			return;
		}
		reply.send({ success: "Login successful!", token: result });
	} catch (error) {
		console.error("Error during login:", error);
		reply.code(500).send({ error: "Login failed" });
	}
});

server.post(
	"/register",
	allSchemas.registerRouteSchema,
	async (request, reply) => {
		try {
			const { name, email, password } = request.body as RegisterUser;
			const result = await registerUser({ name, email, password });
			if (result === "EMAIL_ALREADY_EXISTS") {
				reply.code(409).send({ error: "Email already exists" });
				return;
			}
			reply
				.code(201)
				.send({ success: "Registration successful!", token: result });
		} catch (error) {
			console.error("Error during registration:", error);
			reply.code(500).send({ error: "Registration failed" });
		}
	},
);

const start = async () => {
	try {
		await server.listen({ port: 3000 });
		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;
		server.log.info(`Server listening on port ${port}`);
		server.log.info(`url: http://localhost:${port}`);
		console.log(`Server listening on port ${port} 🛜`);
		console.log(`devUrl: http://localhost:${port} 🌐`);
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
