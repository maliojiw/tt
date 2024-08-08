namespace App.Core
{
    public class MailConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public bool DefaultCredentials { get; set; }
        public bool EnableSsl { get; set; }
        public string From { get; set; }
        public string FromName { get; set; }
    }
}
