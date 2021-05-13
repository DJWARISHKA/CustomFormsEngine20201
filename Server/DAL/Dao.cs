using DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL
{
    public class Dao : IdentityDbContext<User>
    {
        private readonly IConfiguration _configuration;

        public Dao(IConfiguration configuration)
        {
            _configuration = configuration;
            Database.EnsureCreated();
        }

        //public Dao(DbContextOptions<Dao> options)
        //    : base(options)
        //{
        //    Database.EnsureCreated();
        //}

        public Dao()
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Form> Forms { get; set; }
        public DbSet<User_form> Users_forms { get; set; }
        public DbSet<ErrorLog> ErrorLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Form>().HasIndex(u => u.Url).IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}