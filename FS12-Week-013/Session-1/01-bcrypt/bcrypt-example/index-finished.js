// add our bcrypt module
const bcrypt = require("bcrypt");

// salt

const SALT_ROUNDS = 10;

// take in the password as a param

async function demonstratingHashing(password) {
  // on the bcrypt object
  // we use the hash function
  // password goes in along with the SALT/Rounds
  const hash1 = await bcrypt.hash(password, SALT_ROUNDS);
  const hash2 = await bcrypt.hash(password, SALT_ROUNDS);

  console.log("hash1 is:", hash1);
  console.log("hash2 is:", hash2);
  console.log("Are they the same?", hash1 === hash2);

  // Even though the hashes are different
  // we can use the compare function to check if they come from the same
  // source password

  const isValid1 = await bcrypt.compare(password, hash1);
  const isValid2 = await bcrypt.compare(password, hash2);

  console.log("Hash 1 Validates:", isValid1);
  console.log("Hash 2 Validates:", isValid2);
}

demonstratingHashing("123456");
