import { Repository } from "typeorm";
import { Profile, ProfileEntity } from "../models/profile.model";
import { AppDataSource } from "../database/postgresql/database";

export class ProfileService {
    private profileRepository: Repository<ProfileEntity>;

    constructor() {
        this.profileRepository = AppDataSource.getRepository(ProfileEntity);
    }

    async create(profile: Profile): Promise<ProfileEntity> {
        return await this.profileRepository.save(profile);
    }

    async findAll(): Promise<ProfileEntity[]> {
        return await this.profileRepository.find({relations:{posts:true}});
    }

    async findById(id: string): Promise<ProfileEntity | null> {
        return await this.profileRepository.findOneBy({ id });
    }

    async findByUserId(id: string): Promise<ProfileEntity | null> {
        return await this.profileRepository.findOneBy({ user_id:id });
    }

    async update(id: string, profile: ProfileEntity): Promise<ProfileEntity | null> {
        const existingProfile = await this.profileRepository.findOneBy({ id });
        if (existingProfile) {
            const updatedProfile = Object.assign(existingProfile, profile);
            return await this.profileRepository.save(updatedProfile);
        }
        return null;
    }

    async delete(id: string): Promise<any> {
        return await this.profileRepository.delete(id);
    }
}
