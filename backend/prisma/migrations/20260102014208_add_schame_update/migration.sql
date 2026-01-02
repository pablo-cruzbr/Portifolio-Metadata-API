-- AlterTable
ALTER TABLE "project_images" ADD COLUMN     "landingpageId" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "landing_pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subheadline" TEXT,
    "technologies" TEXT,
    "github_url" TEXT,
    "live_demo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_pages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_landingpageId_fkey" FOREIGN KEY ("landingpageId") REFERENCES "landing_pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
