import type { FastifyInstance, RouteHandler } from "fastify";
import {
	loginController,
	registerController,
} from "@/controllers/users.controller.js";
import allSchemas from "@/routes.schemas/index.js";

export async function userRoutes(server: FastifyInstance) {
	server.post(
		"/login",
		allSchemas.loginRouteSchema,
		loginController as RouteHandler,
	);
	server.post(
		"/register",
		allSchemas.registerRouteSchema,
		registerController as RouteHandler,
	);
}
