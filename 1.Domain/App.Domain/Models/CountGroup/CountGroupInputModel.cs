using System.Collections.Generic;

namespace App.Domain
{
    public class CountGroupInputModel
    {

        public Guid? id { get; set; }

        public string? name { get; set; }

        public int? nearbyCount { get; set; }

        public string? active_mode { get; set; }
    }
}

