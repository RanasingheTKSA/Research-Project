BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lesson]') AND [c].[name] = N'LessonGrade');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Lesson] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Lesson] DROP COLUMN [LessonGrade];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lesson]') AND [c].[name] = N'LessonSubject');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Lesson] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Lesson] DROP COLUMN [LessonSubject];
GO

ALTER TABLE [Lesson] ADD [AcademicLevelId] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Lesson] ADD [SubjectId] int NOT NULL DEFAULT 0;
GO

CREATE INDEX [IX_Lesson_AcademicLevelId] ON [Lesson] ([AcademicLevelId]);
GO

CREATE INDEX [IX_Lesson_SubjectId] ON [Lesson] ([SubjectId]);
GO

ALTER TABLE [Lesson] ADD CONSTRAINT [FK_Lesson_AcademicLevel_AcademicLevelId] FOREIGN KEY ([AcademicLevelId]) REFERENCES [AcademicLevel] ([Id]) ON DELETE NO ACTION;
GO

ALTER TABLE [Lesson] ADD CONSTRAINT [FK_Lesson_Subject_SubjectId] FOREIGN KEY ([SubjectId]) REFERENCES [Subject] ([Id]) ON DELETE NO ACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230830071537_Edu_Ark_Development_54_2', N'7.0.5');
GO

COMMIT;
GO

