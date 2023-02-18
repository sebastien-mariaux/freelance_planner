const WEEKS_IN_YEAR = 52;
export const TAX_THRESHOLD = 42500;

export class Simulation {
  constructor(initialValues = {}) {
    this.name = initialValues.name || 'Simulation';
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

  yearlyIncome() {
    return this.dailyRate * this.daysPerWeek * this.weeksOn;
  }

  monthlyIncome() {
    return this.yearlyIncome() / 12;
  }


  yearlyTotalCost() {
    return this.yearlyExpenses + this.yearlyRawSalary();
  }

  monthlyExpenses() {
    return this.yearlyExpenses / 12.0;
  }


  rawEarnings() {
    return this.yearlyIncome() - this.yearlyExpenses - this.yearlyRawSalary();
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

  netDividend() {
    return this.dividend() * 0.7;
  }

  managerMonthlyIncome() {
    return this.managerYearlyIncome() / 12;
  }

  managerYearlyIncome() {
    return this.netDividend() + this.yearlyNetSalary() - this.incomeTax();
  }

  manageIncomeRevenuRatio() {
    return this.managerMonthlyIncome() / this.monthlyIncome();
  }

  netResult() {
    return this.netEarnings() - this.dividend();
  }

  yearlyNetSalary() {
    return 12 * this.monthlyNetSalary;
  }

  yearlyRawSalary() {
    return 1.65 * this.yearlyNetSalary();
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
      dailyRate: this.dailyRate,
      weeksOff: this.weeksOff,
      weeksOn: this.weeksOn,
      daysPerWeek: this.daysPerWeek,
      yearlyIncome: this.yearlyIncome(),
      monthlyIncome: this.monthlyIncome(),
      yearlyExpenses: this.yearlyExpenses,
      yearlyTotalCost: this.yearlyTotalCost(),
      monthlyExpenses: this.monthlyExpenses(),
      rawEarnings: this.rawEarnings(),
      earningsTax: this.earningsTax(),
      netEarnings: this.netEarnings(),
      dividend: this.dividend(),
      netDividend: this.netDividend(),
      managerMonthlyIncome: this.managerMonthlyIncome(),
      managerYearlyIncome: this.managerYearlyIncome(),
      manageIncomeRevenuRatio: this.manageIncomeRevenuRatio(),
      yearlyPowerCostRepayed: this.yearlyPowerCostRepayed,
      percentDividend: this.percentDividend,
      netResult: this.netResult(),
      monthlyNetSalary: this.monthlyNetSalary,
      yearlyNetSalary: this.yearlyNetSalary(),
      yearlyRawSalary: this.yearlyRawSalary(),
      incomeTaxRate: this.incomeTaxRate,
      incomeTax: this.incomeTax(),

    }
  }
}

