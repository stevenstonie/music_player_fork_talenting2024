namespace backend.services.interfaces
{
	public interface IFileService{
		bool Exists(string fileName);

		string GetPath(string fileName);

		bool IsExtensionSupported(string extension);

		FileStream GetFileStream(string fileName);
	}
}