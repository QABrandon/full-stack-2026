// Seed Data
// This file creates starter data (roles, users, and sample posts) whenever
// the server starts. This is helpful because the application stores data
// in memory, so restarting the server wipes everything.
//
// Seeding = inserting known starter records so you always have
// predictable accounts to log in with and test against.

const bcrypt = require('bcrypt');
const Role = require('../models/Role');
const User = require('../models/User');
const Post = require('../models/Post');

// seedDatabase runs once at startup and populates roles, users, and posts
async function seedDatabase() {
  console.log('\nSeeding starter data...');

  // Step 1: Seed the two roles
  // We keep the role design extremely simple:
  //   - admin:  full access. Can delete any post and manage other users.
  //   - author: can create, edit, and delete their OWN posts.
  const adminRole = Role.create({
    name: 'admin',
    description: 'Full access to everything in the blog',
    permissions: [
      'post:create',
      'post:edit-own',
      'post:delete-own',
      'post:delete-any',
      'user:list',
      'user:assign-role'
    ]
  });

  const authorRole = Role.create({
    name: 'author',
    description: 'Can create and manage their own blog posts',
    permissions: [
      'post:create',
      'post:edit-own',
      'post:delete-own'
    ]
  });

  console.log(`  Created ${Role.getAll().length} roles: admin, author`);

  // Step 2: Seed two example users, one per role
  // Passwords are hashed before being stored (same as a real register flow).
  // Default credentials:
  //   admin  / admin123  (admin)
  //   alice  / alice123  (author)
  const adminPassword = await bcrypt.hash('admin123', 10);
  const alicePassword = await bcrypt.hash('alice123', 10);

  const admin = User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: adminPassword,
    roleId: adminRole.id
  });

  const alice = User.create({
    username: 'alice',
    email: 'alice@example.com',
    password: alicePassword,
    roleId: authorRole.id
  });

  console.log(`  Created ${User.getAll().length} users: admin, alice`);

  // Step 3: Seed a couple of sample posts so the public feed is not empty
  Post.create({
    title: 'Welcome to the Blog',
    content: 'This post was created by the admin during seeding. ' +
             'Admins can delete any post, not just their own.',
    author: admin.id,
    authorName: admin.username
  });

  Post.create({
    title: 'My First Author Post',
    content: 'Hi, I am Alice and I have the author role. ' +
             'I can create posts and edit or delete the ones I own.',
    author: alice.id,
    authorName: alice.username
  });

  console.log(`  Created ${Post.getAll().length} sample posts`);
  console.log('Seed complete.\n');
}

// Export so server.js can call it once on startup
module.exports = seedDatabase;
