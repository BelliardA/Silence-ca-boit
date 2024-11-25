import { useState } from "react";
import "./AffichageFinZone.css";

function AffichageFinZone({ setIndexArrayZones, maxDB }: { setIndexArrayZones: any; maxDB: number }) {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const [isResponseSubmitted, setIsResponseSubmitted] = useState<boolean>(false);

    const [reponsePlayers, setReponsePlayers] = useState<string[]>(Array(players.length).fill(""));
    const [bestPlayer, setBestPlayer] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        const newReponses = [...reponsePlayers];
        newReponses[index] = value;
        setReponsePlayers(newReponses);
    };

    const handleSubmit = () => {
        let closestDifference = Infinity;
        let closestPlayer = "";

        players.forEach((player: string, index: number) => {
            const playerGuess = parseInt(reponsePlayers[index], 10);
            if (!isNaN(playerGuess)) {
                const difference = Math.abs(playerGuess - maxDB);
                if (difference < closestDifference) {
                    closestDifference = difference;
                    closestPlayer = player;
                }
            }
        });

        setBestPlayer(closestPlayer);
        setIsResponseSubmitted(true);
    };

    if (isResponseSubmitted) {
        return (
            <div className="bestPlayerContainer">
                <p className="bestPlayerMessage"><strong>{bestPlayer}</strong> tu distribues 3 pénalités !</p>
                <p className="maxdbAtteind">Le nombre de décibel maximum atteind est : <strong>{maxDB}</strong></p>
                <button
                    className="nextZoneButton"
                    onClick={() => setIndexArrayZones((prevIndex: number) => prevIndex + 1)}
                >
                    Passer à la zone suivante
                </button>
            </div>
        );
    }

    return (
        <div className="finZoneContainer">
            <h2 className="finZoneMaxDB">A votre avis ??</h2>
            <p className="petitText">Devinnez le nombre de décibel maximum atteint durant la zone</p>
            {players.map((player: string, index: number) => (
                <div className="playerInputContainer" key={index}>
                    <p className="playerName">{player}</p>
                    <input
                        className="playerGuessInput"
                        type="number"
                        value={reponsePlayers[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder="Devine le maxDB"
                    />
                </div>
            ))}
            <button className="submitButton" onClick={handleSubmit}>
                Soumettre les réponses
            </button>
        </div>
    );
}

export default AffichageFinZone;