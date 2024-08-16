/*
  Warnings:

  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Project` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
