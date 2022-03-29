import { Entity, PrimaryKey, Property, OneToMany, ManyToOne } from "@mikro-orm/core";
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

  @OneToMany(() => Upvote, upvote => upvote.user)
  upvotes!: Upvote;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}