import { IVideo } from "./IVideo";
export interface ILikeService {
  like(video: IVideo, userId: string): void;
}