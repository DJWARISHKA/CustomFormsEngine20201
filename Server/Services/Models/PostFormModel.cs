using System;

namespace Services.Models
{
    public class PostFormModel
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string jform { get; set; }
        public string description { get; set; }
        public DateTime? s_date { get; set; }
        public DateTime? e_date { get; set; }
        public string url { get; set; }
        public bool template { get; set; }
        public bool anonym { get; set; }
        public bool Private { get; set; }
        public bool editing { get; set; }
        public bool one_answer { get; set; }
        public bool recapcha { get; set; }
    }
}