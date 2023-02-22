import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { photos } from "../Image/photos";
import { Post } from "../Posts/post";
import { User } from "../User/user";

@Entity({
    orderBy: {
        updatedAt: "DESC"
    }
})
export class Reply{
    @PrimaryGeneratedColumn()
        id: number

    @Column("varchar", {length: 250})
        body: string

    @CreateDateColumn()
        createdAt : Date

    @UpdateDateColumn()
        updatedAt: Date

    @ManyToOne(() => Post, (post) => post.post_id, {
        onDelete: "CASCADE"
    })
        postId: Post

    @OneToMany(() => photos, (photo) => photo.reply)
        photo: photos    

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: "CASCADE"
    })
        user: User


    @ManyToOne((type) => Reply, (replya) => replya.id, {
        onDelete: "CASCADE"
    })
        parentComment: Reply

    @OneToMany(() => Reply, (replya) => replya.parentComment, {
    })
        childComments: Reply[]

    
    


    
}