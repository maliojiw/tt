using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Domain
{
    public class ActionHistoryWithSelectionViewModel: ActionHistoryViewModel
    {
        public List<UserViewModel>? item_userId { get; set; }
        public List<ActionTypeViewModel>? item_actionId { get; set; }

    }
}