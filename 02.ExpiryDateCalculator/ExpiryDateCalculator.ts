import { LocalDate } from "@js-joda/core";
import { PayDto } from "./PayDto";

export class ExpiryDateCalculator {
  calculateExpiryDate(payDto: PayDto): LocalDate {
    const addedMonths = payDto.payAmount / 10000;
    if (payDto.firstBillingDate !== undefined) {
      return this.expiryDateUsingFirstBillingDate(payDto, addedMonths);
    } else {
      return payDto.billingDate.plusMonths(addedMonths);
    }
  }

  expiryDateUsingFirstBillingDate(payDto: PayDto, addedMonths: number) {
    const candidateExp = payDto.billingDate.plusMonths(addedMonths);
    const dayOfFirstBilling = payDto.firstBillingDate!.dayOfMonth();
    if (dayOfFirstBilling !== candidateExp.dayOfMonth()) {
      const dayLengthOfCandiMonth = candidateExp.lengthOfMonth();
      if (dayLengthOfCandiMonth < dayOfFirstBilling) {
        return candidateExp.withDayOfMonth(dayLengthOfCandiMonth);
      }
      return candidateExp.withDayOfMonth(dayOfFirstBilling);
    } else {
      return candidateExp;
    }
  }
}
