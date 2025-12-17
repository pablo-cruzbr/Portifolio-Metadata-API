-- DropForeignKey
ALTER TABLE "project_images" DROP CONSTRAINT "project_images_projectId_fkey";

-- AlterTable
ALTER TABLE "project_images" ADD COLUMN     "public_id" TEXT,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "imgcapa_public_id" TEXT,
ALTER COLUMN "update_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
