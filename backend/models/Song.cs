
namespace backend.models
{
	public class Song
	{
		public required string FileName { get; set; }
		public string? Title { get; set; }
		public DateTime? CreationDate { get; set; }
		public string? Album { get; set; }
		public int Rating { get; set; }
		public string? Artist { get; set; }
	}
}