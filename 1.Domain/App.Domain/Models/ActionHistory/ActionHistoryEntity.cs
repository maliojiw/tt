using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class ActionHistoryEntity : BaseEntity<Guid>
    {


        [Column(Order = 2), Comment("วันที่ทำ กิจกรรม")]
        public DateTime? actionDate { get; set; }

        [MaxLength(1000), Column(Order = 3), Comment("รายละเอียดเพิ่มเติม")]
        public string? note { get; set; }

        [ForeignKey("userId")]
        public UserEntity? User_userId { get; set; }

        [Column(Order = 4), Comment("ผู้ให้ข้อมูล")]
        public Guid? userId { get; set; }

        [ForeignKey("actionId")]
        public ActionTypeEntity? ActionType_actionId { get; set; }

        [Column(Order = 5), Comment("ประเภทกิจกรรม")]
        public Guid? actionId { get; set; }




    }
}
