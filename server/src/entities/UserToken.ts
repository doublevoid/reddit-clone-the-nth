import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class UserToken {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  user!: User;

  @Property({ columnType: 'text' })
  token!: string;
}