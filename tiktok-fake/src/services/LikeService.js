import { ILikeService } from "../interfaces/ILikeService";
import { IVideo } from "../interfaces/IVideo";
export class LikeService implements ILikeService {
  like(video: IVideo, userId: string): void {
    if (!video.likes.includes(userId)) {
      video.likes.push(userId);
    }
  }
}