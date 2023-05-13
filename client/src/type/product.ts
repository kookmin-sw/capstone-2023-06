import { UserData } from "./user";

export type ProductData = {
  name: string;
  tags: string[];
  thumbnail: string;
  subThumbnail: string[];
  detail: string;
  price: string;
};

export type CommentData = {
  user: UserData,
  comment: string,
}