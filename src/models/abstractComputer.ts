
export const TAX_THRESHOLD = 42500;

export type AbstractComputerData = {
  companyType?: string;
  monthlyExpenses?: number;
  percentDividend?: number;
  monthlyRepayableExpenses?: number;
  monthlyTaxableRepayableExpenses?: number;
  monthesCount?: number;
}



export class AbstractComputer {
  _companyType: string;
  _monthesCount: number;
  _monthlyExpenses: number;
  _percentDividend: number;
  _monthlyRepayableExpenses: number;
  _monthlyTaxableRepayableExpenses: number;


  constructor(initialValues: AbstractComputerData = {}) {
    if (this.constructor === AbstractComputer) {
      throw new TypeError('Abstract class "AbstractConfig" cannot be instantiated directly');
    }
    this._companyType = initialValues.companyType || 'SASU';
    this._monthlyExpenses = this._checkInput({ value: initialValues.monthlyExpenses, min: 0, defaultValue: 1000 });
    this._percentDividend = this._checkInput({ value: initialValues.percentDividend, min: 0, max: 100, defaultValue: 100 });
    this._monthlyRepayableExpenses = this._checkInput({ value: initialValues.monthlyRepayableExpenses, min: 0, defaultValue: 0 });
    this._monthlyTaxableRepayableExpenses = this._checkInput({ value: initialValues.monthlyTaxableRepayableExpenses, min: 0, defaultValue: 0 });
    this._monthesCount = this._checkInput({ value: initialValues.monthesCount, min: 0, max: 12, defaultValue: 12 });
  }

  get companyType() {
    return this._companyType;
  }
  set companyType(value: string) {
    if (['SASU', 'EURL'].includes(value)) {
      this._companyType = value;
    } else {
      this._companyType = 'SASU';
    }
  }

  get monthlyRepayableExpenses() {
    return this._monthlyRepayableExpenses;
  }
  set monthlyRepayableExpenses(value) {
    value = this._checkInput({ value: value, min: 0, max: null, defaultValue: 0 })
    this._monthlyRepayableExpenses = value;
  }
  get monthlyTaxableRepayableExpenses() {
    return this._monthlyTaxableRepayableExpenses;
  }
  set monthlyTaxableRepayableExpenses(value) {
    value = this._checkInput({ value: value, min: 0, max: null, defaultValue: 0 })
    this._monthlyTaxableRepayableExpenses = value;
  }
  get percentDividend() {
    return this._percentDividend;
  }
  set percentDividend(value) {
    value = this._checkInput({ value: value, min: 0, max: 100, defaultValue: 100 })
    this._percentDividend = value;
  }

  get monthlyExpenses() {
    return this._monthlyExpenses;
  }
  set monthlyExpenses(value) {
    value = this._checkInput({ value: value, min: 0, max: null, defaultValue: 1000 })
    this._monthlyExpenses = value;
  }

  monthlyRevenu(): number {
    throw new Error("Method 'monthlyRevenu()' must be implemented.");
  }

  yearlyNetSalary(): number {
    throw new Error("Method 'yearlyNetSalary()' must be implemented.");
  }

  yearlySalaryCotisations() {
    if (this._companyType === 'SASU') {
      return 0.75 * this.yearlyNetSalary();
    } else if (this._companyType === 'EURL') {
      return 0.45 * this.yearlyNetSalary();
    }
    throw new Error('Invalid company type');
  }

  yearlyChargedSalary(): number {
    return this.yearlyNetSalary() + this.yearlySalaryCotisations();
  }

  yearlyRepayableExpenses(): number {
    throw new Error("Method 'yearlyRepayableExpenses()' must be implemented.");
  }

  yearlyTaxableRepayableExpenses(): number {
    throw new Error("Method 'yearlyTaxableRepayableExpenses()' must be implemented.");
  }

  yearlyRepaidExpenses(): number {
    return this.yearlyRepayableExpenses() + this.yearlyTaxableRepayableExpenses();
  }

  yearlyTaxableRepaidExpenses(): number {
    return this.yearlyTaxableRepayableExpenses();
  }

  yearlyExpenses(): number {
    throw new Error("Method 'yearlyExpenses()' must be implemented.");
  }

  yearlyRevenu(): number {
    throw new Error("Method 'yearlyRevenu()' must be implemented.");
  }

  yearlyTotalCost() {
    return this.yearlyExpenses() + this.yearlyChargedSalary() + this.yearlyRepayableExpenses() + this.yearlyTaxableRepayableExpenses();
  }

  rawEarnings() {
    return this.yearlyRevenu() - this.yearlyTotalCost();
  }

  earningsTax() {
    if (this.rawEarnings() <= 0) {
      return 0
    }
    const belowThreshold = Math.min(this.rawEarnings(), TAX_THRESHOLD);
    const overThreshold = Math.max(this.rawEarnings() - TAX_THRESHOLD, 0);
    return 0.15 * belowThreshold + 0.25 * overThreshold;
  }

  netEarnings() {
    return this.rawEarnings() - this.earningsTax();
  }

  dividend() {
    const netEarnings = this.netEarnings();
    if (netEarnings <= 0) {
      return 0;
    }
    return netEarnings * this.percentDividend / 100;
  }

  dividendCotisations() {
    if (this._companyType === 'SASU') {
      return 0.172 * this.dividend();
    } else if (this._companyType === 'EURL') {
      return 0.45 * this.dividend();
    }
    throw new Error('Invalid company type');
  }

  netDividend() {
    return this.dividend() - this.dividendCotisations();
  }

  managerMonthlyRevenu() {
    return this.managerYearlyRevenu() / this._monthesCount;
  }

  managerYearlyRevenu() {
    return this.netDividend() + this.yearlyNetSalary() - this.incomeTaxOnDividend() + this.yearlyRepaidExpenses()
  }

  managerYearlyTaxableRevenu(): number {
    return this.yearlyNetSalary() + this.yearlyTaxableRepaidExpenses();
  }

  managerIncomeRevenuRatio() {
    if (this.monthlyRevenu() === 0) {
      return 0;
    }

    return this.managerMonthlyRevenu() / this.monthlyRevenu();
  }

  netResult() {
    return this.netEarnings() - this.dividend();
  }

  incomeTaxOnDividend() {
    return this.dividend() * 0.128;
  }

  _checkInput({ value, min, max, defaultValue }:
    { value: any, min?: number | null, max?: number | null, defaultValue?: number }) {
    if (value === -10) { debugger }
    if ((value === null || value === undefined) && defaultValue) {
      return defaultValue;
    }
    value = parseFloat(value || 0);

    if ((min || min === 0) && value < min) {
      return min;
    } else if ((max || max === 0) && value > max) {
      return max;
    }
    return value
  }
}

