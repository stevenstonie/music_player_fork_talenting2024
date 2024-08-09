using backend.config;
using backend.exceptions;
using backend.models;
using backend.services;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;

namespace backend.Tests.services
{
	public class MusicServiceTest
	{
		private readonly MusicService _musicService;
		private readonly string _testPath = "test_path";
		private readonly string _testExtension = ".test_extension";
		private readonly Mock<IFileService> _fileServiceMock;
		private readonly Mock<ICacheService> _cacheServiceMock;
		private readonly Mock<IOptions<MusicConfig>> _musicConfigMock;

		public MusicServiceTest()
		{
			_fileServiceMock = new();
			_cacheServiceMock = new();
			_musicConfigMock = new();

			_musicConfigMock.Setup(config => config.Value).Returns(new MusicConfig
			{
				Path = _testPath,
				Extension = _testExtension
			});

			_musicService = new(_fileServiceMock.Object, _cacheServiceMock.Object, _musicConfigMock.Object);
		}

		[Fact]
		public void GetSongs_ShouldReturnAllSongs()
		{
			_cacheServiceMock.Setup(cacheService => cacheService.GetCachedSongs()).Returns(ReturnTestSongs());
			
			IEnumerable<Song> songs = _musicService.GetSongs();

			Assert.NotNull(songs);
			Assert.Equal(2, songs.Count());
		}

		[Fact]
		public void GetSongs_ShouldReturnAnEmptyList()
		{
			_cacheServiceMock.Setup(CacheService => CacheService.GetCachedSongs()).Returns([]);

			IEnumerable<Song> songs = _musicService.GetSongs();

			Assert.Empty(songs);
		}

		[Fact] // FIXME: test doesnt catch the custom exception when debugging it
		public void StreamSong_ShouldThrowException_WhenFileNotFound()
		{
			_fileServiceMock.Setup(fileService => fileService.GetPath(It.IsAny<string>())).Returns("random path to an absent file.");
			_fileServiceMock.Setup(fileService => fileService.Exists(It.IsAny<string>())).Returns(false);

			Assert.Throws<ResourceNotFoundCustomException>(() => _musicService.StreamSong("random song.mp3"));
		}

		[Fact]	// FIXME: same here
		public void StreamSong_ShouldThrowException_WhenExtensionIsNotSupported()
		{
			_fileServiceMock.Setup(fileService => fileService.Exists(It.IsAny<string>())).Returns(true);
			_fileServiceMock.Setup(fileService => fileService.IsExtensionSupported(It.IsAny<string>())).Returns(false);

			Assert.Throws<ExtensionNotSupportedCustomException>(() => _musicService.StreamSong("shine on you crazy diamond p1.mp3"));
		}
		// ---------------------------------------------------------------

		private List<Song> ReturnTestSongs()
		{
			string _testSongPath1 = $"{_testPath}/song1{_testExtension}";
			string _testSongPath2 = $"{_testPath}/song2{_testExtension}";

			return [
				new Song
				{
					FileName = _testSongPath1,
					Duration = 60
				},
				new Song
				{
					FileName = _testSongPath2,
					Duration = 120
				}
			];
		}
	}
}