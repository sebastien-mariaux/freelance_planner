import React, { useEffect, useState } from "react";
import { mainStyles } from "../mainStyles";
import NavMenu from "../NavMenu/NavMenu";
import { tab } from "@testing-library/user-event/dist/tab";
import TransactionPanel from "./TransactionPanel";
import SummaryPanel from "./SummaryPanel";
import { colors } from "../colors";

export default function Achieved() {
  const [panel, setPanel] = useState("transactions");

  const selectTab = (tab) => {
    setPanel(tab);
  };

  const getClassList = (tab) => {
    return panel === tab ? "clickable active" : "clickable";
  };


  return (
    <div className="achieved">
      <NavMenu activeItem="achieved" />
      <div style={{ display: "flex" }}>
        <h2 style={{ marginBottom: 0 }}>Réalisé</h2>
      </div>

      <div style={styles.tabsMenu}>
        <div
        className={getClassList("transactions")}
        onClick={() => selectTab("transactions")}
         style={styles.tab}>
          Transactions
        </div>
        <div
        className={getClassList("summary")}
        onClick={() => selectTab("summary")}
        style={styles.tab}>
          Synthèse
        </div>
      </div>

      <div>
        {panel === "transactions" ? (
          <TransactionPanel />
        ) : (
          <SummaryPanel />
        )}
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
