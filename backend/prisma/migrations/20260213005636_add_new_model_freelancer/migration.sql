-- AlterTable
ALTER TABLE "project_images" ADD COLUMN     "freelancerId" TEXT;

-- CreateTable
CREATE TABLE "freelancer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subheadline" TEXT,
    "technologies" TEXT,
    "github_url" TEXT,
    "live_demo_url" TEXT,
    "imgcapa_url" TEXT,
    "imgcapa_public_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "freelancer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
