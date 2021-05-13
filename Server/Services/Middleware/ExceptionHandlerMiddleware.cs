using System;
using System.Net;
using System.Threading.Tasks;
using BLL.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Services.Middleware
{
    public sealed class ExceptionHandlerMiddleware
    {
        private static IConfiguration _config;
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _config = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exp)
            {
                await HandleExceptionAsync(context, exp.GetBaseException());
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exp)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected
            var errorLogger = new ErrorLoggerAttribute(_config);
            errorLogger.OnException(exp, code);
            return Task.CompletedTask;
        }
    }
}