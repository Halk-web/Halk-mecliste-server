"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = authenticateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretRefresh = process.env.JWT_SECRET_REFRESH;
function authenticateRefreshToken(req, res, next) {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(refreshToken, secretRefresh, (err, payload) => {
        if (err)
            return res.sendStatus(403);
        req.user = payload;
        next();
    });
}
//# sourceMappingURL=jwtRefreshTokenMiddleware.js.map