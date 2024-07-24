
namespace backend.models
{
	public class ResponsePayload(int status, string message)
	{
        public int Status { get; set; } = status;
		public string Message { get; set; } = message;
	}
}