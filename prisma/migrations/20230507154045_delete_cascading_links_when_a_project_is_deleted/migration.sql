/*
  Warnings:

  - You are about to drop the `_BadgesToProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BadgesToProjects" DROP CONSTRAINT "_BadgesToProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgesToProjects" DROP CONSTRAINT "_BadgesToProjects_B_fkey";

-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_project_id_fkey";

-- DropTable
DROP TABLE "_BadgesToProjects";

-- CreateTable
CREATE TABLE "_BadgeToProject" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeToProject_AB_unique" ON "_BadgeToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeToProject_B_index" ON "_BadgeToProject"("B");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToProject" ADD CONSTRAINT "_BadgeToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "badges"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToProject" ADD CONSTRAINT "_BadgeToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
