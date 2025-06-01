import { IVideo } from "./IVideo";
import { IComment } from "./IComment";
export interface ICommentService {
  comment(video: IVideo, comment: IComment): void;
}