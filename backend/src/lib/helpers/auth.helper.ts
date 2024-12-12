import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return hashedPassword;
}

export const decodePassword = (enteredPassword: string, storedPassword: string) => {
  return bcrypt.compareSync(enteredPassword, storedPassword);
}