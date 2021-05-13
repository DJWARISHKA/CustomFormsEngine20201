using System;

namespace BLL.ViewModels
{
    public class ErrorLog
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; } // сообщение об исключении
        public string TargetSite { get; set; } // контроллер, где возникло исключение
        public string Data { get; set; } // действие, где возникло исключение
        public string StackTrace { get; set; } // стек исключения
        public DateTime Date { get; set; } // дата и время исключения
    }
}