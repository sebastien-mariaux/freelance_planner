import React, { useEffect, useState } from "react";
import { mainStyles } from "../mainStyles";
import NavMenu from "../NavMenu/NavMenu";
import AchievedSummary from "./AchievedSummary";
import AchievedTable from "./AchievedTable";

const defaultCompletedMonths = [
  {
    month: "Janvier",
    revenu: 8000,
    netSalary: 3000,
    taxableRepayableExpenses: 290,
    repayableExpenses: 100,
    otherExpenses: 800,
    completed: true,
  },
  {
    month: "Février",
    revenu: 7500,
    netSalary: 0,
    taxableRepayableExpenses: 290,
    repayableExpenses: 100,
    otherExpenses: 725,
    completed: true,
  },
  {
    month: "Mars",
    revenu: 6000,
    netSalary: 4000,
    taxableRepayableExpenses: 290,
    repayableExpenses: 100,
    otherExpenses: 653,
    completed: true,
  },
  {
    month: "Avril",
    revenu: 4000,
    netSalary: 2000,
    taxableRepayableExpenses: 290,
    repayableExpenses: 100,
    otherExpenses: 950,
    completed: true,
  },
  {
    month: "Mai",
    revenu: 8000,
    netSalary: 1000,
    taxableRepayableExpenses: 290,
    repayableExpenses: 100,
    otherExpenses: 250,
    completed: true,
  },
  {
    month: "Juin",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Juillet",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Août",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Septembre",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Octobre",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Novembre",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
  {
    month: "Décembre",
    revenu: 0,
    netSalary: 0,
    taxableRepayableExpenses: 0,
    repayableExpenses: 0,
    otherExpenses: 0,
    completed: false,
  },
];

export default function Achieved() {
  const [completedMonths, setCompletedMonths] = useState([]);
  const [companyType, setCompanyType] = useState("SASU");

  useEffect(() => {
    const savedCompletedMonths = localStorage.getItem("completedMonths");
    if (savedCompletedMonths) {
      setCompletedMonths(JSON.parse(savedCompletedMonths));
    } else {
      setCompletedMonths(defaultCompletedMonths);
    }
  }, []);

  const completedRevenu = completedMonths
    .filter((e) => e.completed)
    .reduce((acc, month) => acc + month.revenu, 0);
  const completedSalaries = completedMonths
    .filter((e) => e.completed)
    .reduce((acc, month) => acc + month.netSalary, 0);
  const repayedExpenses = completedMonths
    .filter((e) => e.completed)
    .reduce((acc, month) => acc + month.repayableExpenses, 0);
  const otherCompletedExpenses = completedMonths
    .filter((e) => e.completed)
    .reduce((acc, month) => acc + month.otherExpenses, 0);
  const completedMonthCount = completedMonths.filter((e) => e.completed).length;
  const taxableRepayedExpenses = completedMonths
    .filter((e) => e.completed)
    .reduce((acc, month) => acc + month.taxableRepayableExpenses, 0);

  const totals = {
    completedRevenu,
    completedSalaries,
    repayedExpenses,
    otherCompletedExpenses,
    completedMonthCount,
    taxableRepayedExpenses,
  };

  return (
    <div className="achieved">
      <NavMenu activeItem="achieved" />
      <div style={{ display: "flex" }}>
        <h2 style={{ marginBottom: 0 }}>Réalisé</h2>
      </div>
      <div style={mainStyles.infoSection}>
        <div style={mainStyles.info}>
          (?) Complétez vos revenus et charges des mois terminés pour faire un
          point d'avancement en cours d'annéé et estimer ce que vous avez gagné
          à ce stade.
        </div>
        <div style={mainStyles.info}>
          (?) Les remboursement de frais sont réintégrées dans le revenu moyen
          mensuel
        </div>
        <div style={mainStyles.info}>
          /!\ Les calculs prennent en compte l'IR sur les dividendes (forfait)
          mais pas sur les salaires
        </div>
        <div style={mainStyles.info}>
          /!\ Le montant imposable à l'IR est une estimation (le salaire
          imposable est différent du salaire net)
        </div>
      </div>
      <label>
        <span style={{ fontWeight: "bold", marginRight: "1em" }}>
          {" "}
          Type de société
        </span>
        <select
          name="companyType"
          onChange={(e) => setCompanyType(e.target.value)}
          defaultValue="SASU"
        >
          <option value="SASU">SASU</option>
          <option value="EURL">EURL</option>
        </select>
      </label>
      <AchievedTable
        completedMonths={completedMonths}
        setCompletedMonths={setCompletedMonths}
        totals={totals}
      />
      <AchievedSummary totals={totals} companyType={companyType} />
    </div>
  );
}
