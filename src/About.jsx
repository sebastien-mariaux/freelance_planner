import React from "react";

export default function About() {
  return (
    <>
      <p>Freelance planner est un simulateur permettant aux freelances de se projeter dans leur future entreprise.</p>
      <p>Il vise à aider à estimer ses futurs revenus en fonction de l'activité anticipée ou à mieux fixer son TJM en fonction des revenus espérés. </p>

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
      <p> En outre, Freelance planner utilise certaines approximations. Par l'exemple la base de l'IR est le salaire imposable qui est  différent du salaire net.
        Nous l'estimons (un peu arbitrairement, sur la base de mes propres fiches de payes) à 110% du salaire net.
      </p>

      <h3>Pourquoi c'est moche ?</h3>
      <p>Freelance Planner est en construction ! Pour le moment aucun effort n'a été fait sur l'aspect visuel du site.
        J'ai aussi voulu rester minimaliste, et utiliser le moins possible de librairies externes. Pas de framework CSS, pas de trucs inutiles.</p>
      <p>En plus, je ne vous cache pas que moi le design...</p>

      <h3>Pourquoi on ne peut simuler que les revenus en SASU ?</h3>
      <p>Freelance Planner est en construction ! Pour le moment je me suis concentré sur mon propre status, la SASU. Prochaine étape : l'EURL.</p>

      <h3>Quel usage est fait de mes données ?</h3>
      <p> Je ne reçois aucune donnée. Vos simulations sont enregistrées localement sur votre navigateur.</p>

      <h3>Côté technique, c'est fait comment ?</h3>
      <p>C'est du React tout simple, pas de backend pour le moment.
        Le code est disponible sur <a target='blank' href='https://github.com/sebastien-mariaux/freelance_planner' >Github</a>.
      </p>
    </>
  )
}