import { useState } from 'react';
import questions from './../Json/questions.json';

function Ecoute() {
    // Récupération des questions du localStorage
    const ids = JSON.parse(localStorage.getItem("ecoutequestions") || "[]");
    const [currentIndex, setCurrentIndex] = useState(0);  // Pour suivre la question actuelle

    const handleClick = () => {
        // Incrémente l'index à chaque clic pour passer à la question suivante
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    // Si on dépasse la longueur des ids, on arrête de rendre des questions
    if (currentIndex >= ids.length) {
        return <p>Vous avez terminé toutes les questions !</p>;
    }

    // Récupère la question actuelle en utilisant l'id stocké dans le localStorage
    const currentQuestion = questions[ids[currentIndex]];

    // Rendu conditionnel basé sur le type de question
    return (
        <div>
            ecoute
            {currentQuestion.type === 1 && (
                <div>
                    <h2>Action</h2>
                    <p>{currentQuestion.defi}</p>
                    <button onClick={handleClick}>Suivant</button>
                </div>
            )}

            {currentQuestion.type === 2 && (
                <div>
                    <h2>Classique</h2>
                    <p>{currentQuestion.defi}</p>
                    <button onClick={handleClick}>Suivant</button>
                </div>
            )}
        </div>
    );
}

export default Ecoute;