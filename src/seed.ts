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
console.log(`Created genre2 ${genre1.name} (${genre1.id})`);

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

const song1 = await prisma.song.create({
  data: {
    title: "Crazy In Love",
    duration: 4,
    albumId: album1.id,
  },
});
console.log(`Created song1 ${song1.title} (${song1.id})`);

const song2 = await prisma.song.create({
  data: {
    title: "Shape of You",
    duration: 3,
    albumId: album2.id,
  },
});
console.log(`Created song2 ${song2.title} (${song2.id})`);

await prisma.singer.createMany({
    data: [
      {
        fullName: "Beyonce",
        nacionality: "USA",
        songId: song1.id,
      },
      {
        fullName: "Ed Sheeran",
        nacionality: "UK",
        songId: song2.id,
      },
    ],
});
