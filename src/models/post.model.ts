import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.model";

export interface Post {
    id?: string;
    title: string;
    image?: string; 
    description: string;
    created_at: Date;
    profile_id: string;
}

@Entity("posts")
export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ type: "text", nullable: true }) 
    image?: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ name: "profile_id" })
    profile_id: string;

    @ManyToOne(() => ProfileEntity, profile => profile.posts)
    @JoinColumn({ name: "profile_id" })
    profile: ProfileEntity;

    @ManyToMany(() => ProfileEntity, profile => profile.liked_posts)
    @JoinTable({
        name: "post_likes",  // Join table ismi
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "profile_id",
            referencedColumnName: "id",
        },
    })
    liked_by: ProfileEntity[];

    @ManyToMany(() => ProfileEntity, profile => profile.disliked_posts)
    @JoinTable({
        name: "post_dislikes",  // Join table ismi
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "profile_id",
            referencedColumnName: "id",
        },
    })
    disliked_by: ProfileEntity[];
}
