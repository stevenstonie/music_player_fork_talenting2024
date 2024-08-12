using backend.models;

namespace backend.services.interfaces
{
	public interface IAlbumService
	{
		IEnumerable<Song> GetAlbumSongs(string albumName);
	}
}