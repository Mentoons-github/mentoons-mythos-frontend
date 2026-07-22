export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface Product2 {
  _id: string;
  title: string;
  price: number;
  thumbnails: string[];
  pages: number;
  size: string;
  description: string;
  offerPrice: number;
  data: string;
}

export interface addProductPayload {
  title: string;
  price: number;
  thumbnails: string[];
  pages: number;
  size: string;
}
