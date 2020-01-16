using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Infrastructure;
using backend.Models.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;


namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<IdentityContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("IdentityConnectionString"),builder =>   {
                    builder.EnableRetryOnFailure(
                        maxRetryCount: 2,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                }));

            services.AddDefaultIdentity<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<IdentityContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<User, IdentityContext>();

            services.AddAuthentication()
                .AddJwtBearer(config =>
                {
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.Secret));
            
                    config.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = Constants.Issuer,
                        ValidAudience = Constants.Audiance,
                        IssuerSigningKey = key,
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            //app.UseIdentityServer();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}