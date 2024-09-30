import EcouteDB from './EcouteDB'
import Jauge from './Jauge'
import { useState, useEffect} from 'react'

function GamePlay(){

    const [decibel, setDecibel] = useState(0);
    const [countPlafond, setCountPlafond] = useState(0);
    const [isCooldown, setIsCooldown] = useState(false); // Pour gérer le cooldown de 3 secondes
  
    useEffect(() => {
      // Vérifier si les décibels dépassent 30 et que le cooldown n'est pas actif
      if (decibel > 30 && !isCooldown) {
        setCountPlafond(prevCount => prevCount + 1); // Incrémenter le compteur
  
        // Activer le cooldown pour éviter l'incrémentation pendant 3 secondes
        setIsCooldown(true);
  
        // Lancer un timer de 3 secondes pour désactiver le cooldown
        setTimeout(() => {
          setIsCooldown(false); // Réactiver l'incrémentation après 3 secondes
        }, 3000);
      }
    }, [decibel, isCooldown]);


    return (
        <div>
            <h1>Silence ça boit</h1>
            <EcouteDB updateDecibel={setDecibel} />
            <Jauge decibels={decibel}/>
            <p>Le nombre de fois que le plafond a été dépassé est de {countPlafond}</p>
        </div>
    )
}

export default GamePlay