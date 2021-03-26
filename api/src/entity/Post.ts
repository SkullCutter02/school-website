import { Entity, Column } from "typeorm";

import Model from "./Model";

@Entity("posts")
export default class Post extends Model {
  @Column()
  user: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  views: number;
}
