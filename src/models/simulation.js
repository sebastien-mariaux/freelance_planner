const WEEKS_IN_YEAR = 52;

export class Simulation {
  constructor(initialValues = {}) {
    this.name = initialValues.name || 'Simulation';
    this.dailyRate = initialValues.dailyRate || 500;
    this._weeksOff = initialValues.weeksOff || 10;
    this._weeksOn = initialValues.weeksOn || 42;
    this._daysPerWeek = initialValues.daysPerWeek || 5;
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

  serialize() {
    return {
      name: this.name,
      dailyRate: this.dailyRate,
      weeksOff: this.weeksOff,
      weeksOn: this.weeksOn,
      daysPerWeek: this.daysPerWeek,
      yearlyIncome: this.yearlyIncome(),
      monthlyIncome: this.monthlyIncome(),
    }
  }

  yearlyIncome() {
    return this.dailyRate * this.daysPerWeek * this.weeksOn;
  }

  monthlyIncome() {
    return this.yearlyIncome() / 12;
  }

}



