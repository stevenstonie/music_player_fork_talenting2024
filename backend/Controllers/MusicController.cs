using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [Route("api/music")]
    [ApiController]
    public class MusicController(IMusicService musicService) : ControllerBase
    {
        private readonly IMusicService _musicService = musicService;

        [HttpGet("getAll")]
        public ActionResult<IEnumerable<Song>> GetSongs()
        {
            return Ok(_musicService.GetSongs());
        }

        [HttpGet("stream/{fileName}")]
        public IActionResult StreamSong(string fileName)
        {
            return _musicService.StreamSong(fileName);
        }
    }
}