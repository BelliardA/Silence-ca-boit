import Affichage from "./Affichage";
import EcouteDB from "./EcouteDB";
import AffichageFinZone from "./AffichageFinZone";
import questions from "../Json/questions.json";
import { useState, useEffect } from "react";
import "./Jauge.css";
import { useNavigate } from "react-router-dom";

function GamePlay() {
  const players = JSON.parse(localStorage.getItem("players") || "[]");

  const [decibel, setDecibel] = useState<number>(0);
  const [countPlafond, setCountPlafond] = useState<number>(0);
  const [maxDecibels, setMaxDecibels] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [indexArrayZones, setIndexArrayZones] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [player, setPlayer] = useState<string>(
    players[Math.floor(Math.random() * players.length)]
  );
  const [audioAuthorized, setAudioAuthorized] = useState<boolean>(false);
  const [maxDecibelsAtteint, setMaxDecibelsAtteint] = useState<number>(0);

  const navigate = useNavigate();

  const zones = [
    "soft",
    "ecoute",
    "finEcoute",
    "nonbruit",
    "mort",
    "afterGame",
  ];

  useEffect(() => {
    //timer de 3 seconds entre chaques dépassement du palafond
    if (zones[indexArrayZones] === "mort" && decibel > 30 && !isCooldown) {
      //Plafond à ne pas dépacer dans la zone de la mort
      setCountPlafond((prevCount) => prevCount + 1);

      // Activer le cooldown pour éviter l'incrémentation pendant 3 secondes
      setIsCooldown(true);

      // Lancer un timer de 3 secondes pour désactiver le cooldown
      setTimeout(() => {
        setIsCooldown(false); // Réactiver l'incrémentation après 3 secondes
      }, 3000);
    }
  }, [decibel, isCooldown]);

  useEffect(() => {
    if (zones[indexArrayZones] === "ecoute") {
      setMaxDecibels(0);
    }
    setCurrentIndex(0);
    setMaxDecibels(0);
  }, [indexArrayZones]);

  useEffect(() => {
    //Chargement de la question actuelle
    const ids = JSON.parse(
      localStorage.getItem(zones[indexArrayZones] + "questions") || "[]"
    );
    if (ids.length > 0) {
      setCurrentQuestion(questions[ids[currentIndex]]);
    }
  }, [currentIndex, indexArrayZones, zones]);

  if (!zones || zones.length === 0) {
    return <p>Zones non définies !</p>;
  }

  // Récupération des questions du localStorage pour la zone actuelle
  const ids = JSON.parse(
    localStorage.getItem(zones[indexArrayZones] + "questions") || "[]"
  );
  const handleClick = () => {
    // gestion du click pour passer a la prochaine question
    setPlayer(players[Math.floor(Math.random() * players.length)]);
    if (currentIndex < ids.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex === ids.length - 2) {
        setMaxDecibelsAtteint(Math.round(maxDecibels));
      }
    } else {
      // Si on a atteint la fin du tableau de questions pour cette zone
      if (indexArrayZones < zones.length - 1) {
        // Passer à la zone suivante et réinitialiser l'index des questions
        setIndexArrayZones((prevIndex) => prevIndex + 1);
      } else {
        // Si on a parcouru toutes les zones
        alert("Fin des questions");
      }
    }
  };

  const rePlay = () => {
    navigate("/");
  };

  if (zones[indexArrayZones] === "finEcoute" && maxDecibelsAtteint) {
    return (
      <AffichageFinZone
        setIndexArrayZones={setIndexArrayZones}
        maxDB={maxDecibelsAtteint}
      />
    );
  }

  if (!currentQuestion) {
    return <p>Chargement de la question...</p>; // Une fois que currentQuestion est défini, on affiche la question
  }

  switch (zones[indexArrayZones]) {
    case "soft":
      return (
        <div>
          <button onClick={handleClick}>Suivant</button>
          <EcouteDB
            updateDecibel={setDecibel}
            updateMaxDecibel={setMaxDecibels}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            isJauge={true}
            maxDB={maxDecibels}
            player={player}
          />
        </div>
      );
      break;
    case "ecoute":
      return (
        <div>
          <button onClick={handleClick}>Suivant</button>
          <EcouteDB
            updateDecibel={setDecibel}
            updateMaxDecibel={setMaxDecibels}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            maxDB={maxDecibels}
            player={player}
          />
        </div>
      );
      break;
    case "finEcoute":
      return (
        <AffichageFinZone
          setIndexArrayZones={setIndexArrayZones}
          maxDB={maxDecibelsAtteint}
        />
      );
      break;
    case "nonbruit":
      if (decibel > 30) {
        return (
          <div>
            <h1>Plafond dépasser !!</h1>
            <p>
              Décidez ensemble qui à fait tout ce rafus, cette personne prendra
              1 pénalité
            </p>
            <button onClick={() => setDecibel(0)}>Revenir aux questions</button>
          </div>
        );
      }
      return (
        <div>
          <button onClick={handleClick}>Suivant</button>
          <h2>le plafond de décibel est de 30</h2>
          <EcouteDB
            updateDecibel={setDecibel}
            updateMaxDecibel={setMaxDecibels}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            isJauge={true}
            player={player}
          />
        </div>
      );
      break;
    case "mort":
      return (
        <div>
          <button onClick={handleClick}>Suivant</button>
          <h2>le plafond de décibel est de 30</h2>
          <p>{countPlafond}</p>
          <EcouteDB
            updateDecibel={setDecibel}
            updateMaxDecibel={setMaxDecibels}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            player={player}
          />
        </div>
      );
      break;
    case "afterGame":
      return (
        <div>
          <h1>Fin de la partie</h1>
          <h2>Vous avez dépassez {countPlafond} le plafond</h2>
          <p>Tous les joueurs prennent {countPlafond} pénalités</p>
          <button onClick={() => rePlay()}>Rejouer</button>
        </div>
      );
      break;
  }
}

export default GamePlay;
