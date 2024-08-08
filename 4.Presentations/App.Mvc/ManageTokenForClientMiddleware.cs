using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;

namespace App.Web
{
    public class ManageTokenForClientMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpClientFactory _clientFactory;
        public ManageTokenForClientMiddleware(RequestDelegate next, IHttpClientFactory clientFactory)
        {
            _next = next;
            _clientFactory = clientFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var userResult = context.AuthenticateAsync();
            var options = new CookieOptions
            {
                //HttpOnly = true,
                //Secure = false, // Set to false in development
                //SameSite = SameSiteMode.Lax
            };
            try
            {
                if(userResult.Result.Properties != null)
                {
                    foreach (var prop in userResult.Result.Properties.Items)
                    {
                        if (prop.Key == ".Token.access_token")
                        {
                            var cookieValue = prop.Value;
                            context.Response.Cookies.Append(((string)prop.Key).Replace(".Token.", "ap_"), cookieValue, options);
                        }
                    }
                }                
            }
            catch(Exception ex)
            { 
            }
            

            // Invoke the next middleware
            await _next(context);
        }
    }

    public class TokenResponse
    {
        public string id_token { get; set; }
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }
        public string refresh_token { get; set; }
        public string scope { get; set; }
    }

}
