
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services
{
	public interface IMusicService
	{
		IEnumerable<Song> GetSongs();

		IActionResult StreamSong(string fileName);

		IEnumerable<Song> GetAlbumSongs(string albumName);

		IEnumerable<Song> GetTopRatedSongsByArtist(string artistName);

		IEnumerable<string> GetAlbumsByArtist(string artistName);
	}
}