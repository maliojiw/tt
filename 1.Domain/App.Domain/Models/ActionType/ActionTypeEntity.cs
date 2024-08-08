using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class ActionTypeEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("วิธีกำจัด")]
        public string? name { get; set; }


        public List<ActionHistoryEntity> ActionHistorys { get; } = new();


    }
}
