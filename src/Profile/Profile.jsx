import { useEffect, useState } from "react";
import { urlDelete, urlGet, urlPatch } from "../api/base";
import { routes } from "../api/routes";
import { useForm } from "react-hook-form";
import { formStyle } from "../mainStyles";
import { colors } from "../colors";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const getUserData = async () => {
    urlGet(routes.userInfo).then((data) => {
      setUserData(data);
      reset({
        first_name: data?.first_name,
        last_name: data?.last_name,
        working_day_mode: data?.working_day_mode,
      });
    });
  };

  const updateProfile = (data) => {
    urlPatch(routes.profile, data, () => {
      setUserData(data);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteAccount = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "ATTENTION ! \nÊtes-vous sûr de vouloir supprimer votre compte ? \n"
    + "Cette action est irréversible. \n"
    + "Vos données vont être supprimées définitivement."
      )
    ) {
      urlDelete(
        routes.profile,
        {},
        () => {
          window.location.href = "/";
        },
        () => {}
      );
    }
  };

  return (
    <div>
      <h2>Informations du compte</h2>
      <form
        onSubmit={handleSubmit(updateProfile)}
        style={{ ...formStyle.form, margin: "initial" }}
      >
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Email</label>
          {userData?.email}
        </div>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Prénom</label>
          <input type="text" {...register("first_name")} />
        </div>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Nom</label>
          <input type="text" {...register("last_name")} />
        </div>
        <h3
          style={{
            marginBottom: "1em",
            borderBottom: `1px solid ${colors.primary}`,
          }}
        >
          Préférences
        </h3>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>
            Mode de calcul du nombre de jour travaillés
          </label>
          <div
            style={{
              fontStyle: "italic",
              fontSize: "small",
              marginBottom: "0.5em",
            }}
          >
            Utilisé pour les simulations.
          </div>
          <select {...register("working_day_mode")}>
            <option value="FIXED">Valeur fixe</option>
            <option value="COMPUTED">
              Valeur calculé en fonction du nombre de semaines travaillées
            </option>
          </select>
        </div>

        <button type="submit" style={formStyle.submitButton}>
          Mettre à jour
        </button>
        <button
          onClick={(event) => deleteAccount(event)}
          style={styles.deleteButton}
        >
          Supprimer mon compte
        </button>
      </form>
    </div>
  );
}

const styles = {
  deleteButton: {
    marginTop: "1em",
    backgroundColor: "#a73a3a",
  },
};
