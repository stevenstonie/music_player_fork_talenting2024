using ATL;
using backend.exceptions;
using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService(IFileService fileService, ICacheService cacheService) : IMusicService
	{
		private readonly IFileService _fileService = fileService;
		private readonly ICacheService _cacheService = cacheService;
		private readonly string _extension = "MP3";

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

			if (!Path.GetExtension(songPath).Equals($".{_extension}", StringComparison.OrdinalIgnoreCase))
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
