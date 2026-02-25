import type { FastifyReply, FastifyRequest } from "fastify";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (error) {
		console.error("Authentication error:", error);
		if (request.method === "POST" && request.url === "/todos/create") {
			return reply.code(401).send({ message: "Unauthorized" });
		}
		if (request.method === "PUT" && request.url.startsWith("/todos/update/")) {
			return reply.code(403).send({ message: "Forbidden" });
		}
		return reply.code(401).send({ message: "Unauthorized" });
	}
}
