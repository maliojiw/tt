using System.Collections.Generic;

namespace App.Domain
{
    public class CountGroupViewModel : BaseViewModel<Guid>
    {

        public string? name { get; set; }

        public int? nearbyCount { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}