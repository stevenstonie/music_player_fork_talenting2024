using backend.models;
using backend.services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
	[Route("api/music")]
	[ApiController]
	[EnableCors("AllowSpecificOrigin")]
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
	}
}