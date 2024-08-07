using ATL;
using backend.config;
using backend.models;
using backend.services.interfaces;
using Microsoft.Extensions.Options;

namespace backend.services
{
	public class CacheService (IOptions<MusicConfig> musicConfig) : ICacheService
	{
		private readonly string _musicPath = musicConfig.Value.Path;
		private readonly string _extension = musicConfig.Value.Extension;
		private readonly Random _random = new();

		public List<Song> GetCachedSongs()
		{
			string[] files = Directory.GetFiles(_musicPath);
			var songs = new List<Song>();

			foreach (string file in files.Where(file => Path.GetExtension(file).Equals($".{_extension}", StringComparison.OrdinalIgnoreCase)))
			{
				Track track = new(file);
				FileInfo fileInfo = new(file);
				PictureInfo? imageBinary = track.EmbeddedPictures.FirstOrDefault();
				double rating = Math.Round(_random.NextDouble() * 5, 2);

				var song = new Song
				{
					FileName = Path.GetFileName(fileInfo.Name),
					Title = track.Title,
					CreationDate = fileInfo.CreationTime,
					Album = !string.IsNullOrEmpty(track.Album) ? track.Album : null,
					Rating = rating,
					Artist = !string.IsNullOrEmpty(track.Artist) ? track.Artist : null,
					Duration = track.Duration,
					ImageData = imageBinary?.PictureData
				};

				songs.Add(song);
			}

			return songs;
		}
	}
}