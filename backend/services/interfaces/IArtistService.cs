using backend.models;

namespace backend.services.interfaces
{
	public interface IArtistService
	{
		IEnumerable<string> GetAlbumsByArtist(string artistName);
		
		IEnumerable<Song> GetTopRatedSongsByArtist(string artistName);
	}
}