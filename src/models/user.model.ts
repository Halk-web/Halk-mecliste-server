import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProfileEntity } from './profile.model';

export interface User {
    id?: string;
    username: string;
    password: string;
    email:string;
    city:string;
    politicalView:string;
    party:string;
    gender:string;
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

  @Column()
  city:string;

  @Column()
  politicalView:string;

  @Column()
  party:string;

  @Column()
  gender:string;

  @OneToOne(()=>ProfileEntity,profile=>profile.user)
  profile:ProfileEntity;

  @Column({ nullable: true })
  refreshToken?: string;
}