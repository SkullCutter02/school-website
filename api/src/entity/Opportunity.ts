import { Column, Entity } from "typeorm";

import Model from "./Model";

@Entity("opportunities")
export default class Opportunity extends Model {
  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contactEmail: string;
}
