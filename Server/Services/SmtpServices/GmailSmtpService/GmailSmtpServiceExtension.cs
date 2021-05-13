using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Services.SmtpServices.GmailSmtpService
{
    public static class GmailSmtpServiceExtension
    {
        public static void AddGmailService(this IServiceCollection services, IConfigurationSection gmailSection)
        {
            ISmtpClient smtpClient = new GmailSmtpService(gmailSection["Email"], gmailSection["Password"]);
            services.AddSingleton(smtpClient);
        }
    }
}