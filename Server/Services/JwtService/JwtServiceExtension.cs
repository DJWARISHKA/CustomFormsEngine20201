using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Services.JwtService
{
    public static class JwtServiceExtension
    {
        public static void AddJwt(this IServiceCollection services, IConfigurationSection jwtSection)
        {
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = false;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = jwtSection["JwtIssuer"],
                        ValidAudience = jwtSection["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            if (!double.TryParse(jwtSection["JwtExpireDays"], out var expireDays))
                throw new ArgumentException("JwtExpireDays can't convert to double value!");

            var jwtHandler = new JwtService(jwtSection["JwtKey"], expireDays, jwtSection["JwtIssuer"]);
            services.AddSingleton(jwtHandler);
        }
    }
}