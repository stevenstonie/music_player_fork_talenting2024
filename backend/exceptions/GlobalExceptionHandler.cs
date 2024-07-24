
using System.Net;
using System.Text.Json;
using backend.payloads;

namespace backend.exceptions
{
	public class GlobalExceptionHandler(RequestDelegate next)
	{
		private readonly RequestDelegate _next = next;

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (Exception ex)
			{
				await HandleExceptionAsync(context, ex);
			}
		}

		private static Task HandleExceptionAsync(HttpContext context, Exception exception)
		{
			ResponsePayload result;

			switch (exception)
			{
				case ResourceNotFoundCustomException:
					{
						result = new ResponsePayload
						{
							StatusCode = (int)HttpStatusCode.NotFound,
							Description = exception.Message
						};
						break;
					}
				default:
					{
						result = new ResponsePayload
						{
							StatusCode = (int)HttpStatusCode.InternalServerError,
							Description = exception.Message
						};
						break;
					}
			}

			var response = context.Response;
			response.ContentType = "application/json";
			response.StatusCode = result.StatusCode;

			return response.WriteAsync(JsonSerializer.Serialize(result));
		}
	}
}