import { Column, Entity } from "typeorm";

import Model from "./Model";

@Entity("videos")
export default class Video extends Model {
  @Column()
  link: string;
}
