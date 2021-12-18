import { LocalDate } from "@js-joda/core";

export class PayDto {
  _billingDate: LocalDate;
  _payAmount: Number;

  constructor(builder: PayDtoBuilder){
    this._billingDate = builder._billingDate;
    this._payAmount = builder._payAmount;
  }

  get billingDate(): LocalDate {
    return this._billingDate;
  }

  get payAmount(): Number {
    return this._payAmount;
  }
}

export class PayDtoBuilder {
  _billingDate!: LocalDate;
  _payAmount!: Number;


  billingDate(value: LocalDate){
    this._billingDate = value;
    return this;
  }

  payAmount(value: number) {
    this._payAmount = value;
    return this;
  }

  build() {
    return new PayDto(this);
  }
}
