import { LocalDate } from "@js-joda/core";
import { PayDto } from "./PayDto";

export class ExpiryDateCalculator {
  calculateExpiryDate(payDto: PayDto): LocalDate {
    const addedMonths = payDto.payAmount / 10000;
    if (payDto.firstBillingDate !== undefined) {
      const candidateExp = payDto.billingDate.plusMonths(addedMonths);
      if (payDto.firstBillingDate.dayOfMonth() !== candidateExp.dayOfMonth()) {
        return candidateExp.withDayOfMonth(
          payDto.firstBillingDate.dayOfMonth()
        );
      }
    }

    return payDto.billingDate.plusMonths(addedMonths);
  }
}
