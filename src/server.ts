import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { userRoutes } from "./routes/users.routes.js";

//import { IncomingMessage, request, Server, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

server.get("/", async (_request, reply) => {
	reply.send({
		message: "Welcome to the Todo API",
		endpoints: ["/login", "/register"],
	});
});

server.register(userRoutes);

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
