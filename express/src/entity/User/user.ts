import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Post } from "../Posts/post"
import { Reply } from "../Reply/reply"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({default: "cover-background_hsrl28"}) // Storing the default cover-background that all users will be applied with
    cover_background: string

    @Column({default:  "user_hv9uk1"}) // Storing the default profile pic
    profile_background: string

    @OneToMany(() => Post, (post) => post.post_id)
    posts: Post[]

    @OneToMany(() => Reply, (reply) => reply.id)
    reply: Reply
}