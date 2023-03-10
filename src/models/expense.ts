// create a class Exense with the following properties
// name: string
// amount: number
// frequency: 'monthly' | 'yearly'
// taxable: boolean

export interface ExpenseData {
  name: string;
  amount: number;
  repayable: boolean;
  frequency: 'monthly' | 'yearly';
  taxable: boolean;
}

export class Expense {
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  taxable: boolean;
  repayable: boolean;

  constructor(initialValues: ExpenseData) {
    this.name = initialValues.name;
    this.amount = initialValues.amount;
    this.frequency = initialValues.frequency;
    this.taxable = initialValues.taxable;
    this.repayable = initialValues.repayable;
  }

  get monthlyAmount(): number {
    if (this.frequency === 'monthly') {
      return this.amount;
    } else {
      return this.amount / 12;
    }
  }

  get yearlyAmount(): number {
    if (this.frequency === 'yearly') {
      return this.amount;
    } else {
      return this.amount * 12;
    }
  }

  get isYearly(): boolean {
    return this.frequency === 'yearly';
  }
  get isMonthly(): boolean {
    return this.frequency === 'monthly';
  }

  isValid(): boolean {
    return this.isNameValid() && this.isAmountValid() && this.isFrequencyValid();
  }

  isNameValid(): boolean {
    return this.name.length > 0
  }

  isAmountValid(): boolean {
    return this.amount > 0;
  }

  isFrequencyValid(): boolean {
    return this.frequency === 'monthly' || this.frequency === 'yearly';
  }

}