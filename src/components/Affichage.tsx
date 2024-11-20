import Jauge from "./Jauge";

function Affichage({ zone, currentQuestion, decibels, isJauge, maxDB, player, player2 }: { zone: string; currentQuestion: any; decibels: number; isJauge?: boolean; maxDB?: number, player: string; player2: string }) {

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

    // Remplace les placeholders dans la chaîne de défi
    const defi = replacePlaceholders(currentQuestion.defi, replacements);

    return (
        <div>
            <h2>Écoute - Zone: {zone}</h2>
            {currentQuestion.type === 1 && (
                <div>
                    <h2>Action</h2>
                    <p>{defi}</p>
                </div>
            )}
            {currentQuestion.type === 2 && (
                <div>
                    <h2>Classique</h2>
                    <p>{defi}</p>
                </div>
            )}
            {currentQuestion.type === 3 && (
                <div>
                    <h2>QCM</h2>
                    <p>{defi}</p>
                </div>
            )}
            {maxDB && <p>Max DB: {maxDB}</p>}
            {isJauge && <Jauge decibels={decibels} />}
        </div>
    );
}

export default Affichage;