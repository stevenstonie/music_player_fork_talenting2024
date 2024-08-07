using backend.models;
using backend.services;
using backend.services.interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [Route("api/music")]
    [ApiController]
    public class MusicController(IMusicService musicService, IAlbumService albumService, IArtistService artistService) : ControllerBase
    {
        private readonly IMusicService _musicService = musicService;
        private readonly IAlbumService _albumService = albumService;
        private readonly IArtistService _artistService = artistService;

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

        [HttpGet("album/{albumName}")]
        public ActionResult<IEnumerable<Song>> GetAlbumSongs(string albumName)
        {
            return Ok(_albumService.GetAlbumSongs(albumName));
        }

        [HttpGet("artist/{artistName}")]
        public ActionResult GetArtistDetails(string artistName)
        {
            var topRatedSongs = _artistService.GetTopRatedSongsByArtist(artistName);
            var albums = _albumService.GetAlbumsByArtist(artistName);

            var result = new
            {
                TopRatedSongs = topRatedSongs,
                Albums = albums
            };

            return Ok(result);
        }
    }
}