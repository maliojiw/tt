using System.Collections.Generic;

namespace App.Domain
{
    public class PlaceInputModel
    {

        public Guid? id { get; set; }

        public string? name { get; set; }

        public string? province { get; set; }

        public string? amphor { get; set; }

        public string? tumbon { get; set; }

        public string? riverName { get; set; }

        public string? nearbyPlace { get; set; }

        public string? locationLat { get; set; }

        public string? locationLong { get; set; }

        public string? active_mode { get; set; }
    }
}

