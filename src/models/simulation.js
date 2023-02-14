const WEEKS_IN_YEAR = 52;
const TAX_THRESHOLD = 42500;

export class Simulation {
  constructor(initialValues = {}) {
    this.name = initialValues.name || 'Simulation';
    this.dailyRate = initialValues.dailyRate || 500;
    this._weeksOff = initialValues.weeksOff || 10;
    this._weeksOn = initialValues.weeksOn || 42;
    this._daysPerWeek = initialValues.daysPerWeek || 5;
    this._dailyFoodCost = initialValues.dailyFoodCost || 10;
    this._yearlyRent = initialValues.yearlyRent || 3500;
    this._yearlyAccountingCost = initialValues.yearlyAccountingCost || 1200;
    this._yearlyInternetCost = initialValues.yearlyInternetCost || 0;
    this._yearlyPhoneCost = initialValues.yearlyPhoneCost || 0;
    this._yearlyProInsuranceCost = initialValues.yearlyProInsuranceCost || 450;
    this._yearlyOtherInsuranceCost = initialValues.yearlyOtherInsuranceCost || 0;
    this._yearlyBankingCost = initialValues.yearlyBankingCost || 120;
    this._yearlyFurnitureCost = initialValues.yearlyFurnitureCost || 400;
    this._yearlyOtherCost = initialValues.yearlyOtherCost || 100;
  }


  get weeksOff() {
    return this._weeksOff;
  }
  set weeksOff(value) {
    this._weeksOff = parseInt(value);
    this._weeksOn = WEEKS_IN_YEAR - this._weeksOff;
  }
  get weeksOn() {
    return this._weeksOn;
  }
  set weeksOn(value) {
    this._weeksOn = parseInt(value);
    this._weeksOff = WEEKS_IN_YEAR - this._weeksOn;
  }
  get daysPerWeek() {
    return this._daysPerWeek;
  }
  set daysPerWeek(value) {
    if (value < 0 || value > 7) {
      throw new Error('daysPerWeek must be between 0 and 7');
    }
    this._daysPerWeek = value;
  }
  get dailyFoodCost() {
    return this._dailyFoodCost;
  }
  set dailyFoodCost(value) {
    return this._dailyFoodCost = parseFloat(value) || 0;
  }
  get yearlyRent() {
    return this._yearlyRent
  }
  set yearlyRent(value) {
    this._yearlyRent = parseFloat(value) || 0
  }
  get yearlyAccountingCost() {
    return this._yearlyAccountingCost
  }
  set yearlyAccountingCost(value) {
    this._yearlyAccountingCost = parseFloat(value) || 0
  }
  get yearlyInternetCost() {
    return this._yearlyInternetCost
  }
  set yearlyInternetCost(value) {
    this._yearlyInternetCost = parseFloat(value) || 0
  }
  get yearlyPhoneCost() {
    return this._yearlyPhoneCost
  }
  set yearlyPhoneCost(value) {
    this._yearlyPhoneCost = parseFloat(value) || 0
  }
  get yearlyProInsuranceCost() {
    return this._yearlyProInsuranceCost
  }
  set yearlyProInsuranceCost(value) {
    this._yearlyProInsuranceCost = parseFloat(value) || 0
  }
  get yearlyOtherInsuranceCost() {
    return this._yearlyOtherInsuranceCost
  }
  set yearlyOtherInsuranceCost(value) {
    this._yearlyOtherInsuranceCost = parseFloat(value) || 0
  }
  get yearlyBankingCost() {
    return this._yearlyBankingCost
  }
  set yearlyBankingCost(value) {
    this._yearlyBankingCost = parseFloat(value) || 0
  }
  get yearlyFurnitureCost() {
    return this._yearlyFurnitureCost
  }
  set yearlyFurnitureCost(value) {
    this._yearlyFurnitureCost = parseFloat(value) || 0
  }
  get yearlyOtherCost() {
    return this._yearlyOtherCost
  }
  set yearlyOtherCost(value) {
    this._yearlyOtherCost = parseFloat(value) || 0
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
      yearlyAccountingCost: this.yearlyAccountingCost,
      yearlyInternetCost: this.yearlyInternetCost,
      yearlyPhoneCost: this.yearlyPhoneCost,
      yearlyProInsuranceCost: this.yearlyProInsuranceCost,
      yearlyOtherInsuranceCost: this.yearlyOtherInsuranceCost,
      yearlyBankingCost: this.yearlyBankingCost,
      yearlyFurnitureCost: this.yearlyFurnitureCost,
      yearlyOtherCost: this.yearlyOtherCost,
      yearlyTotalCost: this.yearlyTotalCost(),
      montlyAverageCost: this.montlyAverageCost(),
      rawIncome: this.rawIncome(),
      incomeTax: this.incomeTax(),
      netIncome: this.netIncome(),
      dividend: this.netIncome(),
      netDividend: this.netDividend(),
      managerMonthlyIncome: this.managerMonthlyIncome(),
    }
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
      + this.yearlyInternetCost
      + this.yearlyPhoneCost
      + this.yearlyProInsuranceCost
      + this.yearlyOtherInsuranceCost
      + this.yearlyBankingCost
      + this.yearlyFurnitureCost
      + this.yearlyOtherCost;
  }

  montlyAverageCost() {
    return this.yearlyTotalCost() / 12.0;
  }

  rawIncome() {
    return this.yearlyIncome() - this.yearlyTotalCost();
  }

  incomeTax() {
    if (this.rawIncome() <=0) {
      return 0
    }
    const belowThreshold = Math.min(this.rawIncome(), TAX_THRESHOLD);
    const overThreshold = Math.max(this.rawIncome() - TAX_THRESHOLD, 0);
    return 0.15 * belowThreshold + 0.25 * overThreshold;
  }

  netIncome() {
    return this.rawIncome() - this.incomeTax();
  }

  netDividend() {
    return this.netIncome() * 0.7;
  }

  managerMonthlyIncome() {
    return this.netDividend() / 12;
  }
}



