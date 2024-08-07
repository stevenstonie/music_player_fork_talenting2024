using backend.services.interfaces;

namespace backend.services
{
	public class FileService(string musicPath) : IFileService
	{
		private readonly string _musicPath = musicPath;
		private readonly string _extension = "MP3";

		public string GetPath(string fileName)
		{
			return Path.Combine(_musicPath, fileName);
		}

		public bool Exists(string fileName)
		{
			return File.Exists(GetPath(fileName));
		}

		public bool IsExtensionSupported(string extension)
		{
			return extension.Equals(_extension, StringComparison.OrdinalIgnoreCase);
		}

		public FileStream GetFileStream(string fileName)
		{
			return new FileStream(GetPath(fileName), FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
		}
	}
}