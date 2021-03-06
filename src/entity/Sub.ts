import { Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { makeId, slugify } from "../utils/helpers";
import Entity from './Entity'
import Post from "./Post";
import User from "./User";


@TOEntity('subs')
export default class Sub extends Entity {
    constructor(sub: Partial<Sub>){
        super()
        Object.assign(this, sub)
    }

    @Index()
    @Column({ unique: true })
    name: string

    @Column()
    title: string

    @Column({ type: 'text'})
    description: string

    @Column()
    imageUrn: string

    @Column()
    bannerUrn: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username'})
    user: User;

    @OneToMany(() => Post, post => post.sub)
    posts: Post[]
}
