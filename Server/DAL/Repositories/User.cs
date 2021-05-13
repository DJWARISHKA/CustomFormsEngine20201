using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class User
    {
        private readonly Dao _context;

        public User(IConfiguration configuration)
        {
            _context = new Dao(configuration);
        }

        //public User(Dao db)
        //{
        //    _context = db;
        //}

        public async Task<IEnumerable<Entities.User>> Get()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<Entities.User> GetId(string id)
        {
            var user = await _context.Users
                .FirstAsync(uf => uf.Id == id);
            return user;
        }

        public async Task<Entities.User> Get(string email)
        {
            var users = await _context.Users
                .FirstAsync(uf => uf.Email == email);
            return users;
        }

        public async Task<Entities.User> Create(Entities.User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Entities.User> Update(Entities.User newUser)
        {
            var users = await _context.Users.FindAsync(newUser.Id);
            if (users == null) return null;
            if (newUser.Id != users.Id) return null;
            _context.Users.Update(newUser);
            await _context.SaveChangesAsync();
            return users;
        }

        public bool Delete(int id)
        {
            var users = _context.Users.Find(id);
            if (users == null)
                return false;

            _context.Users.Remove(users);
            _context.SaveChanges();

            return true;
        }
    }
}