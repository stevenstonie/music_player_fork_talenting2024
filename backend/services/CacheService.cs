using ATL;
using backend.config;
using backend.models;
using backend.services.interfaces;
using Microsoft.Extensions.Options;

namespace backend.services
{
	public class CacheService(IOptions<MusicConfig> musicConfig, IFileService fileService) : ICacheService
	{
		private readonly string _extension = musicConfig.Value.Extension;
		private readonly IFileService _fileService = fileService;
		private readonly Random _random = new();

		public List<Song> GetCachedSongs()
		{
			string[] files = _fileService.GetFiles();
			List<Song> songs = [];

			foreach (string file in files.Where(file => Path.GetExtension(file).Equals($"{_extension}", StringComparison.OrdinalIgnoreCase)))
			{
				Song song = ReturnSong(file);

				songs.Add(song);
			}

			return songs;
		}

		public Song ReturnSong(string filePath)
		{
			Track track = new(filePath);
			FileInfo fileInfo = new(filePath);
			PictureInfo? imageBinary = track.EmbeddedPictures.FirstOrDefault();
			double rating = Math.Round(_random.NextDouble() * 4 + 1, 2);

			return new Song
			{
				FileName = filePath,
				Artist = track.Artist,
				Album = track.Album,
				Rating = rating
			};
		}
	}
}