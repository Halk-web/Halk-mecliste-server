import { getConnectionManager, getRepository, Repository } from 'typeorm';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { UserEntity } from '../models/user.model';
import { AppDataSource } from '../database/postgresql/database';

export class AuthService {
  private userRepository: Repository<UserEntity>;

  constructor(){
    this.userRepository=AppDataSource.getRepository(UserEntity);
  }
  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userEntity = this.userRepository.create({
      ...user,
      password: hashedPassword
    });
    await this.userRepository.save(userEntity);
    return userEntity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({where:{id:id},relations:{profile:true}});
    return user ? user : null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }
}