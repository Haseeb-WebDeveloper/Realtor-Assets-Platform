const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = process.argv[2];
  
  if (!password) {
    console.error('Please provide a password as an argument');
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();
