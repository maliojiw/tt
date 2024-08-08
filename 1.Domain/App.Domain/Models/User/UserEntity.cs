using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class UserEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("ชื่อเรียก")]
        public string? nickname { get; set; }

        [MaxLength(1000), Column(Order = 3), Comment("ชื่อเต็ม")]
        public string? fullname { get; set; }

        [MaxLength(1000), Column(Order = 4), Comment("โทรศัพท์")]
        public string? phone { get; set; }

        [MaxLength(1000), Column(Order = 5), Comment("อีเมล/username")]
        public string? email { get; set; }

        [MaxLength(1000), Column(Order = 6), Comment("รหัสผ่าน")]
        public string? password { get; set; }

        [Column(Order = 7), Comment("เป็น Admin")]
        public bool? isAdmin { get; set; }

        [Column(Order = 8), Comment("เป็น เจ้าหน้าที่ภาคสนาม")]
        public bool? isWorker { get; set; }

        [Column(Order = 9), Comment("เป็น นักวิจัย")]
        public bool? isResearcher { get; set; }


        public List<ActionHistoryEntity> ActionHistorys { get; } = new();
        public List<FoundHistoryEntity> FoundHistorys { get; } = new();


    }
}
