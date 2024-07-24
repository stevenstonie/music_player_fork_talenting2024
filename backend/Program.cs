using backend.exceptions;
using backend.services;

namespace backend
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

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

			var app = builder.Build();

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

			app.Run();
		}
	}
}
