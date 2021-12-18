import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { PasswordStrength } from "./PasswordStrength";

describe("암호 검사기", () => {
  it('암호가 모든 조건을 충족하면 "강함"을 출력한다.', () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("1q2w3e4R!");
    expect(result).toBe(PasswordStrength.STRONG);
  });

  it("길이가 8글자 미만이고 나머지 조건을 모두 충족한다.", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("1q2w3E");
    expect(result).toBe(PasswordStrength.NORMAL);
  });

  it("숫자를 포함하지않고 나머지 조건을 모두 충족한다.", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("qwerasdD");
    expect(result).toBe(PasswordStrength.NORMAL);
  });

  it("대문자를 포함하지않고 나머지 조건을 모두 충족한다.", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("qwerasdf1");
    expect(result).toBe(PasswordStrength.NORMAL);
  });

  it("빈 문자열인 경우 INVALID를 반환한다.", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("");
    expect(result).toBe(PasswordStrength.INVALID);
  });

  it("길이가 8글자 이상인 조건만 충족한다", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("qwertyui");
    expect(result).toBe(PasswordStrength.WEEK);
  });

  it("숫자 포함된 조건만 충족한다.", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("12345");
    expect(result).toBe(PasswordStrength.WEEK);
  });

  it("대문자가 포함된 조건만 충족한다", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("QWERTYU");
    expect(result).toBe(PasswordStrength.WEEK);
  });

  it("모든 조건을 충족하지 못한다", () => {
    const meter = new PasswordStrengthMeter();
    const result = meter.meter("qwertyu");
    expect(result).toBe(PasswordStrength.WEEK);
  });
});
