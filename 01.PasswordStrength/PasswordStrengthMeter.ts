import { PasswordStrength } from "./PasswordStrength";

export class PasswordStrengthMeter {
  meter(s: string): PasswordStrength {
    if (this.meetsEmptyString(s)) {
      return PasswordStrength.INVALID;
    }
    const meetCount = this.getMeetCounts(s);

    if (meetCount <= 1) {
      return PasswordStrength.WEEK;
    }
    if (meetCount === 2) {
      return PasswordStrength.NORMAL;
    }
    return PasswordStrength.STRONG;
  }

  private getMeetCounts(s: string) {
    let meetCount = 0;

    if (s.length >= 8) {
      meetCount++;
    }
    if (this.meetsContainingNumber(s)) {
      meetCount++;
    }
    if (this.meetsContainUppercase(s)) {
      meetCount++;
    }

    return meetCount;
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
