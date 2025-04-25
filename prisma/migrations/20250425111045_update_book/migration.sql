-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "genre" TEXT[] DEFAULT ARRAY[]::TEXT[];
