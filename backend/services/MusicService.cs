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
	}
}