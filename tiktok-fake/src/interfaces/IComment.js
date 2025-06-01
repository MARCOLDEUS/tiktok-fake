import { IUser } from "./IUser";
export interface IComment {
  id: string;
  user: IUser;
  text: string;
}