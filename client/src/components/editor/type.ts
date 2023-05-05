export type LINE_TYPE = {
  id: string;
  html: string;
  tag: React.ElementType;
  flag: number;
};

export type POSITION = {
  posX: number;
  posY: number;
};

export type Refer = POSITION & {
  id: string;
  data: string;
};

export type ImageData = {
  id: string;
  refers: Refer[];
  src: string;
};

export type ImagesObjectType = {
  [key: string]: ImageData;
};

export type ContentData = {
  content: LINE_TYPE[];
  images: ImagesObjectType;
};
export type UploadData = {
  title: string;
  thumbnail: string;
  hashtags: string[];
  content: ContentData;
};
