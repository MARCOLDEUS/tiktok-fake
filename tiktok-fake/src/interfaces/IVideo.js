import { IUser } from "./IUser";
import { IComment } from "./IComment";
export interface IVideo {
  id: string;
  title: string;
  user: IUser;
  url: string;
  likes: string[]; // userIds
  comments: IComment[];
}