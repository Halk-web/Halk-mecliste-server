"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.removeMessageById = exports.getMessagesByPostId = exports.createMessage = void 0;
const database_1 = require("../database/firebase/database");
// Create a new message
const createMessage = async (uuid, message) => {
    try {
        await database_1.dbRef.child("messages/" + uuid).set({ ...message, id: uuid, created_at: new Date().toISOString() });
        console.log("Message is created successfully");
    }
    catch (err) {
        console.error("Error creating message:", err);
    }
};
exports.createMessage = createMessage;
// Get messages by post ID
const getMessagesByPostId = async (postId) => {
    return new Promise((resolve, reject) => {
        const messagesRef = database_1.dbRef.child("messages");
        messagesRef.orderByChild('post_id').equalTo(postId).on("value", (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                messages.push(childSnapshot.val());
            });
            resolve(messages);
        }, (error) => {
            reject(error);
        });
    });
};
exports.getMessagesByPostId = getMessagesByPostId;
// Remove a message by ID
const removeMessageById = async (id) => {
    try {
        await database_1.dbRef.child("messages/" + id).remove();
        console.log("Message removed successfully");
    }
    catch (err) {
        console.error("Error removing message:", err);
    }
};
exports.removeMessageById = removeMessageById;
// Get all messages
const getMessages = async () => {
    return new Promise((resolve, reject) => {
        const messagesRef = database_1.dbRef.child("messages");
        messagesRef.once("value", (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                messages.push(childSnapshot.val());
            });
            resolve(messages);
        }, (error) => {
            reject(error);
        });
    });
};
exports.getMessages = getMessages;
//# sourceMappingURL=message.service.js.map