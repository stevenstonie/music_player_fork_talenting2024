using Microsoft.AspNetCore.Mvc;

namespace backend.tests
{

	[ApiController]
	[Route("/api/[controller]")]
	public class TestController : ControllerBase
	{
		[HttpGet("notImplemented")]
		public IActionResult Get()
		{
			throw new NotImplementedException("This is not implemented.");
		}

		[HttpGet("willReturnInternalServerError")]
		public IActionResult Get2()
		{
			throw new Exception("This is a default Exception.");
		}
	}
}