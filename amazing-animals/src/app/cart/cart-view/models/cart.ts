import { Product } from '../../../product/models/product';

export interface Cart {
  product: Product;
  quantity: number;
}
