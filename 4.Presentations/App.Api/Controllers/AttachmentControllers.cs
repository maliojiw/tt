
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using TTSW.Utils;
using App.Api;
using TodoAPI2.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace App.Controllers
{
    //[Authorize]
    [Produces("application/json")]
    [Route("api/Attachment")]
    public class AttachmentController : BaseController
    {
        #region Private Variables
        private ILogger<AttachmentController> _logger;
        private IConfiguration Configuration { get; set; }
        #endregion

        #region Properties

        #endregion

        /// <summary>
        /// Default constructure for dependency injection
        /// </summary>
        /// <param name="logger"></param>
        public AttachmentController(ILogger<AttachmentController> logger, IConfiguration configuration)
        {
            _logger = logger;
            Configuration = configuration;
        }

        /// <summary>
        /// Upload multiples files
        /// https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-2.1
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="files"></param>
        /// <returns>Newly created item</returns>
        /// <response code="200">Returns the item</response>
        /// <response code="400">If the model is invalid</response> 
        /// <response code="500">Error Occurred</response>  
        [HttpPost("UploadMultipleFiles")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UploadMultipleFiles(List<IFormFile> files)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var uploadsDir = FileUtil.GetTempUploadPath();

                    long size = files.Sum(f => f.Length);

                    var listFilesUploaded = new List<string>();

                    foreach (var formFile in files)
                    {
                        // Get list of relative files to return
                        listFilesUploaded.Add(uploadsDir.RelativePath.Replace(@"\", "/") + "/" + formFile.FileName);

                        var fileFullPath = Path.Combine(uploadsDir.PhysicalPath, formFile.FileName);

                        if (formFile.Length > 0)
                        {
                            using (var stream = new FileStream(fileFullPath, FileMode.Create))
                            {
                                await formFile.CopyToAsync(stream);
                            }
                        }
                    }

                    // process uploaded files
                    // Don't rely on or trust the FileName property without validation.

                    return Ok(new UploadedFilePathInfo (){
                        Count = files.Count,
                        Size = size,
                        FilesUploaded = listFilesUploaded
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogCritical($"Exception while uploading files.", ex);
                    return StatusCode(500, $"Exception while  uploading files. {ex.Message}");
                }
            }

            return BadRequest(ModelState);
        }
    }
}
