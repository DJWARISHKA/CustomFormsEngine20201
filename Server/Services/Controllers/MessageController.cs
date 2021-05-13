using System;
using System.Globalization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Services.Models;
using Services.SmtpServices.GmailSmtpService;

namespace Services.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly GmailSmtpService _email;

        public MessageController()
        {
            _email = new GmailSmtpService("CustomFormsEngine2020@gmail.com", "$$$$uperStrongPass_123_");
        }

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                    RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    var domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        [HttpPost]
        public IActionResult Send(MessageModel message)
        {
            var emails = message.Emails.Split("\n", StringSplitOptions.RemoveEmptyEntries);
            foreach (var email in emails)
                if (IsValidEmail(email.Trim()))
                    _email.SendMail(email.Trim(), message.Title, message.Text);
                else
                    return BadRequest();
            return Ok();
        }
    }
}