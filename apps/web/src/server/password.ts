import bcrypt from "bcryptjs";

const ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, ROUNDS);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export function assertPasswordPolicy(password: string): string | null {
  if (password.length < 8) return "Senha deve ter pelo menos 8 caracteres.";
  return null;
}
