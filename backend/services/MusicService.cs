using ATL;
using backend.exceptions;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService : IMusicService
	{
		private readonly string _musicPath;
		private readonly string _extension = "MP3";
		private readonly List<Song> _cachedSongs;
		private readonly Random _random = new();

		public MusicService(string musicPath)
		{
			_musicPath = musicPath;

			if(!Directory.Exists(_musicPath))
			{
				Directory.CreateDirectory(_musicPath);
			}

			_cachedSongs = InitializeCache();
		}

		public IEnumerable<Song> GetSongs()
		{
			return _cachedSongs;
		}

		public IActionResult StreamSong(string fileName)
		{
			string songPath = Path.Combine(_musicPath, fileName);

			if(!File.Exists(songPath))
			{
				throw new ResourceNotFoundCustomException("Song not found.");
			}

			if(!Path.GetExtension(songPath).Equals($".{_extension}", StringComparison.OrdinalIgnoreCase))
			{
				throw new ExtensionNotSupportedCustomException("Extension not yet supported.");
			}

			FileStream stream = new(songPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);

			return new FileStreamResult(stream, $"audio/{_extension}") {
				EnableRangeProcessing = true
			};
		}

		public IEnumerable<Song> GetAlbumSongs(string albumName)
		{
			return _cachedSongs.Where(song => song.Album != null && song.Album.Equals(albumName, StringComparison.OrdinalIgnoreCase));
		}

		public IEnumerable<Song> GetTopRatedSongsByArtist(string artistName)
		{
			return _cachedSongs
				.Where(song => song.Artist != null && song.Artist.Equals(artistName, StringComparison.OrdinalIgnoreCase))
				.OrderByDescending(song => song.Rating)
				.Take(5);
		}

		public IEnumerable<string> GetAlbumsByArtist(string artistName)
		{
			return _cachedSongs
				.Where(song => song.Artist != null && song.Artist.Equals(artistName, StringComparison.OrdinalIgnoreCase))
				.Select(song => song.Album)
				.Where(album => album != null)
				.Distinct()
				.Cast<string>();
		}

		// ----------------------------------------------------------------------------

		private List<Song> InitializeCache()
		{
			string[] files = Directory.GetFiles(_musicPath);
			var songs = new List<Song>();

			foreach(string file in files.Where(file => Path.GetExtension(file).Equals($".{_extension}", StringComparison.OrdinalIgnoreCase)))
			{
				Track track = new(file);
				FileInfo fileInfo = new(file);
				PictureInfo? imageBinary = track.EmbeddedPictures.FirstOrDefault();
				double rating = Math.Round(_random.NextDouble() * 5, 2);

				var song = new Song {
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
