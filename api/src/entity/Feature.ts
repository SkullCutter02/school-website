import { Column, Entity } from "typeorm";

import Model from "./Model";

@Entity("features")
export default class Feature extends Model {
  @Column()
  title: string;

  @Column()
  body: string;
}
