import { useState } from "react";

function AffichageFinZone({ setIndexArrayZones, maxDB }: { setIndexArrayZones: any; maxDB: number }) {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const [isResponseSubmitted, setIsResponseSubmitted] = useState<boolean>(false);
    

    // Gérer les réponses des joueurs
    const [reponsePlayers, setReponsePlayers] = useState<string[]>(Array(players.length).fill(""));
    const [bestPlayer, setBestPlayer] = useState<string | null>(null); // Stocke le meilleur joueur

    const handleInputChange = (index: number, value: string) => {
        const newReponses = [...reponsePlayers];
        newReponses[index] = value;
        setReponsePlayers(newReponses);
    };

    const handleSubmit = () => {
        let closestDifference = Infinity; // Initialement, la différence la plus proche est infinie
        let closestPlayer = "";// Stockera le nom du joueur avec la meilleure réponse

        players.forEach((player: string, index: number) => {
            const playerGuess = parseInt(reponsePlayers[index], 10); // Convertir la réponse en nombre
            if (!isNaN(playerGuess)) {
                const difference = Math.abs(playerGuess - maxDB); // Calculer la différence absolue
                if (difference < closestDifference) {
                    closestDifference = difference; // Mettre à jour la différence la plus proche
                    closestPlayer = player; // Mettre à jour le meilleur joueur
                }
            }
        });

        setBestPlayer(closestPlayer); // Mettre à jour le meilleur joueur
        setIsResponseSubmitted(true); // Mettre à jour le statut de soumission
    };

    if(isResponseSubmitted) {
        return (
            <div>
                <p>{bestPlayer} tu distribue 3 pénalités</p>
                <button onClick={() => setIndexArrayZones((prevIndex: number) => prevIndex + 1)}>Passer à la zone suivante</button>
            </div>
        );
    }

    return (
        <div>
            <p>Max DB: {maxDB}</p>
            {
                players.map((player: string, index: number) => (
                    <div key={index}>
                        <p>{player}</p>
                        <input
                            type="number"
                            value={reponsePlayers[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder="Devine le maxDB"
                        />
                    </div>
                ))
            }
            <button onClick={handleSubmit}>Soumettre les réponses</button>
        </div>
    );
}

export default AffichageFinZone;