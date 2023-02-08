import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Post } from "../Posts/post";

@Entity()
export class photos{
    
    @PrimaryGeneratedColumn()
        id: number

    @ManyToOne(() => Post, (post) => post.photo, {
        onDelete: "CASCADE"

    })
        post: Post

    @Column("varchar", {length: 255})
        photo_id: string




}