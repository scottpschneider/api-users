using System;

namespace API_Users.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // public List<Keeps> MyFavs { get; set; }

        public class UserRegistration
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        internal UserReturnModel GetReturnModel()
        {
            return new UserReturnModel()
            {
                Id = Id,
                Username = Username,
                Email = Email
            };
        }
    }
}