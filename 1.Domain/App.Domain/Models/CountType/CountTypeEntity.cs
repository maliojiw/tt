using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class CountTypeEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("วิธีตรวจนับ")]
        public string? name { get; set; }


        public List<FoundHistoryEntity> FoundHistorys { get; } = new();


    }
}
