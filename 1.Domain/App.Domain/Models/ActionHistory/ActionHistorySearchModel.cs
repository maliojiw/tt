using System.Collections.Generic;

namespace App.Domain
{
    public class ActionHistorySearchModel
    {

        public Guid id { get; set; }

        public DateTime? actionDate { get; set; }

        public string? note { get; set; }

        public Guid? userId { get; set; }

        public Guid? actionId { get; set; }

    }
}

