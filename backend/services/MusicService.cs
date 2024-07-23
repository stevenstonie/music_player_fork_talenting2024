using ATL;
using backend.models;

namespace backend.services
{
	public class MusicService(string musicPath)
	{
		private readonly string _musicPath = musicPath;

		public IEnumerable<Song> GetSongs()
		{
			var songs = Directory.GetFiles(_musicPath);

			return songs.Select(song =>
			{
				var track = new Track(song);

				return new Song
				{
					FileName = Path.GetFileName(song),
					CreationDate = track.Date ?? DateTime.Now,
					Album = track.Album,
					// Rating = track.Rating,
					Author = track.Artist
				};
			});
		}
	}
}