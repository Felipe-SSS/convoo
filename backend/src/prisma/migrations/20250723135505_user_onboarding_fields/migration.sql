-- AlterTable
ALTER TABLE `user_profiles` DROP COLUMN `address`,
    ADD COLUMN `country` VARCHAR(255) NULL,
    ADD COLUMN `intent` VARCHAR(255) NULL,
    ADD COLUMN `interests` JSON NULL,
    ADD COLUMN `languages` JSON NULL,
    ADD COLUMN `nickname` VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE `user_stats` (
    `user_id` BIGINT NOT NULL,
    `min_talked` INTEGER NULL DEFAULT 0,
    `practice_sequence` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_stats` ADD CONSTRAINT `user_stats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
