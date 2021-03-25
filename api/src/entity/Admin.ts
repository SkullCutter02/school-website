import { Column, Entity, Unique } from "typeorm";
import Model from "./Model";

@Entity("admin")
@Unique(["username"])
export default class Admin extends Model {
  @Column()
  username: string;

  @Column()
  hash: string;

  toJSON(): any {
    return { ...this, id: undefined, hash: undefined };
  }
}
