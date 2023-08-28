import FeedbackForm from "./FeedbackForm";

export default function Feedback() {
  return (
    <>
      <h2>Merci d'utiliser Freelance Planner!</h2>
      <p>Il s'agit d'une première version du site, et il reste beaucoup de travail pour l'améliorer et vous proposer plus de fonctionnalités.</p>
      <p>Pour cela, nous avons besoin de votre aide ! Votre avis sur les fonctionnalités existantes et celles qui vont manquent est précieux pour améliorer le site.</p>
      <p>Aussi, n'hésitez pas à nous faire de vos retours et suggestions en utilisant le formulaire ci-dessous. Vous pouvez également me contacter via <a href="https://www.linkedin.com/in/sebastienmariaux/" alt="Linkedin">Linkedin</a>. </p>
      <p>Si le site vous a été utile, n'hésitez pas à nous le dire aussi.</p>
      <p>A bientôt !</p>
      <p>Sébastien.</p>

      <FeedbackForm />
    </>
  )
}
