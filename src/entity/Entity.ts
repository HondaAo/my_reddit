import { PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn } from "typeorm";
import { IsEmail, Length } from 'class-validator'
import { classToPlain, Exclude } from 'class-transformer'


export default abstract class Entity extends BaseEntity {

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Length(3, 25, { message: 'Username must be at least 3 characters long.'})
    @Column({unique: true})
    username: string;

    @Index()
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    @Length(6, 25)
    password: string;

    @CreateDateColumn()
    createAt: Date

    toJSON(){
        return classToPlain(this)
    }
}