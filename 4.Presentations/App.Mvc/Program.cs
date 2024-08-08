using App.Web;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using TTSW.Utils;

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
var configurationBuilder = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json", optional: true, true)
                            .AddJsonFile($"appsettings.{environment}.json", true, true)
                            .AddEnvironmentVariables()
                            .Build();

// Add services to the container.
builder.Services.AddControllersWithViews();

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

/*
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
//.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Events = new CookieAuthenticationEvents
    {
        // After the auth cookie has been validated, this event is called.
        // In it we see if the access token is close to expiring.  If it is
        // then we use the refresh token to get a new access token and save them.
        // If the refresh token does not work for some reason then we redirect to 
        // the login screen.
        OnValidatePrincipal = async cookieCtx =>
        {
            var now = DateTimeOffset.UtcNow;
            var expiresAt = cookieCtx.Properties.GetTokenValue("expires_at");
            var accessTokenExpiration = DateTimeOffset.Parse(expiresAt);
            var timeRemaining = accessTokenExpiration.Subtract(now);
            // TODO: Get this from configuration with a fall back value.
            var refreshThresholdMinutes = Convert.ToInt16(configurationBuilder["OpenIdConnect:refreshThresholdMinutes"]);
            var refreshThreshold = TimeSpan.FromMinutes(refreshThresholdMinutes);

            if (timeRemaining < refreshThreshold)
            {
                var refreshToken = cookieCtx.Properties.GetTokenValue("refresh_token");
                // TODO: Get this HttpClient from a factory
                var response = await new HttpClient().RequestRefreshTokenAsync(new RefreshTokenRequest
                {
                    Address = configurationBuilder["OpenIdConnect:Authority"] + "/connect/token",
                    ClientId = configurationBuilder["OpenIdConnect:ClientId"],
                    ClientSecret = configurationBuilder["OpenIdConnect:ClientSecret"],
                    RefreshToken = refreshToken
                });

                if (!response.IsError)
                {
                    var expiresInSeconds = response.ExpiresIn;
                    var updatedExpiresAt = DateTimeOffset.UtcNow.AddSeconds(expiresInSeconds);
                    cookieCtx.Properties.UpdateTokenValue("expires_at", updatedExpiresAt.ToString());
                    cookieCtx.Properties.UpdateTokenValue("access_token", response.AccessToken);
                    cookieCtx.Properties.UpdateTokenValue("refresh_token", response.RefreshToken);

                    // Indicate to the cookie middleware that the cookie should be remade (since we have updated it)
                    cookieCtx.ShouldRenew = true;
                }
                else
                {
                    cookieCtx.RejectPrincipal();
                    await cookieCtx.HttpContext.SignOutAsync();
                }
            }
        }
    };
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = configurationBuilder["OpenIdConnect:Authority"]; // https://localhost:5001, https://apid4.azurewebsites.net

    options.ClientId = configurationBuilder["OpenIdConnect:ClientId"];
    options.ClientSecret = configurationBuilder["OpenIdConnect:ClientSecret"];
    options.ResponseType = configurationBuilder["OpenIdConnect:ResponseType"];

    var scopeconfig = configurationBuilder["OpenIdConnect:Scope"].Split(',');
    foreach (var i in scopeconfig)
    {
        options.Scope.Add(i.Trim());
    }

    options.GetClaimsFromUserInfoEndpoint = true;

    options.SaveTokens = true;
    options.Events = new OpenIdConnectEvents
    {
        OnRemoteFailure = context => {
            context.Response.Redirect("/");
            context.HandleResponse();

            return Task.FromResult(0);
        }
    };

    options.RequireHttpsMetadata = false;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminEmployee", policy => policy.RequireClaim("role", "AdminEmployee"));
    options.AddPolicy("Employee", policy => policy.RequireClaim("role", "Employee"));
    options.AddPolicy("Approval", policy => policy.RequireClaim("role", "Approval"));
});
*/

FileUtil.Configuration = builder.Configuration;

builder.Services.AddHttpClient();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCookiePolicy(new CookiePolicyOptions
    {
        MinimumSameSitePolicy = SameSiteMode.Lax
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

#region HTML Configure

var currentDir = Directory.GetCurrentDirectory();

// Set static file for directory uploads
var rootUploadDir = FileUtil.GetDirectoryRootPath(TTSW.Constant.FilePathConstant.DirType.TempUpload);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(rootUploadDir.PhysicalPath),
    RequestPath = "/Uploads"
});

// Set static file for directory attachments
rootUploadDir = FileUtil.GetDirectoryRootPath(TTSW.Constant.FilePathConstant.DirType.Files);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(rootUploadDir.PhysicalPath),
    RequestPath = "/Files"
});

#endregion

app.UseRouting();

//app.UseAuthentication();
//app.UseAuthorization();

//app.UseMiddleware<ManageTokenForClientMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
