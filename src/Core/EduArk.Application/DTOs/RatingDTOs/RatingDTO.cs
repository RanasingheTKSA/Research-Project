using EduArk.Domain.Enums;

namespace EduArk.Application.DTOs.RatingDTOs
{
    public class RatingDTO
    {
        public RatingDTO() { }

        public int Id { get; set; }
        public string? RatingName { get; set; } // video, audio and text
        public int Value { get; set; }
        public RatingType? RatingType { get; set; } // A = 1, V = 2, T = 3

        public string? CreatedDate { get; set; }
        public string? UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
    }
}
