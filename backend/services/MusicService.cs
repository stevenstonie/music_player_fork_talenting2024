using ATL;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public class MusicService(string musicPath)
	{
		private readonly string _musicPath = musicPath;

		public IEnumerable<Song> GetSongs()
		{
			string[] songs = Directory.GetFiles(_musicPath);

			return songs.Select(song =>
			{
				Track track = new(song);
				FileInfo fileInfo = new(song);

				return new Song
				{
					FileName = fileInfo.Name,
					CreationDate = fileInfo.CreationTimeUtc,
					Album = track.Album != "" ? track.Album : null,
					Rating = 0,     // TODO: !!!
					Artist = track.Artist != "" ? track.Artist : null
				};
			});
		}

		// TODO: check if the path exists in all cases

		public IActionResult StreamSongTest(string fileName)
		{
			FileStream stream = new($"{_musicPath}/{fileName}", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);

			return new FileStreamResult(stream, "audio/mp3")
			{
				EnableRangeProcessing = true
			};
		}
	}
}