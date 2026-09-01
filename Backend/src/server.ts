<<<<<<< HEAD
import "dotenv/config";
import { app } from "./app";
import { db } from "./prisma/db";
import {seedAdmin} from "./app/utils/seedAdmin"

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const DATABASE_URL = process.env.DATABASE_URL;

const MAX_DB_RETRIES = 5;
const DB_RETRY_DELAY_MS = 2000;

let runtime: Awaited<ReturnType<typeof db.connect>> | undefined;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry(
  url: string,
  attempt = 1,
): Promise<Awaited<ReturnType<typeof db.connect>>> {
  try {
    const connection = await db.connect({ url });
    console.log("✅ Database connected successfully");
    return connection;
  } catch (error) {
    if (attempt >= MAX_DB_RETRIES) {
      console.error(
        `❌ Database connection failed after ${MAX_DB_RETRIES} attempts`,
      );
      throw error;
    }
    console.warn(
      `⚠️  Database connection attempt ${attempt}/${MAX_DB_RETRIES} failed. Retrying in ${DB_RETRY_DELAY_MS}ms...`,
    );
    await sleep(DB_RETRY_DELAY_MS);
    return connectWithRetry(url, attempt + 1);
  }
}

async function startServer() {
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set in the environment");
    process.exit(1);
  }

  try {
    runtime = await connectWithRetry(DATABASE_URL);

    const address = await app.listen({ port, host });
    console.log(`🚀 Server listening at ${address}`);

    await seedAdmin()
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await shutdown(1);
  }
}

async function shutdown(exitCode = 0) {
  console.log("🛑 Shutting down gracefully...");
  try {
    await app.close();
    console.log("✅ HTTP server closed");
  } catch (error) {
    console.error("Error closing HTTP server:", error);
  }

  try {
    if (runtime) {
      await runtime.close();
      console.log("✅ Database connection closed");
    }
  } catch (error) {
    console.error("Error closing database connection:", error);
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  shutdown(1);
});
=======
import { app } from "./app";

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

const startServer = async () => {
  app.listen({ port, host }, (err, address) => {
    console.log({ address });
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    }
  });
};
>>>>>>> origin/main

startServer();
