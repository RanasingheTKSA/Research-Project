BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lesson]') AND [c].[name] = N'FileUploadUrl');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Lesson] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Lesson] DROP COLUMN [FileUploadUrl];
GO

ALTER TABLE [Lesson] ADD [AudioFileUrl] nvarchar(max) NULL;
GO

ALTER TABLE [Lesson] ADD [TextFileUrl] nvarchar(max) NULL;
GO

ALTER TABLE [Lesson] ADD [VideoFileUrl] nvarchar(max) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230830061503_Edu_Ark_Development_54_1', N'7.0.5');
GO

COMMIT;
GO

