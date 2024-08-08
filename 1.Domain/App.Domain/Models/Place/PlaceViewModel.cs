using System.Collections.Generic;

namespace App.Domain
{
    public class PlaceViewModel : BaseViewModel<Guid>
    {

        public string? name { get; set; }

        public string? province { get; set; }

        public string? amphor { get; set; }

        public string? tumbon { get; set; }

        public string? riverName { get; set; }

        public string? nearbyPlace { get; set; }

        public string? locationLat { get; set; }

        public string? locationLong { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}