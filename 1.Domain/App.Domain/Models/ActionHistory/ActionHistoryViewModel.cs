using System.Collections.Generic;

namespace App.Domain
{
    public class ActionHistoryViewModel : BaseViewModel<Guid>
    {

        public DateTime? actionDate { get; set; }

        public string txt_actionDate { get { return Common.GetDateStringForReport(this.actionDate); } }

        public string? note { get; set; }

        public Guid? userId { get; set; }

        public Guid? actionId { get; set; }

        public string? userId_User_nickname { get; set; }
        public string? actionId_ActionType_name { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}