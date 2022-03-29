import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Upvote } from "./Upvote";
import { User } from "./User";
import { Comment } from "./Comment";

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

  @OneToMany(() => Upvote, upvote => upvote.post)
  upvotes!: Upvote;

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}