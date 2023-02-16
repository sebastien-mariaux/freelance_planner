const WEEKS_IN_YEAR = 52;
export const TAX_THRESHOLD = 42500;

export class Simulation {
  constructor(initialValues = {}) {
    console.log(initialValues)
    this.name = initialValues.name || 'Simulation';
    this._dailyRate = this.getDefaultValue(initialValues.dailyRate, 500);
    this._weeksOff = this.getDefaultValue(initialValues.weeksOff, 10);
    this._weeksOn = this.getDefaultValue(initialValues.weeksOn, 42);
    this._daysPerWeek = this.getDefaultValue(initialValues.daysPerWeek, 5);
    this._dailyFoodCost = this.getDefaultValue(initialValues.dailyFoodCost, 10);
    this._yearlyRentRepayed = this.getDefaultValue(initialValues.yearlyRentRepayed, 3500);
    this._yearlyRent = this.getDefaultValue(initialValues.yearlyRent, 0);
    this._yearlyAccountingCost = this.getDefaultValue(initialValues.yearlyAccountingCost, 1200);
    this._yearlyPowerCostRepayed = this.getDefaultValue(initialValues.yearlyPowerCostRepayed, 0);
    this._yearlyInternetCostRepayed = this.getDefaultValue(initialValues.yearlyInternetCostRepayed, 0);
    this._yearlyPhoneCost = this.getDefaultValue(initialValues.yearlyPhoneCost, 0);
    this._yearlyProInsuranceCost = this.getDefaultValue(initialValues.yearlyProInsuranceCost, 450);
    this._yearlyOtherInsuranceCost = this.getDefaultValue(initialValues.yearlyOtherInsuranceCost, 0);
    this._yearlyBankingCost = this.getDefaultValue(initialValues.yearlyBankingCost, 120);
    this._yearlyFurnitureCost = this.getDefaultValue(initialValues.yearlyFurnitureCost, 400);
    this._yearlyOtherCost = this.getDefaultValue(initialValues.yearlyOtherCost, 100);
    this._monthlyNetSalary = this.getDefaultValue(initialValues.monthlyNetSalary, 0);
  }

  getDefaultValue(value, defaultValue) {
    if (value === 0) {
      return 0;
    }
    return value || defaultValue;
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
  get yearlyPowerCostRepayed() {
    return this._yearlyPowerCostRepayed;
  }
  set yearlyPowerCostRepayed(value) {
    this._yearlyPowerCostRepayed = parseFloat(value) || 0.0;
  }
  get dailyFoodCost() {
    return this._dailyFoodCost;
  }
  set dailyFoodCost(value) {
    return this._dailyFoodCost = parseFloat(value) || 0.0;
  }
  get yearlyRentRepayed() {
    return this._yearlyRentRepayed
  }
  set yearlyRentRepayed(value) {
    this._yearlyRentRepayed = parseFloat(value) || 0.0
  }
  get yearlyRent() {
    return this._yearlyRent
  }
  set yearlyRent(value) {
    this._yearlyRent = parseFloat(value) || 0.0
  }
  get yearlyAccountingCost() {
    return this._yearlyAccountingCost
  }
  set yearlyAccountingCost(value) {
    this._yearlyAccountingCost = parseFloat(value) || 0.0
  }
  get yearlyInternetCostRepayed() {
    return this._yearlyInternetCostRepayed
  }
  set yearlyInternetCostRepayed(value) {
    this._yearlyInternetCostRepayed = parseFloat(value) || 0.0
  }
  get yearlyPhoneCost() {
    return this._yearlyPhoneCost
  }
  set yearlyPhoneCost(value) {
    this._yearlyPhoneCost = parseFloat(value) || 0.0
  }
  get yearlyProInsuranceCost() {
    return this._yearlyProInsuranceCost
  }
  set yearlyProInsuranceCost(value) {
    this._yearlyProInsuranceCost = parseFloat(value) || 0.0
  }
  get yearlyOtherInsuranceCost() {
    return this._yearlyOtherInsuranceCost
  }
  set yearlyOtherInsuranceCost(value) {
    this._yearlyOtherInsuranceCost = parseFloat(value) || 0.0
  }
  get yearlyBankingCost() {
    return this._yearlyBankingCost
  }
  set yearlyBankingCost(value) {
    this._yearlyBankingCost = parseFloat(value) || 0.0
  }
  get yearlyFurnitureCost() {
    return this._yearlyFurnitureCost
  }
  set yearlyFurnitureCost(value) {
    this._yearlyFurnitureCost = parseFloat(value) || 0.0
  }
  get yearlyOtherCost() {
    return this._yearlyOtherCost
  }
  set yearlyOtherCost(value) {
    this._yearlyOtherCost = parseFloat(value) || 0.0
  }

  yearlyIncome() {
    return this.dailyRate * this.daysPerWeek * this.weeksOn;
  }

  monthlyIncome() {
    return this.yearlyIncome() / 12;
  }

  yearlyFoodCost() {
    return this.dailyFoodCost * this.daysPerWeek * this.weeksOn;
  }

  yearlyTotalCost() {
    return this.yearlyFoodCost()
      + this.yearlyRent
      + this.yearlyAccountingCost
      + this.yearlyPhoneCost
      + this.yearlyProInsuranceCost
      + this.yearlyOtherInsuranceCost
      + this.yearlyBankingCost
      + this.yearlyFurnitureCost
      + this.yearlyOtherCost
      + this.yearlyRentRepayed
      + this.yearlyInternetCostRepayed
      + this.yearlyPowerCostRepayed;
  }

  montlyAverageCost() {
    return this.yearlyTotalCost() / 12.0;
  }

  rawEarnings() {
    return this.yearlyIncome() - this.yearlyTotalCost() - this.yearlyRawSalary();
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
    return netEarnings;
  }

  netDividend() {
    return this.dividend() * 0.7;
  }

  managerMonthlyIncome() {
    return this.managerYearlyIncome() / 12;
  }

  managerYearlyIncome() {
    return this.netDividend() + this.yearlyRentRepayed + this.yearlyPowerCostRepayed + this.yearlyInternetCostRepayed;
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
      dailyFoodCost: this.dailyFoodCost,
      yearlyFoodCost: this.yearlyFoodCost(),
      yearlyRent: this.yearlyRent,
      yearlyRentRepayed: this.yearlyRentRepayed,
      yearlyAccountingCost: this.yearlyAccountingCost,
      yearlyInternetCostRepayed: this.yearlyInternetCostRepayed,
      yearlyPhoneCost: this.yearlyPhoneCost,
      yearlyProInsuranceCost: this.yearlyProInsuranceCost,
      yearlyOtherInsuranceCost: this.yearlyOtherInsuranceCost,
      yearlyBankingCost: this.yearlyBankingCost,
      yearlyFurnitureCost: this.yearlyFurnitureCost,
      yearlyOtherCost: this.yearlyOtherCost,
      yearlyTotalCost: this.yearlyTotalCost(),
      montlyAverageCost: this.montlyAverageCost(),
      rawEarnings: this.rawEarnings(),
      earningsTax: this.earningsTax(),
      netEarnings: this.netEarnings(),
      dividend: this.dividend(),
      netDividend: this.netDividend(),
      managerMonthlyIncome: this.managerMonthlyIncome(),
      manageIncomeRevenuRatio: this.manageIncomeRevenuRatio(),
      yearlyPowerCostRepayed: this.yearlyPowerCostRepayed,
      percentDividend: this.percentDividend,
      netResult: this.netResult(),
      monthlyNetSalary: this.monthlyNetSalary,
      yearlyNetSalary: this.yearlyNetSalary(),
      yearlyRawSalary: this.yearlyRawSalary(),
    }
  }
}

