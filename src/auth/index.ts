import type { FastifyReply, FastifyRequest } from "fastify";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (error) {
		console.error("Authentication error:", error);
		return reply.code(401).send({ message: "Unauthorized" });
	}
}
