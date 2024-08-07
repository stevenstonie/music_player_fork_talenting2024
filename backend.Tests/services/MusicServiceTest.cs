using backend.exceptions;
using backend.models;
using backend.services;
using backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.services
{
	public class MusicServiceTest
	{
		[Fact]
		public void GetSongs_ShouldReturnAllSongs()
		{
			Mock<IMusicService> musicServiceMock = new();
			musicServiceMock.Setup(musicService => musicService.GetSongs()).Returns(new List<Song>()
			{
				new() { FileName = "song1.mp3", Title = "Test song 1", CreationDate = DateTime.Now, Album = "album1", Rating = 5, Artist = "artist1", Duration = 50, ImageData = [] },
				new() { FileName = "song2.mp3", Title = "Test song 2", CreationDate = DateTime.Now, Album = "album2", Rating = 3, Artist = "artist2", Duration = 60, ImageData = [] },
			}.AsEnumerable());

			IEnumerable<Song> songs = musicServiceMock.Object.GetSongs();

			Assert.NotNull(songs);
			Assert.Equal(2, songs.Count());
			Assert.Equal("song1.mp3", songs.ElementAt(0).FileName);
			Assert.Equal(60, songs.ElementAt(1).Duration);
		}

		[Fact]
		public void StreamSong_ShouldReturnStream()
		{
			Mock<IMusicService> musicServiceMock = new();
			FileStreamResult fileStreamResult = new(new MemoryStream(), "audio/mpeg");
			musicServiceMock.Setup(musicService => musicService.StreamSong(It.IsAny<string>())).Returns(fileStreamResult);

			IActionResult streamedSong = musicServiceMock.Object.StreamSong("song1.mpeg");

			Assert.IsType<FileStreamResult>(streamedSong);
			musicServiceMock.Verify(musicService => musicService.StreamSong(It.IsAny<string>()), Times.Once);
		}
	}
}