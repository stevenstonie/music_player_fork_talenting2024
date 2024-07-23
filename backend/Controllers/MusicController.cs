using backend.models;
using backend.services;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MusicController (MusicService musicService) : ControllerBase {
		private readonly MusicService _musicService = musicService;

		[HttpGet("list")]
		public ActionResult<IEnumerable<Song>> GetSongs() {
			return Ok(_musicService.GetSongs());
		}

		[HttpGet("stream/{fileName}")]
		public IActionResult StreamSongTest(string fileName) {
			return _musicService.StreamSongTest(fileName);
		}
	}
}