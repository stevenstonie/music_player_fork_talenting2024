import { DEFAULT_SONG_IMAGE_PATH } from "../../app.config";

export class Utils {
	static getImageUrlOrDefault(base64Image: string | null, defaultImagePath: string): string {
		return base64Image ? `data:image/jpeg;base64,${base64Image}` : defaultImagePath;
	}

	static handleImageError(): string {
		return Utils.getImageUrlOrDefault(null, DEFAULT_SONG_IMAGE_PATH);
	}

	static getDurationStringFromSeconds(seconds: number): string {
		if (seconds < 60 && seconds >= 0) {
			return `${seconds}s`;
		}
		if (seconds < 0) {
			return '0s';
		}

		const h = Math.floor(seconds / 3600);
		const min = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;

		return `${h ? `${h}h ` : ''}${min}m ${s}s`;
	}
}