import { LocalDate } from "@js-joda/core";
import { PayDto } from "./PayDto";

export class ExpiryDateCalculator {
  calculateExpiryDate(payDto: PayDto): LocalDate {
    return payDto.billingDate.plusMonths(1);
  }
}