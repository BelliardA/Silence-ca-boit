import { useState } from "react";

function AffichageFinZone({ setIndexArrayZones, maxDB }: { setIndexArrayZones: any; maxDB: number }) {

    const players = JSON.parse(localStorage.getItem("players") || "[]");
    
    // Gérer les réponses des joueurs
    const [reponsePlayers, setReponsePlayers] = useState<string[]>(Array(players.length).fill(""));

    const handleInputChange = (index: number, value: string) => {
        const newReponses = [...reponsePlayers];
        newReponses[index] = value;
        setReponsePlayers(newReponses);
    }

    const handleSubmit = () => {
        players.forEach((player: string, index: number) => {
            console.log(`${player} a deviné : ${reponsePlayers[index]}`);
        });
        setIndexArrayZones((prevIndex: number) => prevIndex + 1);
    }

    return (
        <div>
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