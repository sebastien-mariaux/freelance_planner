import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Simulations, { defaultSimulations } from "./Simulations";
import { displayAmount, displayPercent } from "./simulationsHelper";

describe('render Simulations inputs', () => {
  it('show dailyRate', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('dailyRate').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.dailyRate)
    );
  });
  it('show daysPerWeek', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('daysPerWeek').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.daysPerWeek)
    );
  })
  it('show weeksOff', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('weeksOff').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.weeksOff)
    );
  })
  it('show weeksOn', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('weeksOn').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.weeksOn)
    );
  })
  it('show yearlyExpenses', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlyExpenses').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.yearlyExpenses)
    );
  })
  it('show monthlyNetSalary', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('monthlyNetSalary').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.monthlyNetSalary)
    );
  })
  it('show percentDividend', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('percentDividend').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.percentDividend)
    );
  })
  it('show incomeTaxRate', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('incomeTaxRate').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.incomeTaxRate)
    );
  })
  it('show name', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('name').map((el) => el.value)).toEqual(
      defaultSimulations.map((el) => el.name)
    );
  })
});

describe('render simulations results', () => {
  it('show yearlyRevenu', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyRevenu))
    );
  });
  it('show monthlyRevenu', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('monthlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.monthlyRevenu))
    );
  });
  it('show yearlySalaryCotisations', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlySalaryCotisations').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlySalaryCotisations))
    );
  });
  it('show yearlyChargedSalary', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlyChargedSalary').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyChargedSalary))
    );
  })
  it('show yearlyTotalCost', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlyTotalCost').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyTotalCost))
    );
  })

  it('show rawEarnings', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('rawEarnings').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.rawEarnings))
    );
  })
  it('show earningsTax', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('earningsTax').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.earningsTax))
    );
  })
  it('show netEarnings', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('netEarnings').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netEarnings))
    );
  })
  it('show dividend', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('dividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.dividend))
    );
  })
  it('show netResult', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('netResult').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netResult))
    );
  })
  it('show dividendCotisations', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('dividendCotisations').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.dividendCotisations))
    );
  })

  it('show yearlyNetSalary', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('yearlyNetSalary').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyNetSalary))
    );
  })
  it('show incomeTax', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('incomeTax').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.incomeTax))
    );
  })
  it('show netDividend', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('netDividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netDividend))
    );
  })
  it('show incomeTaxOnDividend', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('incomeTaxOnDividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.incomeTaxOnDividend))
    );
  })
  it('show managerYearlyRevenu', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('managerYearlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.managerYearlyRevenu))
    );
  })
  it('show managerMonthlyRevenu', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('managerMonthlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.managerMonthlyRevenu))
    );
  })
  it('show manageIncomeRevenuRatio', () => {
    render(<Simulations />);
    expect(screen.getAllByTestId('manageIncomeRevenuRatio').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayPercent(el.manageIncomeRevenuRatio))
    );
  })
});

describe('update dailyRate', () => {
  it('update dailyRate', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('dailyRate')[0];
    fireEvent.change(inputElt, { target: { value: 100 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('100');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(21000));
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).toEqual(displayAmount(545.42));
  })
  it('update dailyRate with invalid value', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('dailyRate')[0];
    fireEvent.change(inputElt, { target: { value: -100 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(0));
  })
  it('update daysPerWeek', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('daysPerWeek')[0];
    fireEvent.change(inputElt, { target: { value: 2 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('2');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(42000));
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).toEqual(displayAmount(1586.67));
  })
  it('update daysPerWeek with invalid value', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('daysPerWeek')[0];
    fireEvent.change(inputElt, { target: { value: 9 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('7');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(147000));
  })
  it('update weeksOn', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('weeksOn')[0];
    fireEvent.change(inputElt, { target: { value: 50 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('50');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(125000));
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).toEqual(displayAmount(5279.17));
  })
  it('update weeksOn with invalid value', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('weeksOn')[0];
    fireEvent.change(inputElt, { target: { value: -50 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(0));
  })
  it('update weeksOff', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('weeksOff')[0];
    fireEvent.change(inputElt, { target: { value: 20 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('20');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(80000));
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).toEqual(displayAmount(3310.42));
  })
  it('update weeksOff with invalid value', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('weeksOff')[0];
    fireEvent.change(inputElt, { target: { value: 200 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('52');
    expect(screen.getAllByTestId('yearlyRevenu')[0].textContent).toEqual(displayAmount(0));
  })
  it('update yearlyExpenses', async () => {
    render(<Simulations />);
    const inputElt = screen.getAllByTestId('yearlyExpenses')[0];
    fireEvent.change(inputElt, { target: { value: 8000 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('8000');
    expect(screen.getAllByTestId('yearlyTotalCost')[0].textContent).toEqual(displayAmount(8000));
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).toEqual(displayAmount(4491.67));
  })

})