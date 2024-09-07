"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesController = exports.removeMessageByIdController = exports.getMessagesByPostIdController = exports.createMessageController = void 0;
const message_service_1 = require("../services/message.service");
const uuid_1 = require("uuid");
const createMessageController = async (req, res) => {
    const message = req.body;
    const uuid = (0, uuid_1.v4)();
    try {
        await (0, message_service_1.createMessage)(uuid, message);
        res.status(201).json({ message: 'Message created successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Error creating message', details: err.message });
    }
};
exports.createMessageController = createMessageController;
// Get messages by post ID
const getMessagesByPostIdController = async (req, res) => {
    const { postId } = req.params;
    try {
        const messages = await (0, message_service_1.getMessagesByPostId)(postId);
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ error: 'Error retrieving messages', details: err.message });
    }
};
exports.getMessagesByPostIdController = getMessagesByPostIdController;
// Remove a message by ID
const removeMessageByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, message_service_1.removeMessageById)(id);
        res.status(200).json({ message: 'Message removed successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Error removing message', details: err.message });
    }
};
exports.removeMessageByIdController = removeMessageByIdController;
// Get all messages
const getMessagesController = async (req, res) => {
    try {
        const messages = await (0, message_service_1.getMessages)();
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ error: 'Error retrieving messages', details: err.message });
    }
};
exports.getMessagesController = getMessagesController;
//# sourceMappingURL=message.controller.js.map