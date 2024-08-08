
using backend.config;
using backend.services;
using backend.services.interfaces;
using Microsoft.Extensions.Options;
using Moq;

namespace backend.Tests.services
{

	public class FileServiceTest
	{
		private readonly string _testPath = "test_path";
		private readonly string _testExtension = "test_extension";
		private readonly IFileService _fileService;
		private readonly Mock<IOptions<MusicConfig>> _musicConfigMock;

		public FileServiceTest()
		{
			_musicConfigMock = new();

			_musicConfigMock.Setup(config => config.Value).Returns(new MusicConfig
			{
				Path = _testPath,
				Extension = _testExtension
			});

			_fileService = new FileService(_musicConfigMock.Object);
		}

		[Fact]
		void Exists_ShouldReturnTrue_WhenFileExists()
		{
			string fileName = "existing_song.mp3";

			Mock<IFileService> mockFileService = new();
			mockFileService.Setup(fs => fs.Exists(fileName)).Returns(true);
			IFileService fileService = mockFileService.Object;

			bool exists = fileService.Exists(fileName);

			Assert.True(exists);

			mockFileService.Verify(fs => fs.Exists(fileName), Times.Once());
		}

		[Theory]
		[InlineData("")]
		[InlineData(null)]
		[InlineData("mp3")]
		[InlineData("mp4")]
		[InlineData("m4a")]
		void IsExtensionSupported_AllShouldReturnFalse(string extension)
		{
			Assert.False(_fileService.IsExtensionSupported(extension));
		}

		[Fact]
		void IsExtensionSupported_ShouldReturnTrue()
		{
			Assert.True(_fileService.IsExtensionSupported(_testExtension));
		}

	}
}