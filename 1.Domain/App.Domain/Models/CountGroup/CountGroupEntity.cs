using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class CountGroupEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("ประมาณการ จำนวนที่พบ")]
        public string? name { get; set; }

        [Column(Order = 3), Comment("เทียบได้เป็นจำนวน")]
        public int? nearbyCount { get; set; }


        public List<FoundHistoryEntity> FoundHistorys { get; } = new();


    }
}
