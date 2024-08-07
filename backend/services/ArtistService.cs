using backend.models;
using backend.services.interfaces;

namespace backend.services
{
	public class ArtistService(ICacheService cacheService) : IArtistService
	{
		private readonly ICacheService _cacheService = cacheService;

		public IEnumerable<Song> GetTopRatedSongsByArtist(string artistName)
		{
			return _cacheService.GetCachedSongs()
				.Where(song => song.Artist != null && song.Artist.Equals(artistName, StringComparison.OrdinalIgnoreCase))
				.OrderByDescending(song => song.Rating)
				.Take(5);
		}
	}
}