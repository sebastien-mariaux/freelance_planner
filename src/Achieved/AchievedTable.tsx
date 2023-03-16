import React from "react";
import { SingleInput } from "../Simulations/SimulationRow/InputRow";
import { displayAmount } from "../Simulations/simulationsHelper";
import { CompletedMonth, TotalsData } from "./Achieved";

interface AchievedTableProps {
  completedMonths: CompletedMonth[],
  setCompletedMonths: (completedMonths: CompletedMonth[]) => void,
  totals: TotalsData
}

export default function AchievedTable({ completedMonths, setCompletedMonths, totals }: AchievedTableProps) {

  const saveData = (data: CompletedMonth[]) => {
    localStorage.setItem('completedMonths', JSON.stringify(data))
  }

  const updateData = (index: number, label: string, value: string) => {
    const newCompletedMonths = [...completedMonths];
    const currentMonth = newCompletedMonths[index];
    currentMonth[label] = parseFloat(value);
    setCompletedMonths(newCompletedMonths);
    saveData(newCompletedMonths);
  }

  const checkCompleted = (index: number) => {
    const newCompletedMonths = [...completedMonths];
    const currentMonth = newCompletedMonths[index];
    currentMonth.completed = !currentMonth.completed;
    setCompletedMonths(newCompletedMonths);
  }

  return (
    <table >
      <thead style={styles.thead}>
        <tr >
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>Mois</th>
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>Chiffre d'affaires</th>
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>Salaire net</th>
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>Charges remboursables</th>
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>Autres charges</th>
          <th style={{ textAlign: 'center', padding: '0.2em 1em' }}>clôturé</th>
        </tr>
      </thead>
      <tbody>
        {completedMonths.map((month, index) => (
          <tr key={index} >
            <td style={{ textAlign: 'left' }}>{month.month}</td>
            <td style={{ textAlign: 'right' }}>
              <SingleInput
                // style={{ width: 'auto' }}
                data={month}
                index={index}
                label='revenu'
                updateData={updateData}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              <SingleInput
                // style={{ width: 'auto' }}
                data={month}
                index={index}
                label='netSalary'
                updateData={updateData}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              <SingleInput
                // style={{ width: 'auto' }}
                data={month}
                index={index}
                label='repayableExpenses'
                updateData={updateData}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              <SingleInput
                // style={{ width: 'auto' }}
                data={month}
                index={index}
                label='otherExpenses'
                updateData={updateData}
              />
            </td>
            <td style={{ textAlign: 'right' }}>
              <input type="checkbox" checked={month.completed} onChange={() => checkCompleted(index)} />
            </td>
          </tr>
        ))}
        <tr style={styles.totalRow}>
          <td style={{ textAlign: 'left' }}>Total</td>
          <td style={{ textAlign: 'right' }}>{displayAmount(totals.completedRevenu)}</td>
          <td style={{ textAlign: 'right' }}>{displayAmount(totals.completedSalaries)}</td>
          <td style={{ textAlign: 'right' }}>{displayAmount(totals.repayedExpenses)}</td>
          <td style={{ textAlign: 'right' }}>{displayAmount(totals.otherCompletedExpenses)}</td>
          <td style={{ textAlign: 'right' }}>{totals.completedMonthCount}</td>

        </tr>
      </tbody>
    </table>
  )
}

const styles = {
  thead: {
    textAlign: 'left' as 'left',
    backgroundColor: '#000',
    color: '#fff',
  },
  totalRow: {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold'
  }
}