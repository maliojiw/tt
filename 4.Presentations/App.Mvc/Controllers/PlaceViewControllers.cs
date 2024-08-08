using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using App.Controllers;
using App.Web.Models;

namespace App.Controllers
{
    public class PlaceViewController : Controller
    {       
        private ILogger<PlaceViewController> _logger;
		private IConfiguration _configuration { get; set; }
		
        /// <summary>
        /// Default constructure for dependency injection
        /// </summary>
		/// <param name="configuration"></param>
        /// <param name="logger"></param>
        public PlaceViewController(ILogger<PlaceViewController> logger, IConfiguration configuration)
        {
            _logger = logger;
			_configuration = configuration;
        }

        public IActionResult Place()
        {
            return View();
        }

        public IActionResult Place_d()
        {
            return View();
        }

		//public IActionResult Place_report()
        //{    
        //    return View();
        //}

        //public IActionResult Place_pivot()
        //{    
        //    return View();
        //}

        //public IActionResult Place_inline()
        //{
		//    if (!MyHelper.checkAuth(_configuration, HttpContext)) return Unauthorized(); // Or UnauthorizedView
        //    return View();
        //}

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}


