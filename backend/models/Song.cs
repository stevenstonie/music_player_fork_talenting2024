
namespace backend.models
{
	public class Song
	{
		public required string FileName { get; set; }
		public DateTime CreationDate { get; set; }
		public string? Album { get; set; }
		public double Rating { get; set; }
		public string? Author { get; set; }
	}
}