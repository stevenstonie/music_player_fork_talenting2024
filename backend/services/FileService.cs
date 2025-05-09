using backend.config;
using backend.services.interfaces;
using Microsoft.Extensions.Options;

namespace backend.services
{
	public class FileService(IOptions<MusicConfig> musicConfig) : IFileService
	{
		private readonly string _musicPath = musicConfig.Value.Path;
		private readonly string _extension = musicConfig.Value.Extension;

		public string GetPath(string fileName)
		{
			return Path.Combine(_musicPath, fileName);
		}

		public string GetExtension(string fileName)
		{
			return Path.GetExtension(fileName);
		}

		public string[] GetFiles()
		{
			if (!Directory.Exists(_musicPath)) Directory.CreateDirectory(_musicPath);

			return Directory.GetFiles(_musicPath);
		}

		public bool Exists(string fileName)
		{
			return File.Exists(GetPath(fileName));
		}

		public bool IsExtensionSupported(string extension)
		{
			if (string.IsNullOrEmpty(extension)) return false;

			return extension.Equals(_extension, StringComparison.OrdinalIgnoreCase);
		}

		public FileStream GetFileStream(string fileName)
		{
			return new FileStream(GetPath(fileName), FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
		}

		public string GetSupportedExtension(){
			return _extension;
		}
	}
}