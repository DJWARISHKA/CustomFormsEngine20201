using System;

namespace DAL.Entities
{
    public class User_form
    {
        public int Id { get; set; }
        public string User_id { get; set; }
        public int Form_id { get; set; }
        public bool Can_edit { get; set; }
        public bool Answered { get; set; }
        public bool Report_watch { get; set; }
        public DateTime? AnswerDate { get; set; }
        public string jsonAnswer { get; set; }
    }
}