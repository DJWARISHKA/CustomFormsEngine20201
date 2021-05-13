using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class ErrorLog
    {
        private Dao context;
        //public ErrorLog(Dao db)
        //{
        //    this.context = db;
        //}

        public IEnumerable<Entities.ErrorLog> Get()
        {
            var ErrorLogs = context.ErrorLogs.ToList();
            return ErrorLogs;
        }
    }
}