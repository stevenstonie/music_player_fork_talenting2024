
namespace backend.payloads
{
	public class ResponsePayload
	{
		public int StatusCode { get; set; }
		public required string Description { get; set; }
	}
}