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

startServer();
