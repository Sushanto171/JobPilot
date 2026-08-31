"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const SendReply_1 = require("./app/utils/SendReply");
exports.app = (0, fastify_1.default)({ logger: true });
exports.app.get("/", (request, reply) => {
    (0, SendReply_1.sendReply)(reply, 200, true, "Server is running..");
});
