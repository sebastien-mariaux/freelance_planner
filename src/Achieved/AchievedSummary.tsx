import React from 'react';
import { Achieved } from '../models/achieved';
import { displayAmount } from '../Simulations/simulationsHelper';
import {  TotalsData } from './Achieved';

interface AchievedSummaryProps {
  totals: TotalsData
}

export default function AchievedSummary({ totals }: AchievedSummaryProps) {

  const getComputer = () => {
    return new Achieved({
      companyType: 'SASU',
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
    <div>
      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Bénéfice après IS</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.netEarnings)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Dividende à verser</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.netDividend)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Revenu mensuel net moyen </td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.managerMonthlyRevenu)}</td>
          </tr>
        </tbody>
      </table>
    </div>)
}

