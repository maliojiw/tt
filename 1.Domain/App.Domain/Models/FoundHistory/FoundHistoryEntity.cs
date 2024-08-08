using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class FoundHistoryEntity : BaseEntity<Guid>
    {


        [Column(Order = 2), Comment("วันที่พบ")]
        public DateTime? foundDate { get; set; }

        [ForeignKey("countTypeId")]
        public CountTypeEntity? CountType_countTypeId { get; set; }

        [Column(Order = 3), Comment("วิธีนับจำนวน")]
        public Guid? countTypeId { get; set; }

        [ForeignKey("placeId")]
        public PlaceEntity? Place_placeId { get; set; }

        [Column(Order = 4), Comment("ตำแหน่งที่พบ")]
        public Guid? placeId { get; set; }

        [ForeignKey("totalFound")]
        public CountGroupEntity? CountGroup_totalFound { get; set; }

        [Column(Order = 5), Comment("จำนวนที่พบ")]
        public Guid? totalFound { get; set; }

        [MaxLength(1000), Column(Order = 6), Comment("รายละเอียดเพิ่มเติม")]
        public string? note { get; set; }

        [ForeignKey("userId")]
        public UserEntity? User_userId { get; set; }

        [Column(Order = 7), Comment("ผู้ให้ข้อมูล")]
        public Guid? userId { get; set; }




    }
}
