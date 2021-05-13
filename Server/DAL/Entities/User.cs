using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Password { get; set; }
        public string F_name { get; set; }
        public string L_name { get; set; }
        public bool Gest { get; set; }
    }
}
