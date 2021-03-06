import {
    Cascade,
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Upvote {
    @PrimaryKey()
    id!: number;

    @Property()
    positive!: boolean;

    @ManyToOne()
    user!: User;

    @ManyToOne({
        entity: () => Post,
        cascade: [Cascade.REMOVE],
        nullable: true,
    })
    post!: Post;

    @ManyToOne({
        entity: () => Comment,
        cascade: [Cascade.REMOVE],
        nullable: true,
    })
    comment!: Comment;
}
