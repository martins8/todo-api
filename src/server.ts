import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import allSchemas from "./routes.schemas/index.js";

//import { IncomingMessage, request, Server, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

export type User = {
	email: string;
	password: string;
};

server.post("/login", allSchemas.loginRouteSchema, async (request, reply) => {
	const { email, password } = request.body as User;
	reply.send({ success: "Login successFULly!", token: "fake-jwt-token" });
});

server.post(
	"/register",
	allSchemas.registerRouteSchema,
	async (request, reply) => {
		const { name, email, password } = request.body as {
			name: string;
			email: string;
			password: string;
		};
		reply
			.code(201)
			.send({ success: "Registration successful!", token: "fake-jwt-token" });
	},
);

const start = async () => {
	try {
		await server.listen({ port: 3000 });
		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;
		server.log.info(`Server listening on port ${port}`);
		console.log(`Server listening on port ${port} 🛜`);
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
