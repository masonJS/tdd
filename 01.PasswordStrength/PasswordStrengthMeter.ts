import { PasswordStrength } from "./PasswordStrength";

export class PasswordStrengthMeter {
  meter(s: string): PasswordStrength {
    return PasswordStrength.STRONG;
  }
}
