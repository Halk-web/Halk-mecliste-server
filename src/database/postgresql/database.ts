import { DataSource } from 'typeorm';
import { UserEntity } from '../../models/user.model'
import dotenv from 'dotenv';
import { ProfileEntity } from '../../models/profile.model';
import { PostEntity } from '../../models/post.model';

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url: `${process.env.POSTGRES_URL}`, 
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: [UserEntity,ProfileEntity,PostEntity],
  synchronize: true,
});
