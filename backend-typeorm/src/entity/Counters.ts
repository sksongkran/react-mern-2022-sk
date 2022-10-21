import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Counters {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column({ nullable: true })
  reference_value: string;

  @Column()
  seq: number;
}
