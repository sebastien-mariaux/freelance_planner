import { AbstractComputer } from "./abstractComputer";

export const WEEKS_IN_YEAR = 52;

export type SimulationData = {
  name?: string;
  companyType?: string;
  dailyRate?: number;
  weeksOff?: number;
  weeksOn?: number;
  daysPerWeek?: number;
  monthlyExpenses?: number;
  monthlyNetSalary?: number;
  percentDividend?: number;
  monthlyRepayableExpenses?: number;
  monthlyTaxableRepayableExpenses?: number;
}


export class Simulation extends AbstractComputer {
  name: string;
  _dailyRate: number;
  _weeksOff: number;
  _weeksOn: number;
  _daysPerWeek: number;
  _monthlyNetSalary: number;

  constructor(initialValues: SimulationData = {}) {
    super(initialValues);
    this.name = initialValues.name || 'Simulation';
    this._dailyRate = this._checkInput({ value: initialValues.dailyRate, min: 0, defaultValue: 500 });
    this._weeksOff = this._checkInput({ value: initialValues.weeksOff, min: 0, max: WEEKS_IN_YEAR, defaultValue: 10 });
    this._weeksOn = this._checkInput({ value: initialValues.weeksOn, min: 0, max: WEEKS_IN_YEAR, defaultValue: 42 });
    this._daysPerWeek = this._checkInput({ value: initialValues.daysPerWeek, min: 0, max: 7, defaultValue: 5 });
    this._monthlyNetSalary = this._checkInput({ value: initialValues.monthlyNetSalary, min: 0, defaultValue: 0 });
  }

  get dailyRate() {
    return this._dailyRate;
  }
  set dailyRate(value) {
    value = this._checkInput({ value: value, min: 0, max: null, defaultValue: 0 })
    this._dailyRate = value
  }

  get monthlyNetSalary() {
    return this._monthlyNetSalary;
  }
  set monthlyNetSalary(value) {
    value = this._checkInput({ value: value, min: 0, max: null, defaultValue: 0 })
    this._monthlyNetSalary = value;
  }

  get weeksOff() {
    return this._weeksOff;
  }
  set weeksOff(value) {
    value = this._checkInput({ value: value, min: 0, max: WEEKS_IN_YEAR, defaultValue: 0 })
    this._weeksOff = value;
    this._weeksOn = WEEKS_IN_YEAR - this._weeksOff;
  }

  get weeksOn() {
    return this._weeksOn;
  }
  set weeksOn(value) {
    value = this._checkInput({ value: value, min: 0, max: WEEKS_IN_YEAR, defaultValue: 0 })
    this._weeksOn = value;
    this._weeksOff = WEEKS_IN_YEAR - this._weeksOn;
  }

  get daysPerWeek() {
    return this._daysPerWeek;
  }
  set daysPerWeek(value) {
    if (!value) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 7) {
      value = 7;
    }
    this._daysPerWeek = value;
  }

  yearlyRevenu() {
    return this.dailyRate * this.daysPerWeek * this.weeksOn;
  }

  monthlyRevenu() {
    return this.yearlyRevenu() / 12;
  }

  yearlyNetSalary() {
    return 12 * this.monthlyNetSalary;
  }

  yearlyRepayableExpenses() {
    return 12 * this.monthlyRepayableExpenses;
  }

  yearlyTaxableRepayableExpenses(): number {
    return 12 * this.monthlyTaxableRepayableExpenses;
  }

  yearlyExpenses() {
    return this.monthlyExpenses * 12;
  }

  serialize() {
    return {
      name: this.name,
      companyType: this.companyType,
      dailyRate: this.dailyRate,
      weeksOff: this.weeksOff,
      weeksOn: this.weeksOn,
      daysPerWeek: this.daysPerWeek,
      yearlyRevenu: this.yearlyRevenu(),
      monthlyRevenu: this.monthlyRevenu(),
      monthlyExpenses: this.monthlyExpenses,
      monthlyRepayableExpenses: this.monthlyRepayableExpenses,
      yearlyRepayableExpenses: this.yearlyRepayableExpenses(),
      yearlyTotalCost: this.yearlyTotalCost(),
      rawEarnings: this.rawEarnings(),
      earningsTax: this.earningsTax(),
      netEarnings: this.netEarnings(),
      dividend: this.dividend(),
      netDividend: this.netDividend(),
      managerMonthlyRevenu: this.managerMonthlyRevenu(),
      managerYearlyRevenu: this.managerYearlyRevenu(),
      managerIncomeRevenuRatio: this.managerIncomeRevenuRatio(),
      percentDividend: this.percentDividend,
      netResult: this.netResult(),
      monthlyNetSalary: this.monthlyNetSalary,
      yearlyNetSalary: this.yearlyNetSalary(),
      yearlyChargedSalary: this.yearlyChargedSalary(),
      yearlySalaryCotisations: this.yearlySalaryCotisations(),
      dividendCotisations: this.dividendCotisations(),
      incomeTaxOnDividend: this.incomeTaxOnDividend(),
      yearlyRepaidExpenses: this.yearlyRepaidExpenses(),
      yearlyExpenses: this.yearlyExpenses(),
      managerYearlyTaxableRevenu: this.managerYearlyTaxableRevenu(),
      yearlyTaxableRepayableExpenses: this.yearlyTaxableRepayableExpenses(),
      monthlyTaxableRepayableExpenses: this.monthlyTaxableRepayableExpenses,
    }
  }
}

