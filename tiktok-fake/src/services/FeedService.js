import { IVideo } from "../interfaces/IVideo";
export class FeedService {
  getFeed(videos: IVideo[]): IVideo[] {
    return videos.sort((a, b) => b.likes.length - a.likes.length);
  }
}