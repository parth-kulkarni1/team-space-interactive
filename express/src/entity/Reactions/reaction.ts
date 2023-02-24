import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../Posts/post";
import { Reply } from "../Reply/reply";
import { User } from "../User/user";

@Entity()

export class Reactions{
    @PrimaryGeneratedColumn()
        id: number
    
    @Column({default: 0})
        likes: number

    @Column({default: 0})
        hearts: number

    @Column({default: 0})
        dislike: number
    
    @ManyToOne(() => (User), (user) => user.id)
        user: User

    @ManyToOne(() => (Post), (post) => post.post_id)
        post: Post

    @ManyToOne(() => (Reply), (reply) => reply.id)
        reply: Reply


    
}