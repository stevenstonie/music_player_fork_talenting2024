using backend.models;

namespace backend.services.interfaces
{
	public interface ICacheService {
		List<Song> GetCachedSongs();

		Song ReturnSong(string filePath);
	}
}