
using backend.models;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [Route("api/music/artist")]
    [ApiController]
    public class ArtistController(IArtistService artistService) : ControllerBase
    {
        private readonly IArtistService _artistService = artistService;

        [HttpGet("{artistName}")]
        [ProducesResponseType(typeof(object), 200)]
        public ActionResult GetArtistDetails(string artistName)
        {
            var result = new
            {
                TopRatedSongs = _artistService.GetTopRatedSongsByArtist(artistName),
                Albums = _artistService.GetAlbumsByArtist(artistName)
            };

            return Ok(result);
        }
    }
}