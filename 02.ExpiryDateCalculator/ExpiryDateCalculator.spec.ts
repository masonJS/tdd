import { LocalDate } from "@js-joda/core";
import { ExpiryDateCalculator } from "./ExpiryDateCalculator";

describe('만료일 계산기', () => {
  it.each([
    [LocalDate.of(2021, 11, 1), LocalDate.of(2021, 12, 1)],
    [LocalDate.of(2021, 12, 12), LocalDate.of(2022, 1, 12)],
    [LocalDate.of(2019, 1, 31), LocalDate.of(2019, 2, 28)],
    [LocalDate.of(2019, 1, 30), LocalDate.of(2019, 2, 28)],
  ])('만원을 납부하면 한달뒤가 만료일이 된다.', (billingDate, expiryDate) => {
    const payAmount = 10000;
    const cal = new ExpiryDateCalculator();
    const result = cal.calculateExpiryDate(billingDate, payAmount);
    expect(result).toStrictEqual(expiryDate);
  })
})