import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { PasswordStrength } from "./PasswordStrength";

describe('암호 검사기', () => {
  it('암호가 모든 조건을 충족하면 "강함"을 출력한다.', () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter('1q2w3e4r!');
    expect(result).toBe(PasswordStrength.STRONG)
  })
})
