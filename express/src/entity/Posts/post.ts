import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { photos } from "../Image/photos";
import { User } from "../User/user";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column("varchar", {length:50})
    title: string

    @Column("varchar", {length: 250})
    body: string


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;


    @ManyToOne(() => User)
    user: User

    @OneToMany(() => photos, (photo) => photo.post)
        photo: photos    
    


}