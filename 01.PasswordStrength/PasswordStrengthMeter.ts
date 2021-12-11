import { PasswordStrength } from "./PasswordStrength";

export class PasswordStrengthMeter {
  meter(s: string): PasswordStrength {
    if (this.meetsEmptyString(s)) {
      return PasswordStrength.INVALID;
    }
    if (s.length < 8) {
      return PasswordStrength.NORMAL;
    }
    if (!this.meetsContainingNumber(s)) {
      return PasswordStrength.NORMAL;
    }
    if (!this.meetsContainUppercase(s)) {
      return PasswordStrength.NORMAL;
    }
    return PasswordStrength.STRONG;
  }

  private meetsContainingNumber(s: string) {
    return /[0-9]/.test(s);
  }

  private meetsContainUppercase(s: string) {
    return /[A-Z]/.test(s);
  }

  private meetsEmptyString(s: string) {
    return !s || s.length === 0;
  }
}
