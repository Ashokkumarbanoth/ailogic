import type {LoginPayload} from "@/types/auth";

const VALID_EMAIL = "admin@test.com";
const VALID_PASSWORD = "admin123";

export function validCredentials({email, password}: LoginPayload): boolean {
  return email === VALID_EMAIL && password === VALID_PASSWORD;
}