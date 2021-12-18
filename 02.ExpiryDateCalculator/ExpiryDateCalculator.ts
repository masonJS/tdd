import { LocalDate } from "@js-joda/core";
import { PayDto } from "./PayDto";

export class ExpiryDateCalculator {
  calculateExpiryDate(payDto: PayDto): LocalDate {

    if (payDto.firstBillingDate !== undefined) {
      const candidateExp = payDto.billingDate.plusMonths(1);
      if (payDto.firstBillingDate.dayOfMonth() !== candidateExp.dayOfMonth()) {
        return candidateExp.withDayOfMonth(payDto.firstBillingDate.dayOfMonth())
      }
    }

    return payDto.billingDate.plusMonths(1);
  }
}