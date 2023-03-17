import { round2 } from "../helpers";
import { TAX_THRESHOLD } from "./abstractComputer";
import { Simulation } from "./simulation";


describe('constructor', () => {
  it('should set default values', () => {
    const simulation = new Simulation();
    expect(simulation.name).toBe('Simulation');
    expect(simulation.companyType).toBe('SASU');
    expect(simulation.dailyRate).toBe(500);
    expect(simulation.weeksOff).toBe(10);
    expect(simulation.weeksOn).toBe(42);
    expect(simulation.daysPerWeek).toBe(5);
    expect(simulation.monthlyExpenses).toBe(1000);
    expect(simulation.monthlyNetSalary).toBe(0);
    expect(simulation.percentDividend).toBe(100);
    expect(simulation.monthlyRepayableExpenses).toBe(0);
  })
  it('should set values from initialValues', () => {
    const simulation = new Simulation({
      name: 'test',
      companyType: 'EURL',
      dailyRate: 100,
      weeksOff: 12,
      weeksOn: 40,
      daysPerWeek: 6,
      monthlyExpenses: 2000,
      monthlyNetSalary: 1000,
      percentDividend: 50,
      monthlyRepayableExpenses: 100,
    });
    expect(simulation.name).toBe('test');
    expect(simulation.companyType).toBe('EURL');
    expect(simulation.dailyRate).toBe(100);
    expect(simulation.weeksOff).toBe(12);
    expect(simulation.weeksOn).toBe(40);
    expect(simulation.daysPerWeek).toBe(6);
    expect(simulation.monthlyExpenses).toBe(2000);
    expect(simulation.monthlyNetSalary).toBe(1000);
    expect(simulation.percentDividend).toBe(50);
    expect(simulation.monthlyRepayableExpenses).toBe(100);
  })
})

describe('setters', () => {
  const simulation = new Simulation();
  it('should set companyType', () => {
    simulation.companyType = 'EURL';
    expect(simulation.companyType).toBe('EURL');
    simulation.companyType = 'SASU';
    expect(simulation.companyType).toBe('SASU');
    simulation.companyType = 'test';
    expect(simulation.companyType).toBe('SASU');
  })
  it('should set dailyRate', () => {
    simulation.dailyRate = 100;
    expect(simulation.dailyRate).toBe(100);
    simulation.dailyRate = -100;
    expect(simulation.dailyRate).toBe(0);
  })
  it('should set weeksOff', () => {
    simulation.weeksOff = 12;
    expect(simulation.weeksOff).toBe(12);
    expect(simulation.weeksOn).toBe(40);
    simulation.weeksOff = -12;
    expect(simulation.weeksOff).toBe(0);
    expect(simulation.weeksOn).toBe(52);
  })
  it('should set weeksOn', () => {
    simulation.weeksOn = 40;
    expect(simulation.weeksOff).toBe(12);
    expect(simulation.weeksOn).toBe(40);
    simulation.weeksOn = -40;
    expect(simulation.weeksOff).toBe(52);
    expect(simulation.weeksOn).toBe(0);
  })
  it('should set daysPerWeek', () => {
    simulation.daysPerWeek = 6;
    expect(simulation.daysPerWeek).toBe(6);
    simulation.daysPerWeek = -6;
    expect(simulation.daysPerWeek).toBe(0);
    simulation.daysPerWeek = 8;
    expect(simulation.daysPerWeek).toBe(7);
  })
  it('should set monthlyExpenses', () => {
    simulation.monthlyExpenses = 2000;
    expect(simulation.monthlyExpenses).toBe(2000);
    simulation.monthlyExpenses = -2000;
    expect(simulation.monthlyExpenses).toBe(0);
  })
  it('should set monthlyNetSalary', () => {
    simulation.monthlyNetSalary = 1000;
    expect(simulation.monthlyNetSalary).toBe(1000);
    simulation.monthlyNetSalary = -1000;
    expect(simulation.monthlyNetSalary).toBe(0);
  })
  it('should set percentDividend', () => {
    simulation.percentDividend = 50;
    expect(simulation.percentDividend).toBe(50);
    simulation.percentDividend = -50;
    expect(simulation.percentDividend).toBe(0);
    simulation.percentDividend = 150;
    expect(simulation.percentDividend).toBe(100);
  })
  it('should set monthlyRepayableExpenses', () => {
    simulation.monthlyRepayableExpenses = 100;
    expect(simulation.monthlyRepayableExpenses).toBe(100);
    simulation.monthlyRepayableExpenses = -100;
    expect(simulation.monthlyRepayableExpenses).toBe(0);
  })
})
describe("with NaN inputs", () => {
  const simulation = new Simulation();
  simulation.dailyRate = NaN;
  simulation.weeksOn = NaN;
  simulation.daysPerWeek = NaN;
  simulation.monthlyExpenses = NaN;
  simulation.monthlyNetSalary = NaN;
  simulation.percentDividend = NaN;
  simulation.monthlyRepayableExpenses = NaN;
  it('should set dailyRate to 0', () => {
    expect(simulation.dailyRate).toBe(0);
  })
  it('should set weeksOn to 0', () => {
    expect(simulation.weeksOn).toBe(0);
  })
  it('should set daysPerWeek to 0', () => {
    expect(simulation.daysPerWeek).toBe(0);
  })
  it('should set monthlyExpenses to 0', () => {
    expect(simulation.monthlyExpenses).toBe(0);
  })
  it('should set monthlyNetSalary to 0', () => {
    expect(simulation.monthlyNetSalary).toBe(0);
  })
  it('should set percentDividend to 0', () => {
    expect(simulation.percentDividend).toBe(0);
  })
  it('should set monthlyRepayableExpenses to 0', () => {
    expect(simulation.monthlyRepayableExpenses).toBe(0);
  })
})

describe('monthlyRevenu', () => {
  const simulation = new Simulation({ dailyRate: 100, daysPerWeek: 5, weeksOn: 50, weeksOff: 2 });
  it('should return 100*5*50/12', () => {
    expect(round2(simulation.monthlyRevenu())).toBe(2083.33);
  })
  it('should return 0 if dailyRate is 0', () => {
    simulation.dailyRate = 0;
    expect(simulation.monthlyRevenu()).toBe(0);
  })
  it('should return 0 if daysPerWeek is 0', () => {
    simulation.daysPerWeek = 0;
    expect(simulation.monthlyRevenu()).toBe(0);
  })
  it('should return 0 if weeksOn is 0', () => {
    simulation.weeksOn = 0;
    expect(simulation.monthlyRevenu()).toBe(0);
  })
})
describe('rawEarnings', () => {
  const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12, monthlyRepayableExpenses: 300 });
  expect(simulation.yearlyRevenu()).toBe(117500);
  it('should compute', () => {
    expect(simulation.yearlyTotalCost()).toBe(10000 + 3600)
    expect(round2(simulation.rawEarnings())).toBe(117500 - 10000 - 3600);
  })
  it('should compute with deducted yearlyRawSalary', () => {
    simulation.monthlyNetSalary = 1000;
    expect(simulation.yearlyTotalCost()).toBe(31000 + 3600)
    expect(round2(simulation.rawEarnings())).toBe(117500 - 31000 - 3600);
  })
})
describe('yearlySalaryCotisations', () => {
  const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12, monthlyNetSalary: 1000 });
  it('should return 750 if companyType is SASU', () => {
    simulation.companyType = 'SASU';
    expect(simulation.yearlySalaryCotisations()).toBe(750 * 12);
  })
  it('should return 450 if companyType is EURL', () => {
    simulation.companyType = 'EURL';
    expect(simulation.yearlySalaryCotisations()).toBe(450 * 12);
  })
})
describe('earningsTax', () => {
  describe('with big earnings', () => {
    it('should compute', () => {
      const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12 });
      expect(simulation.yearlyRevenu()).toBe(117500);
      expect(simulation.yearlyTotalCost()).toBe(10000)
      expect(round2(simulation.rawEarnings())).toBe(107500);
      const expected = TAX_THRESHOLD * 0.15 + (107500 - TAX_THRESHOLD) * 0.25
      expect(round2(simulation.earningsTax())).toBe(expected);
    })
  })
  describe('with no earnings', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 0, weeksOff: 52, monthlyExpenses: 10000 / 12 });
    it('should compute 0', () => {
      expect(simulation.weeksOn).toBe(0);
      expect(round2(simulation.rawEarnings())).toBeLessThan(0);
      expect(round2(simulation.earningsTax())).toBe(0);
    })
  })
  describe('with negative earnings', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 1, weeksOff: 51, monthlyExpenses: 10000 / 12 });
    it('should compute 0', () => {
      expect(round2(simulation.rawEarnings())).toBeLessThan(0);
      expect(round2(simulation.earningsTax())).toBe(0);
    })
  })
  describe('with small earnings', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 10, weeksOff: 42, monthlyExpenses: 10000 / 12 });
    it('should compute 0', () => {
      expect(simulation.rawEarnings()).toBeLessThan(TAX_THRESHOLD)
      expect(simulation.rawEarnings()).toBeGreaterThan(0)
      const expected = simulation.rawEarnings() * 0.15
      expect(round2(simulation.earningsTax())).toBe(expected);
    })
  })
})
describe('netEarnings', () => {
  const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12 });
  expect(simulation.yearlyRevenu()).toBe(117500);
  expect(simulation.rawEarnings()).toBe(107500);
  expect(simulation.earningsTax()).toBe(22625);

  it('should compute', () => {
    expect(simulation.netEarnings()).toBe(107500 - 22625);
  })
})
describe('dividend', () => {
  it('should return 0 if netEarnings is negative', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 1, weeksOff: 51, monthlyExpenses: 10000 / 12 });
    expect(simulation.netEarnings()).toBeLessThan(0);
    expect(simulation.dividend()).toBe(0);
  })
  it('should return netEarnings if netEarnings is positive', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12 });
    expect(simulation.netEarnings()).toBeGreaterThan(0);
    expect(simulation.dividend()).toBe(107500 - 22625);
  })
  describe("with 50% dividend", () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12, percentDividend: 50 });
    it('should return 50% of netEarnings', () => {
      expect(round2(simulation.dividend())).toBe((107500 - 22625) * 0.5);
    })
  })
})
describe('dividendCotisations', () => {
  it('should return 0 if netEarnings is negative', () => {
    const simulation = new Simulation({ monthlyExpenses: 10000 / 12, weeksOn: 1, weeksOff: 51 });
    expect(simulation.netEarnings()).toBeLessThan(0);
    expect(round2(simulation.dividendCotisations())).toBe(0);
  })
  it('should compute for SASU', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12 });
    expect(simulation.netEarnings()).toBe(107500 - 22625);
    expect(simulation.dividend()).toBe(107500 - 22625);
    simulation.companyType = 'SASU';
    expect(round2(simulation.dividendCotisations())).toBe(14598.5);
    expect(round2(simulation.netDividend())).toBe(107500 - 22625 - 14598.5);
  })
  it('should compute for EURL', () => {
    const simulation = new Simulation({ dailyRate: 500, daysPerWeek: 5, weeksOn: 47, weeksOff: 15, monthlyExpenses: 10000 / 12 });
    expect(simulation.netEarnings()).toBe(107500 - 22625);
    expect(simulation.dividend()).toBe(107500 - 22625);
    simulation.companyType = 'EURL';
    expect(simulation.dividendCotisations()).toBe(38193.75);
    expect(simulation.netDividend()).toBe(107500 - 22625 - 38193.75);
  })
})


