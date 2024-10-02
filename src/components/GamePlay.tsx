import Affichage from './Affichage';
import EcouteDB from './EcouteDB';
import AffichageFinZone from './AffichageFinZone';
import questions from '../Json/questions.json';
import { useState, useEffect} from 'react'

function GamePlay(){

    const [decibel, setDecibel] = useState(0);
    const [countPlafond, setCountPlafond] = useState(0);
    const [maxDecibels, setMaxDecibels] = useState(0);
    const [isCooldown, setIsCooldown] = useState(false); 
    const [indexArrayZones, setIndexArrayZones] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);

    let isJauge = false;
    
    const zones = ["soft", "ecoute", "finEcoute", "nonbruit", "mort"];

  
    useEffect(() => {   //timer de 3 seconds entre chaques dépassement du palafond
      if (decibel > 30 && !isCooldown) {
        setCountPlafond(prevCount => prevCount + 1);
  
        // Activer le cooldown pour éviter l'incrémentation pendant 3 secondes
        setIsCooldown(true);
  
        // Lancer un timer de 3 secondes pour désactiver le cooldown
        setTimeout(() => {
          setIsCooldown(false); // Réactiver l'incrémentation après 3 secondes
        }, 3000);
      }
    }, [decibel, isCooldown]);

    //<EcouteDB updateDecibel={setDecibel} updateMaxDecibel={setMaxDecibels} />

    useEffect(() => {   //Quand la zone change, réinitialiser l'index des questions
        setCurrentIndex(0);
    }, [indexArrayZones]);


    useEffect(() => {   //Chargement de la question actuelle
        const ids = JSON.parse(localStorage.getItem(zones[indexArrayZones] + "questions") || "[]");
        if (ids.length > 0) {
            setCurrentQuestion(questions[ids[currentIndex]]);
        }
    }, [currentIndex, indexArrayZones, zones]);

    if (!zones || zones.length === 0) {
        return <p>Zones non définies !</p>;
    }

    // Récupération des questions du localStorage pour la zone actuelle
    const ids = JSON.parse(localStorage.getItem(zones[indexArrayZones] + "questions") || "[]");

    const handleClick = () => {             // gestion du click pour passer a la prochaine question
        if (currentIndex < ids.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            // Si on a atteint la fin du tableau de questions pour cette zone
            if (indexArrayZones < zones.length - 1) {
                // Passer à la zone suivante et réinitialiser l'index des questions
                setIndexArrayZones(prevIndex => prevIndex + 1);

                if(zones[indexArrayZones] === "ecoute"){
                  setMaxDecibels(0);
                } 
                else if(zones[indexArrayZones] === "finEcoute"){
                  let maxDecibelsAtteint = maxDecibels;
                }
            } else {
                // Si on a parcouru toutes les zones
                alert('Fin des questions');
            }
        }
    };

    // Si on dépasse la longueur des ids, on arrête de rendre des questions pour cette zone
    if (ids.length === 0) {
        return <AffichageFinZone setIndexArrayZones={setIndexArrayZones} />;
    }

    // Assurez-vous que la question actuelle est bien chargée avant d'afficher
    if (!currentQuestion) {
        return <p>Chargement de la question...</p>; // Une fois que currentQuestion est défini, on affiche la question
    }

    // Rendu conditionnel basé sur le type de question
    return (
        <div>
            <button onClick={handleClick}>Suivant</button>
            <EcouteDB updateDecibel={setDecibel} updateMaxDecibel={setMaxDecibels} />
            {
              zones[indexArrayZones] === "soft" && (
                isJauge = true,
                <Affichage zone={zones[indexArrayZones]} currentQuestion={currentQuestion} decibels={decibel} isJauge={isJauge} />
              )
            }
            {
              zones[indexArrayZones] === "ecoute" && (
                <Affichage zone={zones[indexArrayZones]} currentQuestion={currentQuestion} decibels={decibel}/>
              )
            }
            {
              zones[indexArrayZones] === "nonbruit" && (
                isJauge = true,
                <Affichage zone={zones[indexArrayZones]} currentQuestion={currentQuestion} decibels={decibel} isJauge={isJauge}/>
              )
            }
            {
              zones[indexArrayZones] === "mort" && (
                <Affichage zone={zones[indexArrayZones]} currentQuestion={currentQuestion} decibels={decibel} />
              )
            }
            
        </div>
    );
}

export default GamePlay