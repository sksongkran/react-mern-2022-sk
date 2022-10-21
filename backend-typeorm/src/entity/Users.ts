import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  // default = "normal"
  @Column()
  level?: string;

  // default = "Date.now"
  @Column()
  created?: Date;

  @Column()
  __v?: number = 0;  
}
