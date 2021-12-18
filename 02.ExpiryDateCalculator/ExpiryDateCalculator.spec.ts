import { LocalDate } from "@js-joda/core";
import { ExpiryDateCalculator } from "./ExpiryDateCalculator";
import { PayDtoBuilder } from "./PayDto";

describe('만료일 계산기', () => {
  it.each([
    [LocalDate.of(2021, 11, 1), LocalDate.of(2021, 12, 1), 10000],
    [LocalDate.of(2021, 12, 12), LocalDate.of(2022, 1, 12), 10000],
    [LocalDate.of(2019, 1, 31), LocalDate.of(2019, 2, 28), 10000],
    [LocalDate.of(2019, 1, 30), LocalDate.of(2019, 2, 28), 10000],
  ])('만원을 납부하면 한달뒤가 만료일이 된다.', (billingDate, expiryDate, payAmount) => {
    const cal = new ExpiryDateCalculator();
    const payDto = new PayDtoBuilder().billingDate(billingDate).payAmount(payAmount).build();
    const result = cal.calculateExpiryDate(payDto);
    expect(result).toStrictEqual(expiryDate);
  })

  // 첫 납부일과 만료일의 일자가 같지 않을때 만원을 납부하면 첫 납부일 기준으로 다음 만료일 정함
  it('첫 납부일과 만료일자가 다르면 만원을 납부한다.', () => {
    const cal = new ExpiryDateCalculator();
    const payDto = new PayDtoBuilder().firstBillingDate(LocalDate.of(2019,1, 30)).billingDate(LocalDate.of(2019, 2, 28)).payAmount(10000).build();
    const result = cal.calculateExpiryDate(payDto);
    expect(result).toStrictEqual(LocalDate.of(2019, 3, 30))
  })

  it.each([[LocalDate.of(2019,3,1), 20000, LocalDate.of(2019, 5, 1)], [LocalDate.of(2019,3,1), 30000, LocalDate.of(2019, 6, 1)]] as const)('2만원 이상 납부하면 비례해서 만료일을 계산한다.', (billingDate, payAmount, expiryDate ) => {
    const cal = new ExpiryDateCalculator();
    const payDto = new PayDtoBuilder().billingDate(billingDate).payAmount(payAmount).build();
    const result = cal.calculateExpiryDate(payDto);
    expect(result).toStrictEqual(expiryDate)
  })
})