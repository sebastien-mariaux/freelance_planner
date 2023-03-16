import React from 'react';
import { Achieved } from '../models/achieved';
import { displayAmount } from '../Simulations/simulationsHelper';
import {  TotalsData } from './Achieved';

interface AchievedSummaryProps {
  totals: TotalsData;
  companyType: string;
}

export default function AchievedSummary({ totals, companyType }: AchievedSummaryProps) {

  const getComputer = () => {
    return new Achieved({
      companyType: companyType,
      expenses: totals.otherCompletedExpenses,
      completedSalaries: totals.completedSalaries,
      incomeTaxRate: 0,
      percentDividend: 100,
      repayableExpenses: totals.repayedExpenses,
      revenu: totals.completedRevenu,
      monthesCount: totals.completedMonthCount,
    })
  }

  const computer = getComputer().run()
  console.log(computer)

  return (
    <div style={styles.container}>
      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left', paddingRight: '2em' }}>Bénéfice après IS</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{displayAmount(computer.netEarnings)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', paddingRight: '2em' }}>Dividende à verser</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{displayAmount(computer.netDividend)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', paddingRight: '2em' }}>Revenu mensuel net moyen </td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{displayAmount(computer.managerMonthlyRevenu)}</td>
          </tr>
        </tbody>
      </table>
    </div>)
}

const styles = {
  container: {
    marginTop: '2em',
    border: '1px solid #000',
    backgroundColor: '#ebebeb',
    width: 'fit-content',
    padding: '0.5em',
  }
}