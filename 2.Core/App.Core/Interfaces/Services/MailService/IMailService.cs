namespace App.Core
{
    public interface IMailService
    {
        void SendMailMessage(string[] recepients, string[] bccs,
            string[] ccs, string subject, string body);
    }
}
