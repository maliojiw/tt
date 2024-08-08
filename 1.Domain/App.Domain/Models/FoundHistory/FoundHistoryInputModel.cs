using System.Collections.Generic;

namespace App.Domain
{
    public class FoundHistoryInputModel
    {

        public Guid? id { get; set; }

        public DateTime? foundDate { get; set; }

        public Guid? countTypeId { get; set; }

        public Guid? placeId { get; set; }

        public Guid? totalFound { get; set; }

        public string? note { get; set; }

        public Guid? userId { get; set; }

        public string? active_mode { get; set; }
    }
}

