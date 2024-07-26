
export class Utils {
	static getImageUrlOrDefault(base64Image: string | null, defaultImagePath: string): string {
		return base64Image ? `data:image/jpeg;base64,${base64Image}` : defaultImagePath;
	}
}