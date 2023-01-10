import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    title: string

    @Column()
    body: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
    


}