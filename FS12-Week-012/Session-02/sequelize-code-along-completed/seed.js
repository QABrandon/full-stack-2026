const { sequelize, User, Playlist, Song } = require("./models");

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables created!");

    // --- USERS ---
    const alice = await User.create({
      username: "alice",
      email: "alice@example.com",
    });

    const bob = await User.create({
      username: "bob",
      email: "bob@example.com",
    });

    const charlie = await User.create({
      username: "charlie",
      email: "charlie@example.com",
    });

    // --- PLAYLISTS ---
    const chill = await Playlist.create({
      name: "Chill Vibes",
      genre: "Lo-fi",
      userId: alice.id,
    });

    const workout = await Playlist.create({
      name: "Workout Mix",
      genre: "Hip-Hop",
      userId: bob.id,
    });

    const roadtrip = await Playlist.create({
      name: "Road Trip",
      genre: "Rock",
      userId: alice.id,
    });

    // --- SONGS ---
    await Song.bulkCreate([
      { title: "Sunset Drive", artist: "Lo-fi Beats", duration: 195, playlistId: chill.id },
      { title: "Rainy Day", artist: "Chillhop", duration: 224, playlistId: chill.id },
      { title: "Coffee Shop", artist: "Jazz Cats", duration: 180, playlistId: chill.id },
      { title: "Lose Yourself", artist: "Eminem", duration: 326, playlistId: workout.id },
      { title: "Stronger", artist: "Kanye West", duration: 312, playlistId: workout.id },
      { title: "Hotel California", artist: "Eagles", duration: 391, playlistId: roadtrip.id },
      { title: "Born to Run", artist: "Bruce Springsteen", duration: 270, playlistId: roadtrip.id },
    ]);

    console.log("Seed data inserted!");
    console.log("  - 3 users");
    console.log("  - 3 playlists");
    console.log("  - 7 songs");

    await sequelize.close();
  } catch (err) {
    console.error("Seed error:", err.message);
    await sequelize.close();
  }
}

seed();
