import React from "react";

export default function About() {
  return (
    <>
      <p>Freelance planner est un simulateur permettant aux freelances de se projeter dans leur future entreprise.</p>
      <p>Il vise à aider à estimer ses futurs revenus en fonction de l'activité anticipée ou à mieux fixer son TJM en fonction des revenus espérés. </p>
      <p>Freelance planner vous aide également à suivre l'activité de votre entreprise et à estimer vos futurs revenus en fonction de votre comptabilité. </p>

      <h3>Qui a commis ce truc ?</h3>
      <p>Moi c'est Sébastien, je suis développeur freelance depuis peu. J'ai créé ce site car j'ai eu beaucoup de mal à trouver des informations
        précises sur les revenus d'un freelance par rapport à son chiffre d'affaires. Je me suis dis que ça pourrait être utile à d'autres.</p>
      <p> Pour en savoir plus, ou pour travailler avec moi, vous pouvez jeter un oeil à&nbsp;
        <a target='blank' href='https://sebastien-mariaux.com/' >mon site</a>
        , ou&nbsp;
        <a target='blank' href='https://www.linkedin.com/in/sebastienmariaux/' >mon Linkedin</a>
        .</p>

      <h3>A quel point c'est fiable ?</h3>
      <p>Freelance planner ne fournit que des estimations, sans donner aucune garantie sur l'exactitude comptable ou juridique des informations.
        Le site a été construit à l'aide d'informations collectées sur internet ou auprès de mon propre comptable.
        Dans la mesure ou la législation évolue réguliérement, il est possible que certaines informations ne soient plus à jour au moment ou vous utilisez le simulateur.
      </p>
      <p> En outre, Freelance planner utilise certaines approximations.
      </p>

      <h3>Pourquoi c'est moche ?</h3>
      <p>Freelance Planner est encore en travaux ! Pour le moment peu d'effort ont été fait sur l'aspect visuel du site.
        J'ai aussi voulu rester minimaliste.</p>
      <p>En plus, je ne vous cache pas que moi le design...</p>

      <h3>Pourquoi on ne peut simuler que les revenus en SASU et en EURL ?</h3>
      <p>Pour le moment, je me suis limité à ces deux statuts qui sont les plus couramment utilisés pour les freelances. </p>

      <h3>Quel usage est fait de mes données ?</h3>
      <p>Vos données ne sont utilisées que pour le fonctionnement du site, aucun usage commercial n'en est fait.</p>

      <h3>Ça marche pas ! À qui je peux me plaindre ?</h3>
      <p>J'ai mis à disposition un formulaire de contact pour me faire part de vos <a href='/feedback'>feedbacks</a>. Les compliments sont acceptés aussi !</p>
    </>
  )
}