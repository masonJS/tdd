import { LocalDate } from "@js-joda/core";

export class ExpiryDateCalculator {
  calculateExpiryDate(billingDate: LocalDate, payAmount: number): LocalDate {
    return billingDate.plusMonths(1);
  }
}