const WEEKS_IN_YEAR = 52;
export const TAX_THRESHOLD = 42500;

export type SimulationData = {
  name?: string;
  companyType?: string;
  dailyRate?: number;
  weeksOff?: number;
  weeksOn?: number;
  daysPerWeek?: number;
  yearlyExpenses?: number;
  monthlyNetSalary?: number;
  incomeTaxRate?: number;
  percentDividend?: number;
}

export class Simulation {
  name: string;
  _companyType: string;
  _dailyRate: number;
  _weeksOff: number;
  _weeksOn: number;
  _daysPerWeek: number;
  _yearlyExpenses: number;
  _monthlyNetSalary: number;
  _incomeTaxRate: number;
  _percentDividend: number;

  constructor(initialValues: SimulationData = {}) {
    this.name = initialValues.name || 'Simulation';
    this._companyType = initialValues.companyType || 'SASU';
    this._dailyRate = this._getDefaultNumber(initialValues.dailyRate, 500);
    this._weeksOff = this._getDefaultNumber(initialValues.weeksOff, 10);
    this._weeksOn = this._getDefaultNumber(initialValues.weeksOn, 42);
    this._daysPerWeek = this._getDefaultNumber(initialValues.daysPerWeek, 5);
    this._yearlyExpenses = this._getDefaultNumber(initialValues.yearlyExpenses, 10000);
    this._monthlyNetSalary = this._getDefaultNumber(initialValues.monthlyNetSalary, 0);
    this._incomeTaxRate = this._getDefaultNumber(initialValues.incomeTaxRate, 10);
    this._percentDividend = this._getDefaultNumber(initialValues.percentDividend, 100);
  }

  _getDefaultNumber(value?:number, defaultValue?:any) {
    if (value === 0) {
      return 0;
    }
    return value || defaultValue;
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

  get incomeTaxRate() {
    return this._incomeTaxRate;
  }
  set incomeTaxRate(value) {
    value = this._checkInput(value, 0, 100, 0)
    this._incomeTaxRate = value;
  }

  get percentDividend() {
    return this._percentDividend;
  }
  set percentDividend(value) {
    value = this._checkInput(value, 0, 100, 0)
    this._percentDividend = value;
  }

  get yearlyExpenses() {
    return this._yearlyExpenses;
  }
  set yearlyExpenses(value) {
    value = this._checkInput(value, 0, null, 10000)
    this._yearlyExpenses = value;
  }

  get monthlyNetSalary() {
    return this._monthlyNetSalary;
  }
  set monthlyNetSalary(value) {
    value = this._checkInput(value, 0, null, 0)
    this._monthlyNetSalary = value;
  }

  get dailyRate() {
    return this._dailyRate;
  }
  set dailyRate(value) {
    value = this._checkInput(value, 0, null, 0)
    this._dailyRate = value
  }

  get weeksOff() {
    return this._weeksOff;
  }
  set weeksOff(value) {
    value = this._checkInput(value, 0, WEEKS_IN_YEAR, 0)
    this._weeksOff = value;
    this._weeksOn = WEEKS_IN_YEAR - this._weeksOff;
  }

  get weeksOn() {
    return this._weeksOn;
  }
  set weeksOn(value) {
    value = this._checkInput(value, 0, WEEKS_IN_YEAR, 0)
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

  montlyRevenu() {
    return this.yearlyRevenu() / 12;
  }

  yearlyNetSalary() {
    return 12 * this.monthlyNetSalary;
  }

  yearlySalaryCotisations() {
    if (this._companyType === 'SASU') {
      return 0.75 * this.yearlyNetSalary();
    } else if (this._companyType === 'EURL') {
      return 0.45 * this.yearlyNetSalary();
    }
    throw new Error('Invalid company type');
  }

  yearlyTotalCost() {
    return this.yearlyExpenses + this.yearlyNetSalary() + this.yearlySalaryCotisations();
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

  managermontlyRevenu() {
    return this.manageryearlyRevenu() / 12;
  }

  manageryearlyRevenu() {
    return this.netDividend() + this.yearlyNetSalary() - this.incomeTax() - this.incomeTaxOnDividend();
  }

  manageIncomeRevenuRatio() {
    return this.managermontlyRevenu() / this.montlyRevenu();
  }

  netResult() {
    return this.netEarnings() - this.dividend();
  }

  incomeTaxOnDividend() {
    return this.dividend() * 0.128;
  }

  incomeTax() {
    return this.yearlyNetSalary() * 1.1 * this._incomeTaxRate / 100;
  }

  _checkInput(value:any, min?:number | null, max?:number | null, defaultValue?:number) {
    value = parseFloat(value || 0);
    if (!value && defaultValue) {
      return defaultValue;
    } else if ((min || min === 0) && value < min) {
      return min;
    } else if ((max || max === 0) && value > max) {
      return max;
    }
    return value
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
      montlyRevenu: this.montlyRevenu(),
      yearlyExpenses: this.yearlyExpenses,
      yearlyTotalCost: this.yearlyTotalCost(),
      rawEarnings: this.rawEarnings(),
      earningsTax: this.earningsTax(),
      netEarnings: this.netEarnings(),
      dividend: this.dividend(),
      netDividend: this.netDividend(),
      managermontlyRevenu: this.managermontlyRevenu(),
      manageryearlyRevenu: this.manageryearlyRevenu(),
      manageIncomeRevenuRatio: this.manageIncomeRevenuRatio(),
      percentDividend: this.percentDividend,
      netResult: this.netResult(),
      monthlyNetSalary: this.monthlyNetSalary,
      yearlyNetSalary: this.yearlyNetSalary(),
      incomeTaxRate: this.incomeTaxRate,
      incomeTax: this.incomeTax(),
      yearlySalaryCotisations: this.yearlySalaryCotisations(),
      dividendCotisations: this.dividendCotisations(),
      incomeTaxOnDividend: this.incomeTaxOnDividend(),
    }
  }
}

