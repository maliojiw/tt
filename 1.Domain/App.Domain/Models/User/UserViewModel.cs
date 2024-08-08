using System.Collections.Generic;

namespace App.Domain
{
    public class UserViewModel : BaseViewModel<Guid>
    {

        public string? nickname { get; set; }

        public string? fullname { get; set; }

        public string? phone { get; set; }

        public string? email { get; set; }

        public string? password { get; set; }

        public bool? isAdmin { get; set; }

        public bool? isWorker { get; set; }

        public bool? isResearcher { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}