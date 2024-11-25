import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tuto () {
    const navigate = useNavigate();

    const [step, setStep] = useState<number>(0);

    const nextStep = () => {
        setStep(step + 1);
    }
    const prevStep = () => {
        setStep(step - 1);
    }
    const play = () => {
        navigate("/level");
    }
    
    switch (step) {
        case 0:
          return (
            <div>
              <h1>Bienvenue dans Silence ça boit</h1>
              <p>Préparez-vous pour un jeu où vos réponses et votre calme seront mis à l’épreuve !</p>
              <button onClick={nextStep}>Suivant</button>
            </div>
          );
        case 1:
          return (
            <div>
              <h1>Déroulement de la Partie</h1>
              <p>
                Le jeu se divise en quatre zones, chacune ayant des règles spécifiques liées au bruit :
              </p>
              <ol>
                <li><strong>Zone Soft :</strong> Répondez aux questions et réalisez les défis sans contrainte sonore. C’est l’échauffement !</li>
                <li><strong>Zone d'Écoute :</strong> Les joueurs doivent faire attention au bruit. À la fin, ils estiment le nombre maximal de décibels atteints.</li>
                <li><strong>Zone de Non-Bruit :</strong> Tout bruit dépassant 30 dB déclenche une pause. Les joueurs désignent celui qui a fait trop de bruit pour lui attribuer une pénalité.</li>
                <li><strong>Zone de la Mort :</strong> Aucune jauge visible, mais chaque dépassement de 30 dB est enregistré. À la fin, les pénalités sont attribuées en fonction du compteur de dépassements.</li>
              </ol>
              <button onClick={nextStep}>Suivant</button>
            </div>
          );
        case 2:
          return (
            <div>
              <h1>Questions et Défis</h1>
              <p>
                Les joueurs devront répondre à des questions ou réaliser des défis. Le gagnant de chaque manche distribue les pénalités aux autres joueurs.
              </p>
              <button onClick={nextStep}>Suivant</button>
            </div>
          );
        default:
          return (
            <div>
              <h1>Prêt à commencer ?</h1>
              <p>Que le meilleur gagne... et distribue les pénalités avec sagesse !</p>
              <button onClick={play}>Commencer</button>
            </div>
          );
      }

}
export default Tuto;