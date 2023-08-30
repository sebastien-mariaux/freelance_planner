import { useEffect, useState } from "react";
import { urlGet } from "../api/base";
import { routes } from "../api/routes";
import { displayAmount } from "../Simulations/simulationsHelper";
import { colors } from "../colors";

export default function SummaryPanel({ year, company }) {
  const [summary, setSummary] = useState([]);
  const companyId = localStorage.getItem("companyId");
  console.log(summary);

  useEffect(() => {
    loadSummary();
  }, [year, company]);

  const loadSummary = () => {
    urlGet(routes.summary(companyId, year)).then((data) => {
      setSummary(data);
    });
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {summary?.monthly_incomes && (
          <div
            style={{
              marginRight: "50px",
              marginBottom: "20px",
              border: `2px solid ${colors.links}`,
              padding: "0.5em",
              borderRadius: "10px",
            }}
          >
            <h3 style={styles.h3}>Revenus mensuels</h3>
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                {Array(12)
                  .fill()
                  .map((_, i) => {
                    return (
                      <tr>
                        <td>{getMonthes(i)}</td>
                        <td style={styles.numberCell}>
                          {displayAmount(summary?.monthly_incomes[i + 1])}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot style={styles.foot}>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Total</td>
                  <td>{displayAmount(summary.yearly_income)}</td>
                </tr>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Moyenne</td>
                  <td>{displayAmount(summary.average_monthly_income)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {summary?.monthly_expenses && (
          <div
            style={{
              marginRight: "50px",
              marginBottom: "20px",
              border: `2px solid ${colors.links}`,
              padding: "0.5em",
              borderRadius: "10px",
            }}
          >
            <h3 style={styles.h3}>Dépenses mensuelles</h3>
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                {Array(12)
                  .fill()
                  .map((_, i) => {
                    return (
                      <tr>
                        <td style={styles.labelCell}>{getMonthes(i)}</td>
                        <td style={styles.numberCell}>
                          {displayAmount(summary?.monthly_expenses[i + 1])}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot style={styles.foot}>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Total</td>
                  <td>{displayAmount(summary.yearly_expense)}</td>
                </tr>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Moyenne</td>
                  <td>{displayAmount(summary.average_monthly_expense)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {summary?.monthly_net_salaries && (
          <div
            style={{
              marginRight: "50px",
              marginBottom: "20px",
              border: `2px solid ${colors.links}`,
              padding: "0.5em",
              borderRadius: "10px",
            }}
          >
            <h3 style={styles.h3}>Salaires mensuels net</h3>
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                {Array(12)
                  .fill()
                  .map((_, i) => {
                    return (
                      <tr>
                        <td style={styles.labelCell}>{getMonthes(i)}</td>
                        <td style={styles.numberCell}>
                          {displayAmount(summary?.monthly_net_salaries[i + 1])}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot style={styles.foot}>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Total</td>
                  <td>{displayAmount(summary.yearly_net_salaries)}</td>
                </tr>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Moyenne</td>
                  <td>{displayAmount(summary.average_monthly_net_salary)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {summary?.monthly_net_salaries && (
          <div
            style={{
              marginRight: "50px",
              marginBottom: "20px",
              border: `2px solid ${colors.links}`,
              padding: "0.5em",
              borderRadius: "10px",
            }}
          >
            <h3 style={styles.h3}>Salaires mensuels bruts</h3>
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                {Array(12)
                  .fill()
                  .map((_, i) => {
                    return (
                      <tr>
                        <td style={styles.labelCell}>{getMonthes(i)}</td>
                        <td style={styles.numberCell}>
                          {displayAmount(summary?.monthly_gross_salaries[i + 1])}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot style={styles.foot}>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Total</td>
                  <td>{displayAmount(summary.yearly_gross_salaries)}</td>
                </tr>
                <tr style={styles.boldRow}>
                  <td style={styles.labelCell}>Moyenne</td>
                  <td>{displayAmount(summary.average_monthly_gross_salary)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {summary && (
          <div
            style={{
              marginRight: "50px",
              backgroundColor: colors.secondary,
              padding: "0.5em",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3 style={styles.h3}>Résultats</h3>
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={styles.labelCell}>Résultat brut</td>
                    <td style={styles.numberCell}>
                      {displayAmount(summary.raw_earnings)}
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.labelCell}>Impôts</td>
                    <td style={styles.numberCell}>
                      {displayAmount(summary.earning_taxes)}
                    </td>
                  </tr>
                  <tr style={styles.boldRow}>
                    <td style={styles.labelCell}>Résultat net</td>
                    <td style={styles.numberCell}>
                      {displayAmount(summary.net_earnings)}
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.labelCell}>Dividende net*</td>
                    <td style={styles.numberCell}>
                      {displayAmount(summary.net_dividend)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{marginTop: '50px'}}>
              <span style={{ fontSize: "small", fontStyle: "italic" }}>
                * IR calculé avec la "flat tax" à 12.8% sur les dividendes<br/>
                Les cotisations dépendent du statut social
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const getMonthes = (index) => {
  const monthes = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return monthes[index];
};

const styles = {
  foot: {
    borderTop: `2px solid ${colors.primary}`,
  },
  numberCell: {
    textAlign: "right",
  },
  h3: {
    marginBottom: "0.8em",
  },
  boldRow: {
    fontWeight: "bold",
  },
  labelCell: {
    paddingRight: "3em",
  },
};
