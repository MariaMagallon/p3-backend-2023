import prisma from "./prisma-client.js";

const genre1 = await prisma.genre.create({
  data: {
    name: "R&B",
  },
});
console.log(`Created genre1 ${genre1.name} (${genre1.id})`);

const genre2 = await prisma.genre.create({
  data: {
    name: "Pop",
  },
});
console.log(`Created genre3 ${genre2.name} (${genre2.id})`);
const genre3 = await prisma.genre.create({
  data: {
    name: "Soul",
  },
});
console.log(`Created genre3 ${genre3.name} (${genre3.id})`);

const album1 = await prisma.album.create({
  data: {
    title: "Dangerously In Love",
    duration: 63,
    genreId: genre1.id,
  },
});
console.log(`Created album1 ${album1.title} (${album1.id})`);

const album2 = await prisma.album.create({
  data: {
    title: "Divide",
    duration: 100,
    genreId: genre2.id,
  },
});
console.log(`Created album2 ${album2.title} (${album2.id})`);

const album3 = await prisma.album.create({
  data: {
    title: "Back to Black",
    duration: 100,
    genreId: genre3.id,
  },
});
console.log(`Created album3 ${album3.title} (${album3.id})`);

const album4 = await prisma.album.create({
  data: {
    title: "Frank",
    duration: 100,
    genreId: genre3.id,
  },
});
console.log(`Created album4 ${album4.title} (${album4.id})`);

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
console.log(`Created singer2 ${singer2.fullName} (${singer2.id})`);

const singer3 = await prisma.singer.create({
  data: {
    fullName: "Amy Winehouse",
    nacionality: "USA",
  },
});
console.log(`Created singer3 ${singer3.fullName} (${singer3.id})`);

await prisma.song.createMany({
  data: [
    {
      title: "Crazy In Love",
      duration: 4,
      albumId: album1.id,
      singerId: singer1.id,
    },
    {
      title: "Be with you",
      duration: 4,
      albumId: album1.id,
      singerId: singer1.id,
    },
    {
      title: "Shape of You",
      duration: 3,
      albumId: album2.id,
      singerId: singer2.id,
    },
    {
      title: "Valerie",
      duration: 3,
      albumId: album3.id,
      singerId: singer3.id,
    },
    {
      title: "Back to black",
      duration: 3,
      albumId: album3.id,
      singerId: singer3.id,
    },
  ],
});
