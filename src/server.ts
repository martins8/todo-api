import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { auth } from "./auth/index.js";
import { todoRoutes } from "./routes/todos.routes.js";
import { userRoutes } from "./routes/users.routes.js";

const server: FastifyInstance = Fastify({});

//in production need to use a env variable for the secret
server.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || "supersecret",
	sign: { expiresIn: "1h" },
});

server.addHook("onRequest", async (request, reply) => {
	if (request.url.startsWith("/todos")) {
		await auth(request, reply);
	}
});

await server.register(userRoutes);
await server.register(todoRoutes);

server.get("/", async (_request, reply) => {
	reply.send({
		message: "Welcome to the Todo API",
		endpoints: ["/login", "/register"],
	});
});

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
