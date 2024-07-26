
export class MusicUtils {
	static getImageUrl(base64Image: string | null): string {
		return base64Image ? `data:image/jpeg;base64,${base64Image}` : `assets/default-song-image.png`;
	}
}