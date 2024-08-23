"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async create(req, res) {
        try {
            const profile = await this.profileService.create(req.body);
            res.status(201).json(profile);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async findAll(req, res) {
        try {
            const profiles = await this.profileService.findAll();
            res.status(200).json(profiles);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async findById(req, res) {
        try {
            const profile = await this.profileService.findById(req.params.id);
            if (profile) {
                res.status(200).json(profile);
            }
            else {
                res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async update(req, res) {
        try {
            const profile = await this.profileService.update(req.params.id, req.body);
            if (profile) {
                res.status(200).json(profile);
            }
            else {
                res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async delete(req, res) {
        try {
            const result = await this.profileService.delete(req.params.id);
            if (result.affected > 0) {
                res.status(200).json({ message: "Profile deleted" });
            }
            else {
                res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map