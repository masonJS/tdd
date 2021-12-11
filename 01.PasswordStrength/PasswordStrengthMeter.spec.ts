import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { PasswordStrength } from "./PasswordStrength";

describe('암호 검사기', () => {
  it('암호가 모든 조건을 충족하면 "강함"을 출력한다.', () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter('1q2w3e4r!');
    expect(result).toBe(PasswordStrength.STRONG)
  })

  it('길이가 8글자 미만이고 나머지 조건을 모두 충족한다.', () => {
    
  })
})
