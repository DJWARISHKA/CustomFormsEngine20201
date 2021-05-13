using System;

namespace Services.Models
{
    public class AnswerModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int FormUrl { get; set; }
        public DateTime AnswerDate { get; set; }
        public string jAnswer { get; set; }
    }
}