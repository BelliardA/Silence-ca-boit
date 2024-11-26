import Affichage from "./Affichage";
import EcouteDB from "./EcouteDB";
import AffichageFinZone from "./AffichageFinZone";
import questions from "../Json/questions.json";
import { useState, useEffect } from "react";
import "./Jauge.css";
import "./GamePlay.css";
import { MoveRight } from "lucide-react";
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
  const [player2, setPlayer2] = useState<string>("");
  const [audioAuthorized, setAudioAuthorized] = useState<boolean>(false)
  const [maxDecibelsAtteint, setMaxDecibelsAtteint] = useState<number>(0);

  const navigate = useNavigate();

  if(audioAuthorized){
    console.log("Audio autorisé")
  }

  const zones = [
    "soft",
    "ecoute",
    "finEcoute",
    "nonbruit",
    "mort",
    "afterGame",
  ];

  const updatePlayer2 = () => {
    if (players.length > 1) {
      let randomPlayer2;
      do {
        randomPlayer2 = players[Math.floor(Math.random() * players.length)];
      } while (randomPlayer2 === player); // Vérifie que player2 n'est pas égal à player
      setPlayer2(randomPlayer2);
    } else {
      setPlayer2(""); // Si il n'y a pas assez de joueurs, player2 est vide
    }
  };
  
  // Appelez cette fonction dans le code où player2 doit être mis à jour.
  useEffect(() => {
    updatePlayer2();  // Mettez à jour player2 à chaque fois que player change
  }, [player]); // Mettez à jour player2 à chaque fois que player change

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
    setCurrentIndex(0);
    setMaxDecibels(0);
  }, [indexArrayZones]);

  const replacePlaceholder = (question: string, sousTheme: string[] | undefined): string => {
    // Vérifier si sousTheme est défini et est un tableau
    if (Array.isArray(sousTheme) && sousTheme.length > 0) {
      const randomSousTheme = sousTheme[Math.floor(Math.random() * sousTheme.length)];
      return question.replace("{soustheme}", randomSousTheme);
    } else {
      // Si sousTheme est indéfini ou vide, on retourne la question originale sans remplacement
      return question;
    }
  };
  
  useEffect(() => {
    // Chargement de la question actuelle
    const ids = JSON.parse(localStorage.getItem(zones[indexArrayZones] + "questions") || "[]");
    if (ids.length > 0) {
      let question = questions[ids[currentIndex]];
  
      // Remplacer le placeholder {soustheme} seulement si 'soustheme' existe
      const soustheme = question?.soustheme
      if (soustheme) {
        question.defi = replacePlaceholder(question.defi, question.soustheme);
      }
  
      setCurrentQuestion(question);
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
    // ---------------------------------zone soft----------------------------
    case "soft":
      return (
       
        <div className="contain">
          <EcouteDB
            updateDecibel={setDecibel}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            isJauge={true}
            player={player}
            player2={player2}
          />
          <button style={{ color: "#FFFEEB" }}  className="btnPurchasse" onClick={handleClick}><MoveRight size={50} /></button>
        </div>
       
      );
      break;
      // ---------------------------------zone ecoute----------------------------
    case "ecoute":
      if(decibel > maxDecibels) {
        setMaxDecibels(decibel);
      }
      return (
        <div className="contain">
          <EcouteDB
            updateDecibel={setDecibel}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            player={player}
            player2={player2}
          />
          <button style={{ color: "#FFFEEB" }}  className="btnPurchasse" onClick={handleClick}><MoveRight size={50} /></button>
        </div>
      );
      break;
      // ---------------------------------zone finEcoute ----------------------------
    case "finEcoute":
      return (
        <AffichageFinZone
          setIndexArrayZones={setIndexArrayZones}
          maxDB={maxDecibelsAtteint}
        />
      );
      break;
      // ---------------------------------zone nonBruit----------------------------
    case "nonbruit":
      if (decibel > 30) {
        return (
          <div className="containEnd">
            <h1>Plafond dépasser !!</h1>
            <p>
              Décidez ensemble qui à fait tout ce rafus, cette personne prendra
              1 pénalité
            </p>
            <button style={{ color: "var(--color-secondary)" }} className="btnPurchasse btnEnd" onClick={() => setDecibel(0)}><MoveRight size={50} /></button>
          </div>
        );
      }
      return (
        <div className="contain">
          <EcouteDB
            updateDecibel={setDecibel}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            isJauge={true}
            player={player}
            player2={player2}
          />
          <button style={{ color: "#FFFEEB" }} className="btnPurchasse" onClick={handleClick}><MoveRight size={50} /></button>
        </div>
      );
      break;
      // ---------------------------------zone mort----------------------------
    case "mort":
      return (
        <div className="contain">
          <EcouteDB
            updateDecibel={setDecibel}
            setAudioAuthorized={setAudioAuthorized}
          />
          <Affichage
            zone={zones[indexArrayZones]}
            currentQuestion={currentQuestion}
            decibels={decibel}
            player={player}
            player2={player2}
          />
          <button style={{ color: "#FFFEEB" }} className="btnPurchasse"  onClick={handleClick}><MoveRight size={50} /></button>
        </div>
      );
      break;
      // ---------------------------------zone afterGame----------------------------
    case "afterGame":
      return (
        <div className="main-end">
        <div className="containEnd">
          <h1>Fin de la partie</h1>
          <h2>Vous avez dépassez {countPlafond} fois le plafond</h2>
          <p>Tous les joueurs prennent {countPlafond} pénalités</p>
        </div>
          <button className="btnPurchasse btnEnd" onClick={() => rePlay()}>Rejouer</button>
        </div>
      );
      break;
  }
}

export default GamePlay;
