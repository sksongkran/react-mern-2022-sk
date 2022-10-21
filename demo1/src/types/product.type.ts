export interface Product {
  __v?: number;
  _id?: string;
  product_id?: number;
  name: string;
  image?: string;
  file?: any;
  qty?: number;
  file_obj?: string;
  stock: number | string;
  price: number | string;
  created?: Date;
}
