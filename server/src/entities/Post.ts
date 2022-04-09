import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Upvote } from './Upvote';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property({ columnType: 'text' })
    body!: string;

    @ManyToOne()
    owner!: User;

    @OneToMany(() => Upvote, (upvote) => upvote.post, { nullable: true })
    upvotes!: Upvote;

    @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
    comments!: Comment;

    @Property()
    createdAt!: Date;

    @Property()
    updatedAt!: Date;
}
