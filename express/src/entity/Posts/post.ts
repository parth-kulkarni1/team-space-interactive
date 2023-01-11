import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "../User/user";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column("varchar", {length:50})
    title: string

    @Column("varchar", {length: 250})
    body: string

    @ManyToOne(() => User)
    user: User
    


}