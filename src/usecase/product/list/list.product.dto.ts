export interface InputListProductDto {}

type ProductOutput = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: ProductOutput[];
}
