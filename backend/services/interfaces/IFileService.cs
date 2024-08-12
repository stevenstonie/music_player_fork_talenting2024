namespace backend.services.interfaces
{
	public interface IFileService{
		bool Exists(string fileName);

		string GetPath(string fileName);

		string[] GetFiles();

		bool IsExtensionSupported(string extension);

		FileStream GetFileStream(string fileName);

		string GetSupportedExtension();
	}
}