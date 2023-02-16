import { Simulation, TAX_THRESHOLD } from "./simulation";

const defaultExpenses = {
  dailyFoodCost: 10,
  yearlyRent: 3000,
  yearlyAccountingCost: 1000,
  yearlyPhoneCost: 500,
  yearlyProInsuranceCost: 400,
  yearlyOtherInsuranceCost: 0,
  yearlyBankingCost: 0,
  yearlyFurnitureCost: 0,
  yearlyOtherCost: 0,
  yearlyRentRepayed: 3500,
  yearlyInternetCostRepayed: 100,
  yearlyPowerCostRepayed: 0
}
// write test for simulation class
describe('Simulation', () => {
  const simulation = new Simulation();

  describe('set percentDividend', () => {
    it('should set percentDividend to 0 if value is less than 0', () => {
      simulation.percentDividend = -1;
      expect(simulation.percentDividend).toBe(0);
    })
    it('should set percentDividend to 0 if value is null', () => {
      simulation.percentDividend = null;
      expect(simulation.percentDividend).toBe(0);
    })
    it('should set percentDividend to 0 if value is undefined', () => {
      simulation.percentDividend = undefined;
      expect(simulation.percentDividend).toBe(0);
    })

    it('should set percentDividend to 100 if value is greater than 100', () => {
      simulation.percentDividend = 101;
      expect(simulation.percentDividend).toBe(100);
    })
    it('should modify percentSalary', () => {
      simulation.percentSalary = 80;
      simulation.percentDividend = 60;
      expect(simulation.percentSalary).toBe(40);
    })
    it('should not modify percentSalary', () => {
      simulation.percentSalary = 10;
      simulation.percentDividend = 60;
      expect(simulation.percentSalary).toBe(10);
    })
  })
  describe('set percentSalary', () => {
    it('should set percentSalary to 0 if value is less than 0', () => {
      simulation.percentSalary = -1;
      expect(simulation.percentSalary).toBe(0);
    })
    it('should set percentSalary to 0 if value is null', () => {
      simulation.percentSalary = null;
      expect(simulation.percentSalary).toBe(0);
    })
    it('should set percentSalary to 0 if value is undefined', () => {
      simulation.percentSalary = undefined;
      expect(simulation.percentSalary).toBe(0);
    })

    it('should set percentSalary to 100 if value is greater than 100', () => {
      simulation.percentSalary = 101;
      expect(simulation.percentSalary).toBe(100);
    })
    it('should modify percentDividend', () => {
      simulation.percentDividend = 80;
      simulation.percentSalary = 60;
      expect(simulation.percentDividend).toBe(40);
    })
    it('should not modify percentDividend', () => {
      simulation.percentDividend = 10;
      simulation.percentSalary = 60;
      expect(simulation.percentDividend).toBe(10);
    })
  })
  describe('set dailyRate', () => {
    it('should set dailyRate to 0 if value is less than 0', () => {
      simulation.dailyRate = -1;
      expect(simulation.dailyRate).toBe(0);
    })
    it('should set dailyRate to 0 if value is null', () => {
      simulation.dailyRate = null;
      expect(simulation.dailyRate).toBe(0);
    })
    it('should set dailyRate to 0 if value is undefined', () => {
      simulation.dailyRate = undefined;
      expect(simulation.dailyRate).toBe(0);
    })
  })
  describe('set daysPerWeek', () => {
    it('should set daysPerWeek to 0 if value is less than 0', () => {
      simulation.daysPerWeek = -1;
      expect(simulation.daysPerWeek).toBe(0);
    })
    it('should set daysPerWeek to 0 if value is null', () => {
      simulation.daysPerWeek = null;
      expect(simulation.daysPerWeek).toBe(0);
    })
    it('should set daysPerWeek to 0 if value is undefined', () => {
      simulation.daysPerWeek = undefined;
      expect(simulation.daysPerWeek).toBe(0);
    })
    it('should set daysPerWeek to 7 if value is more than 7', () => {
      simulation.daysPerWeek = 8;
      expect(simulation.daysPerWeek).toBe(7);
    })
  })
  describe('set weeksOff', () => {
    it('should set weeksOff to 0 if value is less than 0', () => {
      simulation.weeksOff = -1;
      expect(simulation.weeksOff).toBe(0);
    })
    it('should set weeksOff to 0 if value is null', () => {
      simulation.weeksOff = null;
      expect(simulation.weeksOff).toBe(0);
    })
    it('should set weeksOff to 0 if value is undefined', () => {
      simulation.weeksOff = undefined;
      expect(simulation.weeksOff).toBe(0);
    })
    it('should set weeksOff to 52 if value is more than 52', () => {
      simulation.weeksOff = 53;
      expect(simulation.weeksOff).toBe(52);
    })
    it('should set weeksOn to 52 - weeksOff', () => {
      simulation.weeksOff = 10;
      expect(simulation.weeksOn).toBe(42);
    })
  })
  describe('set weeksOn', () => {
    it('should set weeksOn to 0 if value is less than 0', () => {
      simulation.weeksOn = -1;
      expect(simulation.weeksOn).toBe(0);
    })
    it('should set weeksOn to 0 if value is null', () => {
      simulation.weeksOn = null;
      expect(simulation.weeksOn).toBe(0);
    })
    it('should set weeksOn to 0 if value is undefined', () => {
      simulation.weeksOn = undefined;
      expect(simulation.weeksOn).toBe(0);
    })
    it('should set weeksOn to 52 if value is more than 52', () => {
      simulation.weeksOn = 53;
      expect(simulation.weeksOn).toBe(52);
    })
    it('should set weeksOff to 52 - weeksOn', () => {
      simulation.weeksOn = 10;
      expect(simulation.weeksOff).toBe(42);
    })
  })

  describe('yearlyIncome', () => {
    const simulation = new Simulation({ dailyRate: 100, daysPerWeek: 5, weeksOn: 50, weeksOff: 2 });
    it('should return 100*5*50', () => {
      expect(simulation.yearlyIncome()).toBe(25000);
    })
    it('should return 0 if dailyRate is 0', () => {
      simulation.dailyRate = 0;
      expect(simulation.yearlyIncome()).toBe(0);
    })
    it('should return 0 if daysPerWeek is 0', () => {
      simulation.daysPerWeek = 0;
      expect(simulation.yearlyIncome()).toBe(0);
    })
    it('should return 0 if weeksOn is 0', () => {
      simulation.weeksOn = 0;
      expect(simulation.yearlyIncome()).toBe(0);
    })
  })
  describe('monthlyIncome', () => {
    const simulation = new Simulation({ dailyRate: 100, daysPerWeek: 5, weeksOn: 50, weeksOff: 2 });
    it('should return 100*5*50/12', () => {
      expect(round2(simulation.monthlyIncome())).toBe(2083.33);
    })
    it('should return 0 if dailyRate is 0', () => {
      simulation.dailyRate = 0;
      expect(simulation.monthlyIncome()).toBe(0);
    })
    it('should return 0 if daysPerWeek is 0', () => {
      simulation.daysPerWeek = 0;
      expect(simulation.monthlyIncome()).toBe(0);
    })
    it('should return 0 if weeksOn is 0', () => {
      simulation.weeksOn = 0;
      expect(simulation.monthlyIncome()).toBe(0);
    })
  })
  describe('rawEarnings', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, ...defaultExpenses });
    expect(simulation.yearlyIncome()).toBe(117500);
    expect(round2(simulation.yearlyTotalCost())).toBe(10850);
    it('should return 106650', () => {
      expect(round2(simulation.rawEarnings())).toBe(106650);
    })
  })
  describe('earningsTax', () => {
    describe('with big earnings', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, ...defaultExpenses });
      expect(simulation.yearlyIncome()).toBe(117500);
      expect(round2(simulation.yearlyTotalCost())).toBe(10850);
      expect(round2(simulation.rawEarnings())).toBe(106650);

      it('should compute', () => {
        const expected = TAX_THRESHOLD * 0.15 + (106650 - TAX_THRESHOLD) * 0.25
        expect(round2(simulation.earningsTax())).toBe(expected);
      })
    })
    describe('with no earnings', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 0, weeksOff: 52, ...defaultExpenses });
      it('should compute 0', () => {
        expect(round2(simulation.rawEarnings())).toBeLessThan(0);
        expect(round2(simulation.earningsTax())).toBe(0);
      })
    })
    describe('with negative earnings', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 1, weeksOff: 51, ...defaultExpenses });
      it('should compute 0', () => {
        expect(round2(simulation.rawEarnings())).toBeLessThan(0);
        expect(round2(simulation.earningsTax())).toBe(0);
      })
    })
    describe('with small earnings', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 10, weeksOff: 42, ...defaultExpenses });
      it('should compute 0', () => {
        expect(simulation.rawEarnings()).toBeLessThan(TAX_THRESHOLD)
        expect(simulation.rawEarnings()).toBeGreaterThan(0)
        const expected = simulation.rawEarnings() * 0.15
        expect(round2(simulation.earningsTax())).toBe(expected);
      })
    })
  })
  describe('netEarnings', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, ...defaultExpenses });
    expect(simulation.yearlyIncome()).toBe(117500);
    expect(round2(simulation.yearlyTotalCost())).toBe(10850);
    expect(round2(simulation.rawEarnings())).toBe(106650);
    expect(round2(simulation.earningsTax())).toBe(22412.5);

    it('should compute', () => {
      expect(round2(simulation.netEarnings())).toBe(84237.5);
    })
  })
  describe('dividend', () => {
    it('should return 0 if percentDividend is 0', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 0, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.dividend())).toBe(0);
    })
    it('should return 0 if netEarnings is negative', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 1, weeksOff: 51, percentDividend: 10, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeLessThan(0);
      expect(round2(simulation.dividend())).toBe(0);
    })
    it('should return netEarnings if percentDividend is 100', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 100, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.dividend())).toBe(84237.5);
    })
    it('should return netEarnings * percentDividend / 100', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 10, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.dividend())).toBe(8423.75);
    })
  })
  describe('netDividend', () => {
    it('should return 0 if percentDividend is 0', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 0, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.netDividend())).toBe(0);
    })
    it('should return 0.7*netEarnings if percentDividend is 100', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 100, ...defaultExpenses });
      expect(simulation.dividend()).toBe(84237.5);
      expect(round2(simulation.netDividend())).toBe(58966.25);
    })
    it('should return 0.7*dividend', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentDividend: 10, ...defaultExpenses });
      expect(simulation.dividend()).toBe(8423.75);
      expect(round2(simulation.netDividend())).toBe(5896.63);
    })
  })
  describe('salary', () => {
    it('should return 0 if percentSalary is 0', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentSalary: 0, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.salary())).toBe(0);
    })
    it('should return 0 if netEarnings is negative', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 1, weeksOff: 51, percentSalary: 10, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeLessThan(0);
      expect(round2(simulation.salary())).toBe(0);
    })
    it('should return netEarnings if percentSalary is 100', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentSalary: 100, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.salary())).toBe(84237.5);
    })
    it('should return netEarnings * percentSalary / 100', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, percentSalary: 10, ...defaultExpenses });
      expect(simulation.netEarnings()).toBeGreaterThan(0);
      expect(round2(simulation.salary())).toBe(8423.75);
    })
  })
})

// function to round number to 2 decimal places
function round2(num) {
  return Math.round(num * 100) / 100;
}
