
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		[ProducesResponseType(typeof(string), 200)]
		public IActionResult Get()
		{
			return Ok("good morning world!");
		}
	}
}