import { createClient } from "@libsql/client";

const client = createClient({
	url: "file:local.db",
});

await client.execute({
	sql: "PRAGMA busy_timeout = 5000",
});

export default client;
