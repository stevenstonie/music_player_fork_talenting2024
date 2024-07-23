using backend.models;

namespace backend.services
{
	public class MusicService(string musicPath)
	{
		private readonly string _musicPath = musicPath;

		public IEnumerable<Song> GetSongs() {
			return null;
		}
	}
}