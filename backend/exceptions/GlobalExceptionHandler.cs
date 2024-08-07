
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
			ResponsePayload result = GetPayloadFromException(exception);

			var response = context.Response;
			response.ContentType = "application/json";
			response.StatusCode = result.Status;

			return response.WriteAsync(JsonSerializer.Serialize(result));
		}

		private static ResponsePayload GetPayloadFromException(Exception exception)
		{
			switch (exception)
			{
				case ResourceNotFoundCustomException:
					{
						return new((int)HttpStatusCode.NotFound, exception.Message);
					}
				case ExtensionNotSupportedCustomException:
					{
						return new((int)HttpStatusCode.UnsupportedMediaType, exception.Message);
					}
				default:
					{
						return new((int)HttpStatusCode.InternalServerError, exception.Message);
					}
			}
		}
	}
}