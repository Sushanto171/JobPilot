"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReply = void 0;
const sendReply = (reply, statusCode, success, message, data) => {
    const response = {
        success,
        message,
    };
    if (data) {
        response.data = data;
    }
    reply.status(statusCode).send(response);
};
exports.sendReply = sendReply;
