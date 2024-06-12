using EduArk.Domain.Entities.Tenant;
using EduArk.Infrastructure.Tenant.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EduArk.Infrastructure.Tenant.Data.Configuration
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            //Set Lesson Table Name
            builder.ToTable(EntityConstants.LESSON);

            //Set Lesson Table Primary Key
            builder.HasKey(x => x.Id);

            builder.Property(p=>p.VideoFileUrl)
                   .IsRequired(false);

            builder.Property(p => p.AudioFileUrl)
                   .IsRequired(false);

            builder.Property(p => p.TextFileUrl)
                   .IsRequired(false);

            
            builder
                  .HasOne<AcademicLevel>(x => x.AcademicLevel)
                  .WithMany(r => r.Lessons)
                  .HasForeignKey(f => f.AcademicLevelId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .IsRequired(true);

            builder
                  .HasOne<Subject>(x => x.Subject)
                  .WithMany(r => r.Lessons)
                  .HasForeignKey(f => f.SubjectId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .IsRequired(true);

            //For Nullable Relationship with Lesson Table for Created User
            builder
                  .HasOne<User>(x => x.CreatedByUser)
                  .WithMany(r => r.CreatedUserLessons)
                  .HasForeignKey(f => f.CreatedByUserId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .IsRequired(true);

            // For Nullable Relationship with Lesson Table for Updated User
            builder
                   .HasOne<User>(x => x.UpdatedByUser)
                   .WithMany(r => r.UpdatedUserLessons)
                   .HasForeignKey(f => f.UpdatedByUserId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .IsRequired(true);
        }
    }
}
