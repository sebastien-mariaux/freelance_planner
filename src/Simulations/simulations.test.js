import { fireEvent, render, screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import Simulations, { defaultSimulations } from "./Simulations";
import { displayAmount, displayPercent } from "./simulationsHelper";
import {BrowserRouter as Router} from 'react-router-dom';

beforeEach(() => {
  window.localStorage.clear();
});

const renderSimulations = () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<Simulations />} />
      </Routes>
    </Router>
  );
};
describe('render Simulations inputs', () => {
  it('show dailyRate', () => {
    renderSimulations()
    expect(screen.getAllByTestId('dailyRate').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.dailyRate)
    );
  });
  it('show daysPerWeek', () => {
    renderSimulations()
    expect(screen.getAllByTestId('daysPerWeek').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.daysPerWeek)
    );
  })
  it('show weeksOff', () => {
    renderSimulations()
    expect(screen.getAllByTestId('weeksOff').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.weeksOff)
    );
  })
  it('show weeksOn', () => {
    renderSimulations()
    expect(screen.getAllByTestId('weeksOn').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.weeksOn)
    );
  })
  it('show monthlyExpenses', () => {
    renderSimulations()
    expect(screen.getAllByTestId('monthlyExpenses').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.monthlyExpenses)
    );
  })
  it('show monthlyNetSalary', () => {
    renderSimulations()
    expect(screen.getAllByTestId('monthlyNetSalary').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.monthlyNetSalary)
    );
  })
  it('show percentDividend', () => {
    renderSimulations()
    expect(screen.getAllByTestId('percentDividend').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.percentDividend)
    );
  })
  it('show incomeTaxRate', () => {
    renderSimulations()
    expect(screen.getAllByTestId('incomeTaxRate').map((el) => parseFloat(el.value))).toEqual(
      defaultSimulations.map((el) => el.incomeTaxRate)
    );
  })
  it('show name', () => {
    renderSimulations()
    expect(screen.getAllByTestId('name').map((el) => el.value)).toEqual(
      defaultSimulations.map((el) => el.name)
    );
  })
});

describe('render simulations results', () => {
  it('show yearlyRevenu', () => {
    renderSimulations()
    expect(screen.getAllByTestId('yearlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyRevenu))
    );
  });
  it('show monthlyRevenu', () => {
    renderSimulations()
    expect(screen.getAllByTestId('monthlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.monthlyRevenu))
    );
  });
  it('show yearlySalaryCotisations', () => {
    renderSimulations()
    expect(screen.getAllByTestId('yearlySalaryCotisations').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlySalaryCotisations))
    );
  });
  it('show yearlyChargedSalary', () => {
    renderSimulations()
    expect(screen.getAllByTestId('yearlyChargedSalary').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyChargedSalary))
    );
  })
  it('show yearlyTotalCost', () => {
    renderSimulations()
    expect(screen.getAllByTestId('yearlyTotalCost').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyTotalCost))
    );
  })

  it('show rawEarnings', () => {
    renderSimulations()
    expect(screen.getAllByTestId('rawEarnings').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.rawEarnings))
    );
  })
  it('show earningsTax', () => {
    renderSimulations()
    expect(screen.getAllByTestId('earningsTax').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.earningsTax))
    );
  })
  it('show netEarnings', () => {
    renderSimulations()
    expect(screen.getAllByTestId('netEarnings').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netEarnings))
    );
  })
  it('show dividend', () => {
    renderSimulations()
    expect(screen.getAllByTestId('dividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.dividend))
    );
  })
  it('show netResult', () => {
    renderSimulations()
    expect(screen.getAllByTestId('netResult').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netResult))
    );
  })
  it('show dividendCotisations', () => {
    renderSimulations()
    expect(screen.getAllByTestId('dividendCotisations').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.dividendCotisations))
    );
  })

  it('show yearlyNetSalary', () => {
    renderSimulations()
    expect(screen.getAllByTestId('yearlyNetSalary').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.yearlyNetSalary))
    );
  })
  it('show incomeTax', () => {
    renderSimulations()
    expect(screen.getAllByTestId('incomeTax').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.incomeTax))
    );
  })
  it('show netDividend', () => {
    renderSimulations()
    expect(screen.getAllByTestId('netDividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.netDividend))
    );
  })
  it('show incomeTaxOnDividend', () => {
    renderSimulations()
    expect(screen.getAllByTestId('incomeTaxOnDividend').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.incomeTaxOnDividend))
    );
  })
  it('show managerYearlyRevenu', () => {
    renderSimulations()
    expect(screen.getAllByTestId('managerYearlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.managerYearlyRevenu))
    );
  })
  it('show managerMonthlyRevenu', () => {
    renderSimulations()
    expect(screen.getAllByTestId('managerMonthlyRevenu').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayAmount(el.managerMonthlyRevenu))
    );
  })
  it('show managerIncomeRevenuRatio', () => {
    renderSimulations()
    expect(screen.getAllByTestId('managerIncomeRevenuRatio').map((el) => el.textContent)).toEqual(
      defaultSimulations.map((el) => displayPercent(el.managerIncomeRevenuRatio))
    );
  })
});

describe('update dailyRate', () => {
  it('update dailyRate', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('dailyRate')[0];
    fireEvent.change(inputElt, { target: { value: 100 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('100');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update dailyRate with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('dailyRate')[0];
    fireEvent.change(inputElt, { target: { value: -100 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update daysPerWeek', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('daysPerWeek')[0];
    fireEvent.change(inputElt, { target: { value: 2 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('2');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update daysPerWeek with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('daysPerWeek')[0];
    fireEvent.change(inputElt, { target: { value: 9 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('7');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update weeksOn', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('weeksOn')[0];
    fireEvent.change(inputElt, { target: { value: 50 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('50');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update weeksOn with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('weeksOn')[0];
    fireEvent.change(inputElt, { target: { value: -50 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update weeksOff', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('weeksOff')[0];
    fireEvent.change(inputElt, { target: { value: 20 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('20');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update weeksOff with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('weeksOff')[0];
    fireEvent.change(inputElt, { target: { value: 200 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('52');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update monthlyExpenses', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('monthlyExpenses')[0];
    fireEvent.change(inputElt, { target: { value: 8000 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('8000');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update monthlyExpenses with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('monthlyExpenses')[0];
    fireEvent.change(inputElt, { target: { value: -8000 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update monthlyRepayableExpenses', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('monthlyRepayableExpenses')[0];
    fireEvent.change(inputElt, { target: { value: 800 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('800');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update monthlyRepayableExpenses with invalid value', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('monthlyRepayableExpenses')[0];
    fireEvent.change(inputElt, { target: { value: -800 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu)
  })
  it('update monthlyNetSalary', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('monthlyNetSalary')[0];
    fireEvent.change(inputElt, { target: { value: 2000 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('2000');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu);
  })
  it('update percentDividend', async () => {
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[0].textContent;
    const inputElt = screen.getAllByTestId('percentDividend')[0];
    fireEvent.change(inputElt, { target: { value: 20 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('20');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu);
  })
  it('update percentDividend with invalid value', async () => {
    renderSimulations()
    const inputElt = screen.getAllByTestId('percentDividend')[0];
    fireEvent.change(inputElt, { target: { value: -20 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
  })
  it('update incomeTaxRate', async () => {
    // Test on second simulation as salary is 0 by default for the first one
    renderSimulations()
    const currentManagerMonthlyRevenu = screen.getAllByTestId('managerMonthlyRevenu')[1].textContent;
    const inputElt = screen.getAllByTestId('incomeTaxRate')[1];
    fireEvent.change(inputElt, { target: { value: 30 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('30');
    expect(screen.getAllByTestId('managerMonthlyRevenu')[0].textContent).not.toEqual(currentManagerMonthlyRevenu);
  })
  it('update incomeTaxRate with invalid value', async () => {
    renderSimulations()
    const inputElt = screen.getAllByTestId('incomeTaxRate')[0];
    fireEvent.change(inputElt, { target: { value: -10 } });
    fireEvent.blur(inputElt);
    expect(inputElt.value).toBe('0');
  })
})

describe('test action buttons', () => {
  it('add simulation', async () => {
    renderSimulations()
    expect(screen.getAllByTestId('name').length).toBe(2);
    const addSimulationButton = screen.getByTestId('add-simulation');
    fireEvent.click(addSimulationButton);
    expect(screen.getAllByTestId('name').length).toBe(3);
  })
  it('remove simulation', async () => {
    renderSimulations()
    expect(screen.getAllByTestId('name').length).toBe(2);
    const removeSimulationButton = screen.getAllByTestId('remove-simulation')[0];
    fireEvent.click(removeSimulationButton);
    expect(screen.getAllByTestId('name').length).toBe(1);
  })
  it('duplicate simulation', async () => {
    renderSimulations()
    expect(screen.getAllByTestId('name').length).toBe(2);
    const inputElt = screen.getAllByTestId('monthlyNetSalary')[0];
    fireEvent.change(inputElt, { target: { value: 2000 } });
    fireEvent.blur(inputElt);
    const duplicateSimulationButton = screen.getAllByTestId('duplicate-simulation')[0];
    fireEvent.click(duplicateSimulationButton);
    expect(screen.getAllByTestId('name').length).toBe(3);
    expect(screen.getAllByTestId('monthlyNetSalary')[2].value).toBe('2000');
  })
  it('reset data', async () => {
    renderSimulations()
    expect(screen.getAllByTestId('name').length).toBe(2);
    const addSimulationButton = screen.getByTestId('add-simulation');
    fireEvent.click(addSimulationButton);
    expect(screen.getAllByTestId('name').length).toBe(3);
    const resetDataButton = screen.getByTestId('reset-data');
    fireEvent.click(resetDataButton);
    expect(screen.getAllByTestId('name').length).toBe(2);
  })
})

