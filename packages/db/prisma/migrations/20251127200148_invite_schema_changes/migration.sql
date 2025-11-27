/*
  Warnings:

  - A unique constraint covering the columns `[groupId,email]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "InviteStatus" ADD VALUE 'CANCELLED';

-- DropIndex
DROP INDEX "Invite_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Invite_groupId_email_key" ON "Invite"("groupId", "email");
