using backend.exceptions;
using backend.services;

namespace backend
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

			ConfigureServices(builder);

			WebApplication app = builder.Build();

			ConfigurePipelines(app);

			app.Run();
		}

		private static void ConfigurePipelines(WebApplication app)
		{
			app.UseCors("AllowSpecificOrigin");

			app.UseMiddleware<GlobalExceptionHandler>();

			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();
		}

		private static void ConfigureServices(WebApplicationBuilder builder)
		{
			builder.Services.AddCors(options =>
				{
					options.AddPolicy("AllowSpecificOrigin",
					policy =>
					{
						policy.WithOrigins("http://localhost:4200")
							.AllowAnyHeader()
							.AllowAnyMethod();
					});
				});

			builder.Services.AddControllers();
			builder.Services.AddTransient<MusicService>(provider => new MusicService("./../music"));

			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();
		}
	}
}
