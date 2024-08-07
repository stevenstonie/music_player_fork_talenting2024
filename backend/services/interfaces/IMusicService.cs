
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.services.interfaces
{
	public interface IMusicService
	{
		IEnumerable<Song> GetSongs();

		IActionResult StreamSong(string fileName);
	}
}