import Jauge from "./Jauge";

function Affichage({ zone, currentQuestion, decibels, isJauge, maxDB, player }: { zone: string; currentQuestion: any; decibels: number; isJauge?: boolean; maxDB?: number, player: string }) {

    const defi = currentQuestion.defi.replace("{player1}", player);


    if (!currentQuestion) {
        return <p>Chargement de la question...</p>;
    }



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