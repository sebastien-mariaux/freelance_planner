import React, { useEffect, useState } from "react";
import { mainStyles } from "../mainStyles";
import NavMenu from "../NavMenu/NavMenu";
import { tab } from "@testing-library/user-event/dist/tab";
import TransactionPanel from "./TransactionPanel";
import SummaryPanel from "./SummaryPanel";
import { colors } from "../colors";
import { urlGet, urlPatch, urlPost } from "../api/base";
import { routes } from "../api/routes";
import SalaryPanel from "./SalaryPanel";

export default function Achieved() {
  const [panel, setPanel] = useState("transactions");
  const [company, setCompany] = useState({});
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    getCompany();
  }, [companyId]);

  const getCompany = async () => {
    urlGet(routes.company(companyId)).then((data) => {
      setCompany(data);
    });
  };

  const selectTab = (tab) => {
    setPanel(tab);
  };

  const getClassList = (tab) => {
    return panel === tab ? "clickable active" : "clickable";
  };

  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);

  const updateCompany = (e) => {
    urlPatch(
      routes.company(companyId),
      { company_type: e.target.value },
      (data) => setCompany(data),
      () => console.log('error')
    );
  };

  return (
    <div className="achieved">
      <NavMenu activeItem="achieved" />
      <div style={{ display: "flex", marginTop: "1em" }}>
        <h2 style={{ margin: 0 }}>Réalisé</h2>
        <div style={{ alignSelf: "center", marginLeft: "2em" }}>
          <span style={{marginRight: '0.5em', fontStyle: 'italic'}}>Année :</span>
          <select onChange={(e) => setYear(e.target.value)}>
            {Array(10)
              .fill()
              .map((_, i) => {
                return (
                  <option value={i + 2021} selected={i + 2021 === currentYear}>
                    {i + 2021}
                  </option>
                );
              })}
          </select>
        </div>
        <div style={{ alignSelf: "center", marginLeft: "2em" }}>
          <span style={{marginRight: '0.5em', fontStyle: 'italic'}}>Statut :</span>
          <select onChange={updateCompany}>
            <option value="EURL" selected={company?.company_type === "EURL"}>EURL</option>
            <option value="SASU" selected={company?.company_type === "SASU"}>SASU</option>
          </select>
        </div>
      </div>

      <div style={styles.tabsMenu}>
        <div
          className={getClassList("transactions")}
          onClick={() => selectTab("transactions")}
          style={styles.tab}
        >
          Transactions
        </div>
        <div
          className={getClassList("salaries")}
          onClick={() => selectTab("salaries")}
          style={styles.tab}
        >
          Salaires
        </div>
        <div
          className={getClassList("summary")}
          onClick={() => selectTab("summary")}
          style={styles.tab}
        >
          Synthèse
        </div>
      </div>

      <div>
        {
        panel === "transactions" && <TransactionPanel year={year}  />
        }
        {
        panel === "summary" && <SummaryPanel year={year} company={company} />
        }
        {
        panel === "salaries" && <SalaryPanel year={year} />
        }

      </div>
    </div>
  );
}

const styles = {
  tabsMenu: {
    display: "flex",
    borderBottom: `3px solid ${colors.links}`,
    margin: "1em 0",
  },
  tab: {
    padding: "0.5em",
  },
};
