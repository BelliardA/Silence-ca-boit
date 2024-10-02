import Jauge from "./Jauge";

function Affichage({ zone, currentQuestion, decibels, isJauge }: { zone: string; currentQuestion: any; decibels: number; isJauge?: boolean}) {


    if (!currentQuestion) {
        return <p>Chargement de la question...</p>;
    }

    return (
        <div>
            <h2>Écoute - Zone: {zone}</h2>
            {currentQuestion.type === 1 && (
                <div>
                    <h2>Action</h2>
                    <p>{currentQuestion.defi}</p>
                    <p>ID: {currentQuestion.id}</p>
                </div>
            )}
            {currentQuestion.type === 2 && (
                <div>
                    <h2>Classique</h2>
                    <p>{currentQuestion.defi}</p>
                    <p>ID: {currentQuestion.id}</p>
                </div>
            )}
            {currentQuestion.type === 3 && (
                <div>
                    <h2>Classique</h2>
                    <p>{currentQuestion.defi}</p>
                    <p>ID: {currentQuestion.id}</p>
                </div>
            )}
            {isJauge && <Jauge decibels={decibels} />}
        </div>
    );
}

export default Affichage;