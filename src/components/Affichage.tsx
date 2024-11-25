import Jauge from "./Jauge";
import './Affichage.css'; // Importation du fichier CSS

function Affichage({
    zone,
    currentQuestion,
    decibels,
    isJauge,
    player,
    player2,
}: {
    zone: string;
    currentQuestion: any;
    decibels: number;
    isJauge?: boolean;
    player: string;
    player2: string;
}) {
    function replacePlaceholders(template: string, replacements: Record<string, string>): string {
        return Object.keys(replacements).reduce((result, placeholder) => {
            const regex = new RegExp(`\\{${placeholder}\\}`, "g"); // Remplace toutes les occurrences de {placeholder}
            return result.replace(regex, replacements[placeholder]);
        }, template);
    }

    if (!currentQuestion) {
        return <p>Chargement de la question...</p>;
    }

    const replacements = {
        player1: player,
        player2: player2,
    };

    const defi = replacePlaceholders(currentQuestion.defi, replacements);

    return (
        <div className="card">
            <h2 className="zoneTitle">Zone: {zone}</h2>
            {(zone === "nonbruit" || zone === "mort") && (
                <h3 className="zoneNotice">Plafond à ne pas dépasser : 30 db</h3>
            )}
            {currentQuestion.type === 1 && (
                <div className="questionType">
                    <p>{defi}</p>
                    <p>penalité(s) : {currentQuestion.penalite}</p>
                </div>
            )}
            {currentQuestion.type === 2 && (
                <div className="questionType">
                    <p>{defi}</p>
                    <p>penalité(s) : {currentQuestion.penalite}</p>
                </div>
            )}
            {currentQuestion.type === 3 && (
                <div className="questionType">
                    <p>{defi}</p>
                    <p>penalité(s) : {currentQuestion.penalite}</p>
                </div>
            )}
            {isJauge && <Jauge decibels={decibels} />}
        </div>
    );
}

export default Affichage;