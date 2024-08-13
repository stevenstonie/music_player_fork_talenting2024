
using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [Route("api/music/album")]
    [ApiController]
    public class AlbumController(IAlbumService albumService) : ControllerBase
    {
        private readonly IAlbumService _albumService = albumService;

        [HttpGet("{albumName}")]
        public ActionResult<IEnumerable<Song>> GetAlbumSongs(string albumName)
        {
            return Ok(_albumService.GetAlbumSongs(albumName));
        }
    }
}