using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class User_form
    {
        private readonly Dao _context;

        public User_form(IConfiguration configuration)
        {
            _context = new Dao(configuration);
        }

        //public User_form(Dao db)
        //{
        //    _context = db;
        //}

        public async Task<IEnumerable<Entities.User_form>> Get()
        {
            var users_forms = await _context.Users_forms.ToListAsync();
            return users_forms;
        }

        public async Task<Entities.User_form> Get(string userId, int formId)
        {
            var users_forms = await _context.Users_forms
                .FirstAsync(uf => uf.User_id == userId && uf.Form_id == formId);
            return users_forms;
        }

        public async Task<Entities.User_form> Get(string userId, string formUrl)
        {
            var form = await _context.Forms.FirstAsync(f => f.Url == formUrl);
            var users_forms = await _context.Users_forms
                .FirstAsync(uf => uf.User_id == userId && uf.Form_id == form.Id);
            return users_forms;
        }

        public async Task<IEnumerable<Entities.User_form>> Get(string userId)
        {
            var users_forms = await _context.Users_forms
                .Where(uf => uf.User_id == userId).ToListAsync();
            return users_forms;
        }

        public async Task<IEnumerable<Entities.User_form>> Get(int formId)
        {
            var users_forms = await _context.Users_forms
                .Where(uf => uf.Form_id == formId).ToListAsync();
            return users_forms;
        }

        public async Task<Entities.User_form> Create(Entities.User_form users_forms)
        {
            await _context.Users_forms.AddAsync(users_forms);
            await _context.SaveChangesAsync();
            return users_forms;
        }

        public async Task<Entities.User_form> Update(Entities.User_form newUF)
        {
            var users_forms = await _context.Users_forms.FindAsync(newUF.Id);
            if (users_forms == null) return null;
            if (newUF.Id != users_forms.Id) return null;
            _context.Users_forms.Update(newUF);
            await _context.SaveChangesAsync();
            return users_forms;
        }

        public bool Delete(int id)
        {
            var users_forms = _context.Users_forms.Find(id);
            if (users_forms == null)
                return false;

            _context.Users_forms.Remove(users_forms);
            _context.SaveChanges();

            return true;
        }
    }
}