using backend.models;
using backend.services;
using Moq;

namespace backend.Tests.services
{
	public class MusicServiceTest
	{
		[Fact]
		public void GetSongs_ShouldReturnAllSongs()
		{
			Mock<IMusicService> mockMusicService = new();
			mockMusicService.Setup(musicService => musicService.GetSongs()).Returns(new List<Song>()
			{
				new() { FileName = "song1.mp3", Title = "Test song 1", CreationDate = DateTime.Now, Album = "album1", Rating = 5, Artist = "artist1", Duration = 50, ImageData = [] },
				new() { FileName = "song2.mp3", Title = "Test song 2", CreationDate = DateTime.Now, Album = "album2", Rating = 3, Artist = "artist2", Duration = 60, ImageData = [] },
			}.AsEnumerable());

			IEnumerable<Song> songs = mockMusicService.Object.GetSongs();

			Assert.NotNull(songs);
			Assert.Equal(2, songs.Count());
			Assert.Equal("song1.mp3", songs.ElementAt(0).FileName);
			Assert.Equal(60, songs.ElementAt(1).Duration);
		}
	}
}