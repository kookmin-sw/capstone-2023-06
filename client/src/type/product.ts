import { UserData } from "./user";

export type ProductData = {
  id?: string;
  name: string;
  tags: string[];
  thumbnail: string;
  subThumbnail: string[];
  detail: string;
  price: string;
  content: string;
  brand: string;
};

export type CommentData = {
  user: UserData,
  comment: string,
}