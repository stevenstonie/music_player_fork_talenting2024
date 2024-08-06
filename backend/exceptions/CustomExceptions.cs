namespace backend.exceptions
{
	public class ResourceNotFoundCustomException(string message) : Exception(message) { }

	public class ExtensionNotSupportedCustomException(string message) : Exception(message) { }
}