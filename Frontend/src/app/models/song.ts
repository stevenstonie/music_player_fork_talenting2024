import { SafeUrl } from "@angular/platform-browser";

export interface Song {
  fileName: string;
  title?: string;
  creationDate: Date;
  album?: string;
  isLiked: boolean;
  rating: number;
  artist?: string;
  duration: number;
  imageData?: Uint8Array;
  imageUrl?: SafeUrl;
}
