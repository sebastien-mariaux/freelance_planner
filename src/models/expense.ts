// create a class Exense with the following properties
// name: string
// amount: number
// frequency: 'monthly' | 'yearly'
// taxable: boolean

interface ExpenseData {
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

}