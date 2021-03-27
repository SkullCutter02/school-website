type Post = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  title: string;
  body: string;
  views: number;
};

export type Posts = {
  posts: Post[];
  hasMore: boolean;
};
