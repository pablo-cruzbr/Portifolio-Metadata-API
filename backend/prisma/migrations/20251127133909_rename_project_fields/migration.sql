/*
  Warnings:

  - You are about to drop the column `Goal` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `Technologies` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `projects` table. All the data in the column will be lost.
  - Added the required column `title` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "Goal",
DROP COLUMN "Technologies",
DROP COLUMN "project",
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "technologies" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
