using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace App.Core
{
    public class MailService : IMailService
    {
        private readonly MailConfig _config;

        public MailService(IOptions<MailConfig> config)
        {
            _config = config.Value;
        }

        /// <summary>
        /// Sends an mail message
        /// </summary>
        /// <param name="from">Sender address</param>
        /// <param name="recepients">Recepient address</param>
        /// <param name="bccs">Bcc recepient</param>
        /// <param name="ccs">Cc recepient</param>
        /// <param name="subject">Subject of mail message</param>
        /// <param name="body">Body of mail message</param>

        public void SendMailMessage(string[] recepients, string[] bccs,
            string[] ccs, string subject, string body)
        {
            try
            {
                //From Address    
                string FromAddress = _config.From;
                string FromAdressTitle = _config.FromName;

                string Subject = subject;
                string BodyContent = body;

                //Smtp Server    
                string SmtpServer = _config.Host;
                //Smtp Port Number    
                int SmtpPortNumber = _config.Port;

                var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress(
                    FromAdressTitle,
                    FromAddress
                    ));


                foreach (string recepient in ccs)
                {
                    if (!string.IsNullOrEmpty(recepient))
                    {
                        mimeMessage.Cc.Add(new MailboxAddress(recepient, recepient));
                    }
                }

                foreach (string recepient in bccs)
                {
                    if (!string.IsNullOrEmpty(recepient))
                    {
                        mimeMessage.Bcc.Add(new MailboxAddress(recepient, recepient));
                    }
                }

                foreach (string recepient in recepients)
                {
                    if (!string.IsNullOrEmpty(recepient))
                    {
                        mimeMessage.To.Add(new MailboxAddress(recepient, recepient));
                    }
                }

                mimeMessage.Subject = Subject; //Subject  
                mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = BodyContent
                };

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    client.Connect(SmtpServer, SmtpPortNumber, SecureSocketOptions.SslOnConnect);
                    client.Authenticate(_config.UserName, _config.Password);
                    client.Send(mimeMessage);
                    client.Disconnect(true);
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

    }
}
