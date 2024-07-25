using ATL;
using backend.exceptions;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService
	{
		private readonly string _musicPath;
		private readonly string extension = "MP3";

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
			string[] files = Directory.GetFiles(_musicPath);

			return files
				.Where(file => Path.GetExtension(file).Equals($".{extension}", comparisonType: StringComparison.OrdinalIgnoreCase))
				.Select(song =>
				{
					Track track = new(song);
					FileInfo fileInfo = new(song);
					PictureInfo? imageBinary = track.EmbeddedPictures.FirstOrDefault();

					return new Song
					{
						FileName = Path.GetFileNameWithoutExtension(fileInfo.Name),
						Title = track.Title,
						CreationDate = fileInfo.CreationTime,
						Album = track.Album != "" ? track.Album : null,
						Rating = 0,     // TODO: !!!
						Artist = track.Artist != "" ? track.Artist : null,
						Duration = track.Duration,
						ImageData = imageBinary?.PictureData
					};
				});
		}

		// test getting all songs and searching for their name. be creative. lots of ASCII symbols and stuff.

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