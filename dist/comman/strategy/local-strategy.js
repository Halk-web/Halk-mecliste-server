"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeLocalPassport = initializeLocalPassport;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function initializeLocalPassport(authService) {
    passport_1.default.use(new passport_local_1.Strategy(async (email, password, done) => {
        try {
            const user = await authService.findByEmail(email);
            if (!user) {
                return done(null, false, { message: 'No user with that username' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Password incorrect' });
            }
        }
        catch (error) {
            return done(error);
        }
    }));
}
//# sourceMappingURL=local-strategy.js.map