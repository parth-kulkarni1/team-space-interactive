import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Post } from "../Posts/post";
import { Reply } from "../Reply/reply";

@Entity()
export class photos{
    
    @PrimaryGeneratedColumn()
        id: number

    @ManyToOne(() => Post, (post) => post.photo, {
        onDelete: "CASCADE"

    })
        post: Post

    @ManyToOne(() => Reply, (reply) => reply.photo, {
        onDelete: "CASCADE"
    })
        reply: Reply

    @Column("varchar", {length: 255})
        photo_id: string




}