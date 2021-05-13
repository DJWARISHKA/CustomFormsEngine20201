using DAL;
using Microsoft.Extensions.Logging;

namespace BLL
{
    public class UserRepository
    {
        private readonly Dao _db;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(ILogger<UserRepository> logger, Dao db)
        {
            _logger = logger;
            _db = db;
        }
    }
}