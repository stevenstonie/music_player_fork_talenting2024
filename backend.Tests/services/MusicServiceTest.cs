using backend.config;
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
			_cacheServiceMock.Setup(cacheService => cacheService.GetCachedSongs()).Returns(ReturnTestSongs());

			_musicService = new(_fileServiceMock.Object, _cacheServiceMock.Object, _musicConfigMock.Object);
		}

		[Fact]
		public void GetSongs_ShouldReturnAllSongs()
		{
			IEnumerable<Song> songs = _musicService.GetSongs();

			Assert.NotNull(songs);
			Assert.Equal(2, songs.Count());
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