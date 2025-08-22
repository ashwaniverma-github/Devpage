/*
  Warnings:

  - You are about to drop the `CustomDomain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CustomDomain" DROP CONSTRAINT "CustomDomain_userId_fkey";

-- DropTable
DROP TABLE "public"."CustomDomain";

-- DropEnum
DROP TYPE "public"."DomainStatus";
