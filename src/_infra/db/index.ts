import { createClient } from "@libsql/client";

const client = createClient({
	url: "file:local.db",
});

await client.execute({
	sql: "PRAGMA busy_timeout = 2000",
});

export default client;
