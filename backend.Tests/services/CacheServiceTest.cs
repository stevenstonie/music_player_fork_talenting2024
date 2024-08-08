
using backend.config;
using backend.models;
using backend.services;
using backend.services.interfaces;
using Microsoft.Extensions.Options;
using Moq;

namespace backend.Tests.services
{
	public class CacheServiceTest
	{
		private readonly CacheService _cacheService;
		private readonly string _testPath = "test_path";
		private readonly string _testExtension = ".test_extension";
		private readonly Mock<IOptions<MusicConfig>> _musicConfigMock;
		private readonly Mock<IFileService> _fileServiceMock;


		public CacheServiceTest()
		{
			_fileServiceMock = new();
			_musicConfigMock = new();

			_musicConfigMock.Setup(config => config.Value).Returns(new MusicConfig
			{
				Path = _testPath,
				Extension = _testExtension
			});
			_fileServiceMock.Setup(fs => fs.GetFiles()).Returns(ReturnTestSongPaths());
			
			_cacheService = new(_musicConfigMock.Object, _fileServiceMock.Object);
		}

		[Fact]
		public void ReturnSong_ShouldReturnSong()
		{
			Song song1 = _cacheService.ReturnSong(ReturnTestSongPaths()[0]);
			Song song2 = _cacheService.ReturnSong(ReturnTestSongPaths()[1]);

			Assert.NotNull(song1);
			Assert.Equal(ReturnTestSongPaths()[0], song1.FileName);
			Assert.InRange(song1.Rating, 1, 5);
			Assert.NotNull(song2);
			Assert.Equal(ReturnTestSongPaths()[1], song2.FileName);
			Assert.InRange(song2.Rating, 1, 5);
		}

		[Fact]
		public void GetCachedSongs_ShouldReturnSongs()
		{
			List<Song> songs = _cacheService.GetCachedSongs();

			Assert.NotNull(songs);
			Assert.Equal(2, songs.Count);
			Assert.Equal(ReturnTestSongPaths()[0], songs[0].FileName);
			Assert.Equal(ReturnTestSongPaths()[1], songs[1].FileName);
		}

		[Fact]
		public void GetCachedSongs_ShouldReturnEmptyList_IfExtensionIsNotSupported(){
			string[] testSongPaths = ["test_path/song1.mp3", "test_path/song2.mp4"];

			_fileServiceMock.Setup(fs => fs.GetFiles()).Returns(testSongPaths);

			List<Song> songs = _cacheService.GetCachedSongs();

			Assert.Empty(songs);
		}

		// -----------------------------------------------------

		private string[] ReturnTestSongPaths()
		{
			string _testSongPath1 = $"{_testPath}/song1{_testExtension}";
			string _testSongPath2 = $"{_testPath}/song2{_testExtension}";

			return [_testSongPath1, _testSongPath2];
		}
	}
}