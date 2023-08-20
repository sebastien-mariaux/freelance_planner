import React from "react";
import { useForm } from "react-hook-form";
import { urlPost } from "../api/base";
import { routes } from "../api/routes";

export default function ExpensesForm({ afterCreate }) {
  const { register, handleSubmit,  reset } = useForm({
    shouldUseNativeValidation: true,
  });
  const [displayTaxable, setDisplayTaxable] = React.useState(false);

  const displayOrHideTaxable = (event) => {
    setDisplayTaxable(event.target.checked);
  };

  const createExpense = (data) => {
    urlPost(
      routes.expenses,
      data,
      (data) => {
        afterCreate(data.id)
        reset();
      },
      () => {}
    );
  };

  return (
    <form onSubmit={handleSubmit(createExpense)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <label style={styles.label}>
            <input
              type="text"
              placeholder="Description"
              {...register("name", { required: true })}
            />
          </label>
          <label style={styles.label}>
            <input
              type="number"
              placeholder="Montant"
              {...register("amount", { min: 0, required: true })}
            />
          </label>
          <label style={styles.label}>
            <select {...register("periodicity")}>
              <option value="M">Mensuel</option>
              <option value="Y">Annuel</option>
            </select>
          </label>
          <label style={styles.label}>
            Remboursable
            <input
              type="checkbox"
              {...register("is_repayed")}
              onChange={displayOrHideTaxable}
            />
          </label>
          {displayTaxable && (
            <label style={styles.label}>
              Imposable à l'IR
              <input type="checkbox" {...register("taxable")} />
            </label>
          )}
        </div>
        <input type="submit" value="Ajouter" />
      </div>
    </form>
  );
}

const styles = {
  label: {
    padding: "0.5em",
  },
};
