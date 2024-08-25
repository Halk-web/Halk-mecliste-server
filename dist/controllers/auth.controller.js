"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor(authService, profileService) {
        this.authService = authService;
        this.profileService = profileService;
    }
    async register(req, res) {
        try {
            const user = await this.authService.create(req.body);
            const profile = await this.profileService.create({ user_id: user.id });
            console.log("user=", user, "profile=", profile);
            console.log("created user:", user);
            console.log("created profile:", profile);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await this.authService.findByEmail(email);
            if (!user)
                return res.status(401).json({ message: 'User not found' });
            const isValid = await this.authService.validatePassword(user, password);
            if (!isValid)
                return res.status(401).json({ message: 'Invalid password' });
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // Save refreshToken in database (pseudo-code)
            await this.authService.saveRefreshToken(user.id, refreshToken);
            res.json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }
    async findOneById(req, res) {
        const id = req.params.id;
        try {
            const user = await this.authService.findById(id);
            console.log(id, "--->", user);
            res.status(202).json(user);
        }
        catch (err) {
            res.status(404).json(err);
        }
    }
    async refresh(req, res) {
        const { refreshToken } = req.body;
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
            const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ accessToken: newAccessToken });
        }
        catch (error) {
            res.status(401).json({ message: 'Invalid token.' });
        }
    }
    async me(req, res) {
        if (req.user) {
            const user = await this.authService.findById(req.user.id);
            res.json(user); // Bu satırda `void` döndürülüyor
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map