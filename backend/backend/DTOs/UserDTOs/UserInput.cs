namespace backend.DTOs.UserDTOs
{
    public class UserInput
    {
        public string Username { get;  set; }
        public string Password { get;  set; }
        public string Email { get; set; }

        public UserInput(string username, string password, string email)
        {
            Username = username;
            Password = password;
            Email = email;
        }

        public UserInput()
        {
            
        }
    }
}