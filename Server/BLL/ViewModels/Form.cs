using System;

namespace BLL.ViewModels
{
    public class Form
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Jform { get; set; }
        public DateTime? S_date { get; set; }
        public DateTime? E_date { get; set; }
        public string Url { get; set; }
        public bool Template { get; set; }
        public bool Anonym { get; set; }
        public bool Private { get; set; }
        public bool Editing { get; set; }
        public bool One_answer { get; set; }
        public bool Recapcha { get; set; }
    }
}