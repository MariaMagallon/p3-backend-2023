import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const singer1 = await prisma.singer.create({
  data: {
    fullName: "Beyonce",
    nacionality: "USA",
  },
});
console.log(`Created singer1 ${singer1.fullName} (${singer1.id})`);

const singer2 = await prisma.singer.create({
  data: {
    fullName: "Ed Sheeran",
    nacionality: "UK",
  },
});
console.log(`Created singer2 ${singer1.fullName} (${singer1.id})`);

const genre1 = await prisma.genre.create({
  data: {
    name: "R&B",
    singerId: singer1.id,
  },
});
console.log(`Created genre1 ${genre1.name} (${genre1.id})`);

const genre2 = await prisma.genre.create({
  data: {
    name: "Pop",
    singerId: singer2.id,
  },
});
console.log(`Created genre2 ${genre1.name} (${genre1.id})`);

const album1 = await prisma.album.create({
  data: {
    title: "Dangerously In Love",
    duration: 63,
    genreId: genre1.id,
    singerId: singer1.id,
  },
});
console.log(`Created album1 ${album1.title} (${album1.id})`);

const album2 = await prisma.album.create({
  data: {
    title: "Divide",
    duration: 100,
    genreId: genre2.id,
    singerId: singer2.id,
  },
});
console.log(`Created album2 ${album2.title} (${album2.id})`);

await prisma.song.createMany({
  data: [
    {
      title: "Crazy In Love",
      duration: 4,
      genreId: genre1.id,
      albumId: album1.id,
      singerId: album1.id,
    },
    {
      title: "Shape of You",
      duration: 3,
      genreId: genre2.id,
      albumId: album2.id,
      singerId: album2.id,
    },
  ],
});
