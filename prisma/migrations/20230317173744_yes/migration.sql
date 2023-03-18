/*
  Warnings:

  - You are about to drop the column `votedAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `votedFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `votedAgainstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedForId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `votedAgainst`,
    DROP COLUMN `votedFor`,
    ADD COLUMN `votedAgainstId` VARCHAR(191) NOT NULL,
    ADD COLUMN `votedForId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Character` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `spriteURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
