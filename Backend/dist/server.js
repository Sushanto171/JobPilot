"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const startServer = async () => {
    app_1.app.listen({ port, host }, (err, address) => {
        console.log({ address });
        if (err) {
            console.log("Error: ", err);
            process.exit(1);
        }
    });
};
startServer();
