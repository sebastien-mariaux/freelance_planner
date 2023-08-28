import { useForm } from "react-hook-form";
import { buttonStyle, formStyle } from "../mainStyles";
import { routes } from "../api/routes";
import { urlPost } from "../api/base";

export default function FeedbackForm() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: userData?.email,
      name: userData?.first_name + " " + userData?.last_name,
    }
  });


  const sendFeedback = (data) => {
    urlPost(
      routes.feedback,
      data,
      () => {
        alert("Merci pour votre retour !");
        reset();
      },
      () => {
        alert("Une erreur est survenue, veuillez réessayer plus tard.");
      }
    )
  };

  return (
    <form onSubmit={handleSubmit(sendFeedback)} style={formStyle.largeForm}>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Name</label>
        <input
          style={formStyle.input}
          type="text"
          {...register("name", { required: false })}
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Email</label>
        <input
          style={formStyle.input}
          type="email"
          {...register("email", { required: false })}
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Impressions générales</label>
        <textarea
          rows={4}
          {...register("overall_impression", { required: false })}
          placeholder="Votre impression générale sur le site"
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Fonctionalités</label>
        <textarea
          rows={4}
          {...register("prefered_features", { required: false })}
          placeholder="Quelles sont les fonctionnalités qui vous sont le plus utiles ?"
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Fonctionnalités manquantes</label>
        <textarea
          rows={4}
          {...register("missing_features", { required: false })}
          placeholder="Quelles sont les fonctionnalités que vous aimeriez voir sur le site ?"
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <label style={formStyle.label}>Commentaires</label>
        <textarea
          rows={4}
          {...register("comment", { required: false })}
          placeholder="N'hésitez pas à ajouter d'autres commentaires !"
        />
      </div>
      <div style={formStyle.fieldWrapper}>
        <input style={buttonStyle.main} type="submit" value="Envoyer" />
      </div>

    </form>
  );
}