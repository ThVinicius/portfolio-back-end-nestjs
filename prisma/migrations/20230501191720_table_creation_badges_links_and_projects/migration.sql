-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('FrontEnd', 'BackEnd', 'FullStack');

-- CreateEnum
CREATE TYPE "LinkLabel" AS ENUM ('FrontEnd Repo', 'BackEnd Repo', 'GitHub Repo', 'Deploy');

-- CreateTable
CREATE TABLE "badges" (
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "label" "LinkLabel" NOT NULL,
    "href" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BadgesToProjects" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_position_key" ON "projects"("position");

-- CreateIndex
CREATE UNIQUE INDEX "_BadgesToProjects_AB_unique" ON "_BadgesToProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgesToProjects_B_index" ON "_BadgesToProjects"("B");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgesToProjects" ADD CONSTRAINT "_BadgesToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "badges"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgesToProjects" ADD CONSTRAINT "_BadgesToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
