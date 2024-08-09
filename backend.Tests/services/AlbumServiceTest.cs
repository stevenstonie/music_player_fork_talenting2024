
using backend.models;
using backend.services;
using backend.services.interfaces;
using Moq;

namespace backend.Tests.services
{
	public class AlbumServiceTest
	{
		private readonly AlbumService _albumService;

		private readonly Mock<ICacheService> _cacheServiceMock;

		public AlbumServiceTest()
		{
			_cacheServiceMock = new();

			_cacheServiceMock.Setup(cacheService => cacheService.GetCachedSongs()).Returns(ReturnTestSongs());

			_albumService = new(_cacheServiceMock.Object);
		}

		[Theory]
		[InlineData("Album 1")]
		[InlineData("Album 2")]
<<<<<<< Updated upstream
		public void GetAlbumSongs_ShouldReturnAllSongsByAlbum(string albumName)
=======
		public void GetAlbumSongs_ShouldReturnAllSongsOfAlbum(string albumName)
>>>>>>> Stashed changes
		{
			IEnumerable<Song> songs = _albumService.GetAlbumSongs(albumName);

			Assert.NotNull(songs);
			if (albumName == "Album 1") Assert.Equal(2, songs.Count());
			if (albumName == "Album 2") Assert.Single(songs);

			Assert.All(songs, song => Assert.Equal(albumName, song.Album));

			_cacheServiceMock.Verify(cacheService => cacheService.GetCachedSongs(), Times.Exactly(1));
		}

<<<<<<< Updated upstream
=======
		[Fact]
		public void GetAlbumSongs_ShouldReturnEmptyList_IfAlbumDoesNotExist()
		{
			IEnumerable<Song> songs = _albumService.GetAlbumSongs("Album 3");

			Assert.Empty(songs);
			_cacheServiceMock.Verify(cacheService => cacheService.GetCachedSongs(), Times.Exactly(1));
		}

>>>>>>> Stashed changes
		// ------------------------------------------------------------------------

		private static List<Song> ReturnTestSongs()
		{
			return [
				new Song
				{
					FileName = "file_name_1.mp3",
					Title="Title 1",
					Album="Album 1",
					CreationDate=new DateTime(2022, 1, 1, 0, 0,0 , DateTimeKind.Utc),
					Artist="Artist 1",
					Duration = 64
				},
				new Song
				{
					FileName = "file_name_2.mp3",
					Title="Title 2",
					Album="Album 2",
					CreationDate=new DateTime(2022, 1, 1, 0, 0,0 , DateTimeKind.Utc),
					Artist="Artist 2",
					Duration = 128
				},
				new Song{
					FileName = "file_name_3.mp3",
					Title="Title 3",
					Album="Album 1",
					CreationDate=new DateTime(2022, 1, 1, 0, 0,0 , DateTimeKind.Utc),
					Artist="Artist 3",
					Duration = 256
				}
			];
		}

	}
}