using System.Collections.Generic;

namespace App.Domain
{
    public class ActionTypeViewModel : BaseViewModel<Guid>
    {

        public string? name { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}