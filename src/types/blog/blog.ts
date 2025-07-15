export interface IBlog {
  _id?: string;
  file?: string;
  writerId: string;
  writer: string;
  title?: string;
  tags?: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
