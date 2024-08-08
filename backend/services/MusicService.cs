using backend.config;
using backend.exceptions;
using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.services
{
	public class MusicService(IFileService fileService, ICacheService cacheService, IOptions<MusicConfig> musicConfig) : IMusicService
	{
		private readonly IFileService _fileService = fileService;
		private readonly ICacheService _cacheService = cacheService;
		private readonly string _extension = musicConfig.Value.Extension;

		public IEnumerable<Song> GetSongs()
		{
			return _cacheService.GetCachedSongs();
		}

		public IActionResult StreamSong(string fileName)
		{
			string songPath = _fileService.GetPath(fileName);

			if (!File.Exists(songPath))
			{
				throw new ResourceNotFoundCustomException("Song not found.");
			}

			if (!_fileService.IsExtensionSupported(Path.GetExtension(songPath)))
			{
				throw new ExtensionNotSupportedCustomException("Extension not yet supported.");
			}

			FileStream stream = new(songPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);

			return new FileStreamResult(stream, $"audio/{_extension}")
			{
				EnableRangeProcessing = true
			};
		}
	}
}
