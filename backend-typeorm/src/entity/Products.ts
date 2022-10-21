import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Products {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  product_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  // default = "Date.now"
  @Column()
  created?: Date;

  @Column()
  __v?: number = 0;
}

export const cloneProduct = (fields: any) => {
  const newObject = new Products();
  newObject.name = fields.name;
  fields.image && (newObject.image = fields.image);
  newObject.price = Number(fields.price);
  newObject.stock = Number(fields.stock);
  newObject.product_id = Number(fields.id);
  newObject.__v = 0;
  newObject.created = new Date();
  return newObject;
};
