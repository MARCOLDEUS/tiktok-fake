import { ICommentService } from "../interfaces/ICommentService";
import { IVideo } from "../interfaces/IVideo";
import { IComment } from "../interfaces/IComment";
export class CommentService implements ICommentService {
  comment(video: IVideo, comment: IComment): void {
    video.comments.push(comment);
  }
}