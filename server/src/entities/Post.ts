import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Upvote } from "./Upvote";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @ManyToOne()
  owner!: User;

  @OneToMany(() => Upvote, upvote => upvote.post)
  upvotes!: Upvote;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}