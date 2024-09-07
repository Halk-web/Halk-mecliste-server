import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.model";
import { PostEntity } from "./post.model";

export interface Profile{
  id?:string;
  profile_img?:string;
  user_id:string;
  city:string;
  politicalView:string;
  party:string;
  gender:string;
}

@Entity("profiles")
export class ProfileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name:"user_id"})
  user_id:string;

  @Column({ type: "text", nullable: true }) 
  profile_img?: string;

  @Column()
  city:string;

  @Column()
  politicalView:string;

  @Column()
  party:string;

  @Column()
  gender:string;

  @OneToOne(() => UserEntity, user => user.profile)
  @JoinColumn({name:"user_id"}) 
  user: UserEntity;

  @OneToMany(() => PostEntity, post => post.profile)
  posts: PostEntity[];

  @ManyToMany(() => PostEntity, post => post.liked_by)
  liked_posts: PostEntity[];

  @ManyToMany(() => PostEntity, post => post.disliked_by)
  disliked_posts: PostEntity[];
}
