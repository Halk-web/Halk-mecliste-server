import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProfileEntity } from './profile.model';

export interface User {
    id?: string;
    username: string;
    password: string;
    email:string;
    numberOfPosts?:number;
    profile?:any;
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email:string;

  @Column({default:0})
  numberOfPosts?:number;

  @OneToOne(()=>ProfileEntity,profile=>profile.user)
  profile:ProfileEntity;

  @Column({ nullable: true })
  refreshToken?: string;
}