import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { ProfileEntity } from "../models/profile.model";

export class ProfileController {
    private profileService: ProfileService;

    constructor(profileService: ProfileService) {
        this.profileService = profileService;
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const profile = await this.profileService.create(req.body as ProfileEntity);
            res.status(201).json(profile);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const profiles = await this.profileService.findAll();
            res.status(200).json(profiles);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const profile = await this.profileService.findById(req.params.id);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const profile = await this.profileService.update(req.params.id, req.body as ProfileEntity);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.profileService.delete(req.params.id);
            if (result.affected > 0) {
                res.status(200).json({ message: "Profile deleted" });
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
}
