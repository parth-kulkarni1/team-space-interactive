import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

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
}