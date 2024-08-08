using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class PlaceEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("ชื่อเรียกจุดที่พบ")]
        public string? name { get; set; }

        [MaxLength(1000), Column(Order = 3), Comment("จังหวัด")]
        public string? province { get; set; }

        [MaxLength(1000), Column(Order = 4), Comment("อำเภอ")]
        public string? amphor { get; set; }

        [MaxLength(1000), Column(Order = 5), Comment("ตำบล")]
        public string? tumbon { get; set; }

        [MaxLength(1000), Column(Order = 6), Comment("ชื่อแม่น้ำ")]
        public string? riverName { get; set; }

        [MaxLength(1000), Column(Order = 7), Comment("สถานที่ใกล้เคียง")]
        public string? nearbyPlace { get; set; }

        [MaxLength(1000), Column(Order = 8), Comment("Lat")]
        public string? locationLat { get; set; }

        [MaxLength(1000), Column(Order = 9), Comment("Long")]
        public string? locationLong { get; set; }


        public List<FoundHistoryEntity> FoundHistorys { get; } = new();


    }
}
