import { Entity, PrimaryKey, Property, OneToMany, ManyToOne, Cascade } from "@mikro-orm/core";
import { Post } from "./Post";
import { Upvote } from "./Upvote";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ hidden: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @OneToMany(() => Upvote, upvote => upvote.user, {nullable: true})
  upvotes!: Upvote;

  @OneToMany(() => Post, post => post.owner, {nullable: true})
  posts!: Post;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}