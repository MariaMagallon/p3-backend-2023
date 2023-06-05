import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteDb = async ()=> {
  await prisma.genre.deleteMany();
  await prisma.album.deleteMany();
  await prisma.song.deleteMany();
  await prisma.singer.deleteMany();
}

deleteDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Delete all DB tables and records");
    await prisma.$disconnect();
  });
