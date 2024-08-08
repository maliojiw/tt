using System.Collections.Generic;

namespace App.Domain
{
    public class FoundHistoryReportRequestModel : FoundHistorySearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

