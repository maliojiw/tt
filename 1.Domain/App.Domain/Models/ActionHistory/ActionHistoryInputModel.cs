using System.Collections.Generic;

namespace App.Domain
{
    public class ActionHistoryInputModel
    {

        public Guid? id { get; set; }

        public DateTime? actionDate { get; set; }

        public string? note { get; set; }

        public Guid? userId { get; set; }

        public Guid? actionId { get; set; }

        public string? active_mode { get; set; }
    }
}

