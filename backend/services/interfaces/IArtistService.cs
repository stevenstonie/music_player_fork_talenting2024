using backend.models;

namespace backend.services.interfaces
{
	public interface IArtistService
	{
		IEnumerable<Song> GetTopRatedSongsByArtist(string artistName);
	}
}