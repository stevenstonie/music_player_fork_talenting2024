
using System.Net;
using System.Text.Json;
using backend.models;

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
						result = new((int)HttpStatusCode.NotFound, exception.Message);
						break;
					}
				default:
					{
						result = new((int)HttpStatusCode.InternalServerError, exception.Message);
						break;
					}
			}

			var response = context.Response;
			response.ContentType = "application/json";
			response.StatusCode = result.Status;

			return response.WriteAsync(JsonSerializer.Serialize(result));
		}
	}
}