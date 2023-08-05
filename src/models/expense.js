// create a class Exense with the following properties
// name: string
// amount
// frequency: 'monthly' | 'yearly'
// taxable: boolean


export class Expense {
  name;
  amount;
  frequency;
  taxable;
  repayable;

  constructor(initialValues) {
    this.name = initialValues.name;
    this.amount = initialValues.amount;
    this.frequency = initialValues.frequency;
    this.taxable = initialValues.taxable;
    this.repayable = initialValues.repayable;
  }

  get monthlyAmount() {
    if (this.frequency === 'monthly') {
      return this.amount;
    } else {
      return this.amount / 12;
    }
  }

  get yearlyAmount() {
    if (this.frequency === 'yearly') {
      return this.amount;
    } else {
      return this.amount * 12;
    }
  }

  get isYearly() {
    return this.frequency === 'yearly';
  }
  get isMonthly() {
    return this.frequency === 'monthly';
  }

  isValid() {
    return this.isNameValid() && this.isAmountValid() && this.isFrequencyValid();
  }

  isNameValid() {
    return this.name.length > 0
  }

  isAmountValid() {
    return this.amount > 0;
  }

  isFrequencyValid() {
    return this.frequency === 'monthly' || this.frequency === 'yearly';
  }

}