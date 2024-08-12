using backend.config;
using backend.exceptions;
using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.services
{
	public class MusicService(IFileService fileService, ICacheService cacheService) : IMusicService
	{
		private readonly IFileService _fileService = fileService;
		private readonly ICacheService _cacheService = cacheService;

		public IEnumerable<Song> GetSongs()
		{
			return _cacheService.GetCachedSongs();
		}

		public IActionResult StreamSong(string fileName)
		{
			string songPath = _fileService.GetPath(fileName);

			if (!_fileService.Exists(songPath))
			{
				throw new ResourceNotFoundCustomException("Song not found.");
			}

			if (!_fileService.IsExtensionSupported(Path.GetExtension(songPath)))
			{
				throw new ExtensionNotSupportedCustomException($"Extension not yet supported. ({Path.GetExtension(songPath)})");
			}

			FileStream stream = new(songPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);

			return new FileStreamResult(stream, $"audio/{_fileService.GetSupportedExtension()}")
			{
				EnableRangeProcessing = true
			};
		}
	}
}
