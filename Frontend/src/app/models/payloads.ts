import { Song } from "./song";

export interface ResponsePayload {
	status: number;
	message: string;
}

export interface ArtistDetailsResponse {
	topRatedSongs: Song[];
	albums: string[];
}