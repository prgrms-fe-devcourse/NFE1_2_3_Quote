export interface Post {
  _id: string;
  category: string;
  title: string;
  content: string;
  quote: string;
  authorId: { nickname: string; _id : string };
  date: string;
  bookMarked: { [key: string]: string }[];
  createdAt: string;
  updatedAt: string;
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

export interface Comment {
  _id: string;
  author : string;
  contents : string;
  likeCount : number;
  info : string;
  createdAt: string;
  updatedAt: string;
}