using ATL;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService
	{
		private readonly string _musicPath;

		public MusicService(string musicPath)
		{
			_musicPath = musicPath;

			if (!Directory.Exists(_musicPath))
			{
				Directory.CreateDirectory(_musicPath);
			}
		}

		public IEnumerable<Song> GetSongs()
		{
			string[] songs = Directory.GetFiles(_musicPath);

			return songs
			.Where(song => Path.GetExtension(song).ToLower().Equals(".mp3", comparisonType: StringComparison.OrdinalIgnoreCase))
			.Select(song =>
			{
				Track track = new(song);
				FileInfo fileInfo = new(song);

				return new Song
				{
					FileName = track.Title,
					CreationDate = fileInfo.CreationTime,
					Album = track.Album != "" ? track.Album : null,
					Rating = 0,     // TODO: !!!
					Artist = track.Artist != "" ? track.Artist : null
				};
			});
		}

		public IActionResult StreamSongTest(string fileName)
		{
			FileStream stream;
			try
			{
				stream = new($"{_musicPath}/{fileName}.mp3", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
			}
			catch (FileNotFoundException)
			{
				return new NotFoundResult();
			}

			return new FileStreamResult(stream, "audio/mp3")
			{
				EnableRangeProcessing = true
			};
		}
	}
}