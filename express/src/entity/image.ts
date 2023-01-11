import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

export class Image{
    
    @PrimaryColumn()
        photo_id: number

}