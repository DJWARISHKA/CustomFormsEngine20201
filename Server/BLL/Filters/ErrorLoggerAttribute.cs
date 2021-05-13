using System;
using System.Net;
using AutoMapper;
using BLL.ViewModels;
using DAL;
using Microsoft.Extensions.Configuration;

namespace BLL.Filters
{
    public class ErrorLoggerAttribute
    {
        private readonly Dao _context;
        private readonly IMapper _mapper;

        public ErrorLoggerAttribute(IConfiguration configuration)
        {
            _context = new Dao(configuration);
            _mapper =
                new MapperConfiguration(cfg => { cfg.CreateMap<ErrorLog, DAL.Entities.ErrorLog>(); }).CreateMapper();
        }

        public void OnException(Exception exp, HttpStatusCode code)
        {
            var errorLog = new ErrorLog
            {
                ExceptionMessage = exp.Message,
                StackTrace = exp.StackTrace,
                TargetSite = exp.TargetSite.ToString(),
                Data = exp.Data.ToString(),
                Date = DateTime.Now
            };

            _context.ErrorLogs.Add(_mapper.Map<ErrorLog, DAL.Entities.ErrorLog>(errorLog));
            _context.SaveChanges();
        }
    }
}