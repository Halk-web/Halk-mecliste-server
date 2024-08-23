"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const profile_model_1 = require("../models/profile.model");
const database_1 = require("../database/postgresql/database");
class ProfileService {
    constructor() {
        this.profileRepository = database_1.AppDataSource.getRepository(profile_model_1.ProfileEntity);
    }
    async create(profile) {
        return await this.profileRepository.save(profile);
    }
    async findAll() {
        return await this.profileRepository.find();
    }
    async findById(id) {
        return await this.profileRepository.findOneBy({ id });
    }
    async findByUserId(id) {
        return await this.profileRepository.findOneBy({ user_id: id });
    }
    async update(id, profile) {
        const existingProfile = await this.profileRepository.findOneBy({ id });
        if (existingProfile) {
            const updatedProfile = Object.assign(existingProfile, profile);
            return await this.profileRepository.save(updatedProfile);
        }
        return null;
    }
    async delete(id) {
        return await this.profileRepository.delete(id);
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map