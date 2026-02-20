import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import Fastify from "fastify";
import { IncomingMessage, request, Server, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

const options: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					pong: { type: "string" },
				},
			},
		},
	},
};

server.get("/ping", options, async (_request, _reply) => {
	return { pong: "it worked!" };
});

const start = async () => {
	try {
		await server.listen({ port: 3000 });
		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;
		server.log.info(`Server listening on port ${port}`);
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
