using backend.models;
using backend.services.interfaces;

namespace backend.services
{
	public class AlbumService(ICacheService cacheService) : IAlbumService
	{
		private readonly ICacheService _cacheService = cacheService;

		public IEnumerable<Song> GetAlbumSongs(string albumName)
		{
			return _cacheService.GetCachedSongs().Where(song => song.Album != null && song.Album.Equals(albumName, StringComparison.OrdinalIgnoreCase));
		}
	}
}