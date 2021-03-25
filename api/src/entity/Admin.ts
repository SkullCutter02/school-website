import { Column, Entity } from "typeorm";
import Model from "./Model";

@Entity("users")
export default class Admin extends Model {
  @Column()
  username: string;

  @Column()
  hash: string;
}
