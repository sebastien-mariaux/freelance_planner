import React, { useEffect, useState } from "react";
import { mainStyles } from "../mainStyles";
import NavMenu from "../NavMenu/NavMenu";
import AchievedSummary from "./AchievedSummary";
import AchievedTable from "./AchievedTable";

export interface CompletedMonth {
  month: string,
  revenu: number,
  netSalary: number,
  repayableExpenses: number,
  otherExpenses: number,
  [key: string]: any;
}

const defaultCompletedMonths = [
  { month: 'Janvier', revenu: 8000, netSalary: 3000, repayableExpenses: 300, otherExpenses: 800, completed: true },
  { month: 'Février', revenu: 7500, netSalary: 0, repayableExpenses: 300, otherExpenses: 725, completed: true },
  { month: 'Mars', revenu: 6000, netSalary: 4000, repayableExpenses: 300, otherExpenses: 653, completed: true },
  { month: 'Avril', revenu: 4000, netSalary: 2000, repayableExpenses: 300, otherExpenses: 950, completed: true },
  { month: 'Mai', revenu: 8000, netSalary: 1000, repayableExpenses: 300, otherExpenses: 250, completed: true },
  { month: 'Juin', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Juillet', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Août', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Septembre', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Octobre', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Novembre', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
  { month: 'Décembre', revenu: 0, netSalary: 0, repayableExpenses: 0, otherExpenses: 0, completed: false },
]

export interface TotalsData {
  completedRevenu: number,
  completedSalaries: number,
  repayedExpenses: number,
  otherCompletedExpenses: number,
  completedMonthCount: number
}

export default function Achieved() {
  const [completedMonths, setCompletedMonths] = useState<CompletedMonth[]>([])

  useEffect(() => {
    const savedCompletedMonths = localStorage.getItem('completedMonths')
    if (savedCompletedMonths) {
      setCompletedMonths(JSON.parse(savedCompletedMonths))
    } else {
      setCompletedMonths(defaultCompletedMonths)
    }
  }, [])

  const completedRevenu = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.revenu, 0)
  const completedSalaries = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.netSalary, 0)
  const repayedExpenses = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.repayableExpenses, 0)
  const otherCompletedExpenses = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.otherExpenses, 0)
  const completedMonthCount = completedMonths.filter((e) => e.completed).length



  const totals: TotalsData = {
    completedRevenu,
    completedSalaries,
    repayedExpenses,
    otherCompletedExpenses,
    completedMonthCount
  }

  return (
    <div className="achieved">
      <NavMenu activeItem='achieved' />
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginBottom: 0 }}>Réalisé</h2>
      </div>
      <div style={mainStyles.infoSection}>
        <div style={mainStyles.info}>
          (?) Complétez vos revenus et charges des mois terminés pour faire un point d'avancement en cours d'annéé
          et estimer ce que vous avez gagné à ce stade.
        </div>
        <div style={mainStyles.info}>
          /!\ Les calculs prennent en compte l'IR sur les dividendes (forfait) mais pas sur les salaires
        </div>
        <div style={mainStyles.info}>
          /!\ Les salaires versées sont donc à considérer avant impôt
        </div>
      </div>
      <AchievedTable
        completedMonths={completedMonths}
        setCompletedMonths={setCompletedMonths}
        totals={totals}
      />
      <AchievedSummary
        totals={totals}
      />

    </div>
  )
}