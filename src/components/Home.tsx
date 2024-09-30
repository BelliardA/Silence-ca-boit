import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./../assets/logo.png";
import delImg from "./../assets/del.png";

import Input from "./Input";

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
    navigate("/level");
  }

  return (
    <>
      <section className="contenu">
        <header>
          <img className="logo-menu" src={logo} alt="" />
        </header>
        <main>
          <Input addPlayer={setAddPlayer} />
          <div className="content-players">
            {players.map((player, index) => (
              <div key={index} className="players">
                {player}
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
