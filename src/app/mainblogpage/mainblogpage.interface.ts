export interface Post {
  id: number;
  userId: number;
  postPhoto: string;
  title: string;
  text: string;
  tag: string;
  createdAt: string;
  user: User;
  comments: Comment;
}

export interface User {
  posts: any;
  status: string;
  birthDay: number;
  createdAt: string;
  education: string;
  email: string;
  id: number;
  location: string;
  name: string;
  password: string;
  profilePhoto: string;
  skills: string;
  userName: string;
  work: string;
}

export interface Comment {
  id: number;
  authorName: string;
  authorComment: string;
  postId: number;
  userId: number;
}
