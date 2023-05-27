-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_singerId_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "singerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_singerId_fkey" FOREIGN KEY ("singerId") REFERENCES "Singer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
