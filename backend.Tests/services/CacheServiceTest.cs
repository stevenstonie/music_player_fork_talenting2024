
using backend.config;
using backend.services;
using backend.services.interfaces;
using Microsoft.Extensions.Options;
using Moq;

namespace backend.Tests.services
{
	public class CacheServiceTest
	{
		private readonly ICacheService _cacheService;
		private readonly Mock<IOptions<MusicConfig>> _musicConfigMock;
		private readonly string _testPath = "test_path";
		private readonly string _testExtension = "test_extension";

		public CacheServiceTest()
		{
			_musicConfigMock = new Mock<IOptions<MusicConfig>>();

			_musicConfigMock.Setup(config => config.Value).Returns(new MusicConfig
			{
				Path = _testPath,
				Extension = _testExtension
			});

			_cacheService = new CacheService(_musicConfigMock.Object);
		}

		[Fact]
		void GetCachedSongs() {
			
		}
	}
}