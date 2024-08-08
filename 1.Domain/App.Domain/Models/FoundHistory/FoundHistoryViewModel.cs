using System.Collections.Generic;

namespace App.Domain
{
    public class FoundHistoryViewModel : BaseViewModel<Guid>
    {

        public DateTime? foundDate { get; set; }

        public string txt_foundDate { get { return Common.GetDateStringForReport(this.foundDate); } }

        public Guid? countTypeId { get; set; }

        public Guid? placeId { get; set; }

        public Guid? totalFound { get; set; }

        public string? note { get; set; }

        public Guid? userId { get; set; }

        public string? countTypeId_CountType_name { get; set; }
        public string? placeId_Place_name { get; set; }
        public string? totalFound_CountGroup_name { get; set; }
        public string? userId_User_nickname { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}