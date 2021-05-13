namespace Services.SmtpServices
{
	public interface ISmtpClient
	{
		void SendMail(string to, string subject, string body);
	}
}
