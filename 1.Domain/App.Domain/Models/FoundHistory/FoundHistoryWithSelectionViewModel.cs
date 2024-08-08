using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class FoundHistoryWithSelectionViewModel: FoundHistoryViewModel
    {
        public List<CountTypeViewModel>? item_countTypeId { get; set; }
        public List<PlaceViewModel>? item_placeId { get; set; }
        public List<CountGroupViewModel>? item_totalFound { get; set; }
        public List<UserViewModel>? item_userId { get; set; }

    }
}