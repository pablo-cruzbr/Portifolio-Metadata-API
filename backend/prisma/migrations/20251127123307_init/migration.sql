-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "Technologies" TEXT,
    "Goal" TEXT,
    "features" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
