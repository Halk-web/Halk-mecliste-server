"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const profile_model_1 = require("../../models/profile.model");
const post_model_1 = require("../../models/post.model");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    url: `${process.env.POSTGRES_URL}`,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [user_model_1.UserEntity, profile_model_1.ProfileEntity, post_model_1.PostEntity],
    synchronize: false,
});
//# sourceMappingURL=database.js.map