import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Upvote } from "./Upvote";
import { User } from "./User";
import { Post } from "./Post"

@Entity()
export class Comment {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  body!: string;

  @ManyToOne()
  owner!: User;

  @OneToMany(() => Upvote, upvote => upvote.comment)
  upvotes!: Upvote;

  @ManyToOne()
  post!: Post;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}