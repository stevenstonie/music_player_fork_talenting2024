using backend.models;
using backend.services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
	[Route("api/music")]
	[ApiController]
	public class MusicController (MusicService musicService) : ControllerBase {
		private readonly MusicService _musicService = musicService;

		[HttpGet("getAll")]
		public ActionResult<IEnumerable<Song>> GetSongs() {
			return Ok(_musicService.GetSongs());
		}

		[HttpGet("stream/{fileName}")]
		public IActionResult StreamSong(string fileName) {
			return _musicService.StreamSong(fileName);
		}

		[HttpGet("album/{albumName}")]
		public ActionResult<IEnumerable<Song>> GetAlbumSongs(string albumName) {
            return Ok(_musicService.GetAlbumSongs(albumName));
        }

        [HttpGet("artist/{artistName}")]
        public ActionResult GetArtistDetails(string artistName)
        {
            var topRatedSongs = _musicService.GetTopRatedSongsByArtist(artistName);
            var albums = _musicService.GetAlbumsByArtist(artistName);

            var result = new
            {
                TopRatedSongs = topRatedSongs,
                Albums = albums
            };

            return Ok(result);
        }
    }
}