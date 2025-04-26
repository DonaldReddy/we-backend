/*
  Warnings:

  - The `featured` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IsFeatured" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "featured",
ADD COLUMN     "featured" "IsFeatured" NOT NULL DEFAULT 'NO';
