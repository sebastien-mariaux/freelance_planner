import { AbstractComputer } from "./abstractComputer";

interface AchievedData {
  companyType: string;
  expenses: number;
  completedSalaries: number;
  percentDividend: number;
  repayableExpenses: number;
  taxableRepayableExpenses: number;
  revenu: number;
  monthesCount: number;
}


export class Achieved extends AbstractComputer {
  _revenu: number;
  _completedSalaries: number;
  _repayableExpenses: number;
  _taxableRepayableExpenses: number;
  _expenses: number;

  constructor(initialValues: AchievedData) {
    super(initialValues);
    this._revenu = initialValues.revenu;
    this._completedSalaries = initialValues.completedSalaries;
    this._repayableExpenses = initialValues.repayableExpenses;
    this._expenses = initialValues.expenses;
    this._taxableRepayableExpenses = initialValues.taxableRepayableExpenses;
  }

  set yearlyRevenue(value: number) {
    this._revenu = Math.max(0, value);
  }

  set completedSalaries(value: number) {
    this._completedSalaries = Math.max(0, value);
  }

  set repayableExpenses(value: number) {
    this._repayableExpenses = Math.max(0, value);
  }

  set expenses(value: number) {
    this._expenses = Math.max(0, value);
  }

  yearlyRevenu() {
    return this._revenu;
  }

  monthlyRevenu() {
    return this._revenu / this._monthesCount;
  }

  yearlyNetSalary() {
    return this._completedSalaries;
  }

  yearlyRepayableExpenses() {
    return this._repayableExpenses;
  }

  yearlyTaxableRepayableExpenses(): number {
    return  this._taxableRepayableExpenses;
  }

  yearlyExpenses() {
    return this._expenses;
  }

  run() {
    return {
      netEarnings: this.netEarnings(),
      managerMonthlyRevenu: this.managerMonthlyRevenu(),
      netDividend: this.netDividend(),
      managerYearlyTaxableRevenu: this.managerYearlyTaxableRevenu(),
    }
  }
}