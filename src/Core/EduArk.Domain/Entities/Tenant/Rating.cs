using EduArk.Domain.Enums;

namespace EduArk.Domain.Entities.Tenant
{
    public class Rating : BaseAuditableEntity
    {
        public Rating() 
        {
        }
        public int  Value { get; set; }
        public RatingType? RatingType { get; set; } // A = 1, V = 2, T = 3
    }
}
