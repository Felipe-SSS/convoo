/*
  Warnings:

  - You are about to drop the column `birthdate` on the `user_onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `user_onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `intent` on the `user_onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `user_onboarding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_onboarding` DROP COLUMN `birthdate`,
    DROP COLUMN `country`,
    DROP COLUMN `intent`,
    DROP COLUMN `languages`,
    ADD COLUMN `current_step` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `native_languages` JSON NULL,
    ADD COLUMN `onboarding_completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `proficiency_levels` JSON NULL,
    ADD COLUMN `tutorial_step` INTEGER NOT NULL DEFAULT 0,
    MODIFY `interests` JSON NULL,
    MODIFY `nickname` VARCHAR(50) NULL;
