-- AlterTable
ALTER TABLE `Vote` MODIFY `votedFor` VARCHAR(191) NOT NULL,
    MODIFY `votedAgainst` VARCHAR(191) NOT NULL;
