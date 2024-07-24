using ATL;
using backend.exceptions;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService
	{
		private readonly string _musicPath;
		private readonly string extension = "mp3";

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
			.Where(song => Path.GetExtension(song).ToLower().Equals($".{extension}", comparisonType: StringComparison.OrdinalIgnoreCase))
			.Select(song =>
			{
				Track track = new(song);
				FileInfo fileInfo = new(song);

				return new Song
				{
					FileName = Path.GetFileNameWithoutExtension(fileInfo.Name),
					Title = track.Title,
					CreationDate = fileInfo.CreationTime,
					Album = track.Album != "" ? track.Album : null,
					Rating = 0,     // TODO: !!!
					Artist = track.Artist != "" ? track.Artist : null
				};
			});
		}

		// test getting all songs and searching for their name. be creative. lots of ASCII symbols

		public IActionResult StreamSong(string fileName)
		{
			string songPath = $"{_musicPath}/{fileName}.{extension}";

			if (!File.Exists(songPath))
			{
				throw new ResourceNotFoundCustomException("Song not found.");
			}

			FileStream stream;
			stream = new($"{_musicPath}/{fileName}.{extension}", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);

			return new FileStreamResult(stream, $"audio/{extension}")
			{
				EnableRangeProcessing = true
			};
		}
	}
}