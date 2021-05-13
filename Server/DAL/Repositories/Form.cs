using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class Form
    {
        private readonly Dao _context;

        public Form(IConfiguration configuration)
        {
            _context = new Dao(configuration);
        }

        //public Form(Dao db)
        //{
        //    _context = db;
        //}

        public async Task<IEnumerable<Entities.Form>> Get()
        {
            var forms = await _context.Forms.ToListAsync();
            return forms;
        }

        public async Task<Entities.Form> Get(int id)
        {
            var form = await _context.Forms.Where(f => f.Id == id).FirstOrDefaultAsync();
            return form;
        }

        public async Task<Entities.Form> Get(string url)
        {
            var form = await _context.Forms.Where(f => f.Url == url).FirstOrDefaultAsync();
            return form;
        }

        public async Task<Entities.Form> Create(Entities.Form form)
        {
            await _context.Forms.AddAsync(form);
            await _context.SaveChangesAsync();
            return form;
        }

        public async Task<Entities.Form> Update(Entities.Form newForm)
        {
            var form = await _context.Forms.FindAsync(newForm.Id);
            if (form == null) return null;
            if (newForm.Id != form.Id) return null;
            _context.Forms.Update(newForm);
            await _context.SaveChangesAsync();
            return newForm;
        }

        public bool Delete(int id)
        {
            var form = _context.Forms.Find(id);
            if (form == null)
                return false;

            _context.Forms.Remove(form);
            _context.SaveChanges();

            return true;
        }
    }
}