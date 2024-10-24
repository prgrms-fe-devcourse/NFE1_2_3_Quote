export interface Post {
  _id: string;
  category: string;
  title: string;
  content: string;
  quote: string;
  author: string;
  authorId: string;
  date: string;
  bookMarked: { [key: string]: string }[];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface UserMe {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  profileImage: string;
  myPosts: Post[];
  bookMarkedPosts: Post[];
}
