import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./../assets/logo.png";
import delImg from "./../assets/del.png";

import Input from "./Input";

import {BookText} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<string[]>([]);
  const [addPlayer, setAddPlayer] = useState(false);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    setPlayers(players);
    setAddPlayer(false);
  }, [addPlayer]);

  const deletePlayer = (index: number) => {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(players));

    setAddPlayer(true);
  };

  const play = () => {
    if (players.length < 2) {
      alert("Il faut au moins deux joueurs pour jouer");
      return;
    }

    const tutorialShown = localStorage.getItem("tutorialShown");

    if (!tutorialShown) {
      // Marquer le tutoriel comme vu
      localStorage.setItem("tutorialShown", "true");
      navigate("/tuto");  // Rediriger vers le tutoriel
    } else {
      navigate("/level"); // Rediriger vers la page de niveau si le tuto a déjà été vu
    }
  }

  const handleClickTuto = () => {
    navigate("/tuto");
  }

  return (
    <>
      <section className="contenu">
        <header>
          <div className="contain-btn-go-tuto">
            <button className="btn-go-tuto" onClick={handleClickTuto}>
              <BookText size={40} color="var(--color-secondary)"/>
            </button>
          </div>
          <img className="logo-menu" src={logo} alt="" />
        </header>
        <main>
          <Input addPlayer={setAddPlayer} />
          <div className="content-players">
            {players.map((player, index) => (
              <div key={index} className="players">
                <p>{player}</p>
                <button onClick={() => deletePlayer(index)} className="btn-del">
                  <img className="btn-img-del" src={delImg} alt="" />
                </button>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <button className="jouer" onClick={() => play()}>
            Jouer
          </button>
        </footer>
      </section>
    </>
  );
}

export default Home;
