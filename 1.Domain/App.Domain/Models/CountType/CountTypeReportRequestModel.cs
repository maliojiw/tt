using System.Collections.Generic;

namespace App.Domain
{
    public class CountTypeReportRequestModel : CountTypeSearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

