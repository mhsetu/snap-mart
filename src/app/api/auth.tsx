// import { compare, hash } from 'bcryptjs';

// export async function hashPassword(password: string): Promise<string> {
//   const hashedPassword = await hash(password, 12);
//   return hashedPassword;
// }

// export async function verifyPassword(
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> {
//   const isValid = await compare(password, hashedPassword);
//   return isValid;
// }

import { compare, hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
