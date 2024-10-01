import EcouteDB from './EcouteDB'
import Jauge from './Jauge'
import Ecoute from './Ecoute'
import { useState, useEffect} from 'react'

function GamePlay(){

    const [decibel, setDecibel] = useState(0);
    const [countPlafond, setCountPlafond] = useState(0);
    const [maxDecibels, setMaxDecibels] = useState(0);
    const [isCooldown, setIsCooldown] = useState(false); 


  
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


    return (
        <div>
          <Ecoute/>
        </div>
    )
}

export default GamePlay