-- CreateTable
CREATE TABLE `user_stats` (
    `user_id` BIGINT NOT NULL,
    `min_talked` INTEGER NULL DEFAULT 0,
    `practice_sequence` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_onboarding` (
    `user_id` BIGINT NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `languages` JSON NOT NULL,
    `interests` JSON NOT NULL,
    `intent` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(50) NOT NULL,
    `birthdate` DATE NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_stats` ADD CONSTRAINT `user_stats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_onboarding` ADD CONSTRAINT `user_onboarding_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
