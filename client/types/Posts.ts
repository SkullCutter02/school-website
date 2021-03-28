export type Post = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  title: string;
  body: string;
  views: number;
  images: string[];
};

export type Posts = {
  posts: Post[];
  hasMore: boolean;
};
