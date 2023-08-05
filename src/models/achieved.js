import { AbstractComputer } from "./abstractComputer";


export class Achieved extends AbstractComputer {
  _revenu;
  _completedSalaries;
  _repayableExpenses;
  _taxableRepayableExpenses;
  _expenses;

  constructor(initialValues) {
    super(initialValues);
    this._revenu = initialValues.revenu;
    this._completedSalaries = initialValues.completedSalaries;
    this._repayableExpenses = initialValues.repayableExpenses;
    this._expenses = initialValues.expenses;
    this._taxableRepayableExpenses = initialValues.taxableRepayableExpenses;
  }

  set yearlyRevenue(value) {
    this._revenu = Math.max(0, value);
  }

  set completedSalaries(value) {
    this._completedSalaries = Math.max(0, value);
  }

  set repayableExpenses(value) {
    this._repayableExpenses = Math.max(0, value);
  }

  set expenses(value) {
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

  yearlyTaxableRepayableExpenses() {
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