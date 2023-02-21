const WEEKS_IN_YEAR = 52;
export const TAX_THRESHOLD = 42500;

export class Simulation {
  constructor(initialValues = {}) {
    this.name = initialValues.name || 'Simulation';
    this._companyType = initialValues.companyType || 'SASU';
    this._dailyRate = this.getDefaultValue(initialValues.dailyRate, 500);
    this._weeksOff = this.getDefaultValue(initialValues.weeksOff, 10);
    this._weeksOn = this.getDefaultValue(initialValues.weeksOn, 42);
    this._daysPerWeek = this.getDefaultValue(initialValues.daysPerWeek, 5);
    this._yearlyExpenses = this.getDefaultValue(initialValues.yearlyExpenses, 10000);
    this._monthlyNetSalary = this.getDefaultValue(initialValues.monthlyNetSalary, 0);
    this._incomeTaxRate = this.getDefaultValue(initialValues.incomeTaxRate, 10);
    this._percentDividend = this.getDefaultValue(initialValues.percentDividend, 100);
  }

  getDefaultValue(value, defaultValue) {
    if (value === 0) {
      return 0;
    }
    return value || defaultValue;
  }
  get companyType() {
    return this._companyType;
  }
  set companyType(value) {
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
    value = this._checkInput(0, 100, value, 0)
    this._incomeTaxRate = value;
  }
  get percentDividend() {
    return this._percentDividend;
  }
  set percentDividend(value) {
    value = this._checkInput(0, 100, value, 0)
    this._percentDividend = value;
  }

  get yearlyExpenses() {
    return this._yearlyExpenses;
  }
  set yearlyExpenses(value) {
    value = this._checkInput(0, null, value, 10000)
    this._yearlyExpenses = value;
  }

  get monthlyNetSalary() {
    return this._monthlyNetSalary;
  }
  set monthlyNetSalary(value) {
    value = this._checkInput(0, null, value, 0)
    this._monthlyNetSalary = value;
  }
  get dailyRate() {
    return this._dailyRate;
  }
  set dailyRate(value) {
    value = this._checkInput(0, null, value, 0)
    this._dailyRate = value
  }

  get weeksOff() {
    return this._weeksOff;
  }
  set weeksOff(value) {
    value = this._checkInput(0, WEEKS_IN_YEAR, value, 0)
    this._weeksOff = value;
    this._weeksOn = WEEKS_IN_YEAR - this._weeksOff;
  }
  get weeksOn() {
    return this._weeksOn;
  }
  set weeksOn(value) {
    value = this._checkInput(0, WEEKS_IN_YEAR, value, 0)
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

  _checkInput(min, max, value, defaultValue) {
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
      yearlyPowerCostRepayed: this.yearlyPowerCostRepayed,
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

