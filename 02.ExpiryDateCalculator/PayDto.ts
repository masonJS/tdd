import { LocalDate } from "@js-joda/core";

export class PayDto {
  firstBillingDate: LocalDate | undefined;
  billingDate!: LocalDate;
  payAmount!: number;
}

export class PayDtoBuilder {
  payDto: PayDto;

  constructor() {
    this.payDto = new PayDto();
  }

  firstBillingDate(value: LocalDate) {
    this.payDto.firstBillingDate = value;
    return this;
  }

  billingDate(value: LocalDate) {
    this.payDto.billingDate = value;
    return this;
  }

  payAmount(value: number) {
    this.payDto.payAmount = value;
    return this;
  }

  build() {
    return this.payDto;
  }
}
