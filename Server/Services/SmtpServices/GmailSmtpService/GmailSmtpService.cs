using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Logging;

namespace Services.SmtpServices.GmailSmtpService
{
    public class GmailSmtpService : ISmtpClient
    {
        private const string GmailServerName = "smtp.gmail.com";
        private readonly string _email;
        private readonly ILogger<GmailSmtpService> _logger;
        private readonly string _password;

        public GmailSmtpService(string email, string password)
        {
            _email = email;
            _password = password;
        }

        public void SendMail(string to, string subject, string body)
        {
            var message = new MailMessage();
            message.From = new MailAddress(_email);
            message.To.Add(to);
            message.Subject = subject;
            message.Body = $"{body}";

            try
            {
                using var smtp = new SmtpClient(GmailServerName, 587);
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(_email, _password);
                smtp.EnableSsl = true;
                smtp.Send(message);
            }
            catch (Exception ex)
            {
            }
        }
    }
}