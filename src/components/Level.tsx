import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./../assets/logo.png";
import questions from "./../Json/questions.json";

import "./Level.css";

function Level() {
  const navigate = useNavigate();
  const nbQuestionGame = 40;

  const [tabLevel, setTabLevel] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isTabReady, setIsTabReady] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set()); // Suivi global des questions utilisées

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLevel(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedLevel) {
      setIsTabReady(false);
      choiceShema(Number(selectedLevel));
    } else {
      alert("Veuillez sélectionner un niveau");
    }
  };

  const choiceShema = (level: number) => {
    let newTabLevel: number[];
    if (level === 1) {
      newTabLevel = [40, 30, 20, 10];
    } else if (level === 2) {
      newTabLevel = [20, 25, 30, 20];
    } else {
      newTabLevel = [10, 20, 30, 40];
    }
    setTabLevel(newTabLevel);
  };

  useEffect(() => {
    if (tabLevel.length > 0) {
      let soft = Math.floor((nbQuestionGame / 100) * tabLevel[0]);
      let ecoute = Math.floor((nbQuestionGame / 100) * tabLevel[1]);
      let nonbruit = Math.floor((nbQuestionGame / 100) * tabLevel[2]);
      let mort = Math.floor((nbQuestionGame / 100) * tabLevel[3]);

      // Obtenir les questions pour chaque catégorie
      let softQuestions = getUniqueRandomValues(sortingQuestions("soft"), soft);
      let ecouteQuestions = getUniqueRandomValues(
        sortingQuestions("ecoute"),
        ecoute
      );
      let nonbruitQuestions = getUniqueRandomValues(
        sortingQuestions("nonbruit"),
        nonbruit
      );
      let mortQuestions = getUniqueRandomValues(sortingQuestions("mort"), mort);

      // Ajouter les questions utilisées à la liste "usedQuestions"
      setUsedQuestions((prev) =>
        new Set([
          ...prev,
          ...softQuestions,
          ...ecouteQuestions,
          ...nonbruitQuestions,
          ...mortQuestions,
        ])
      );

      // Stocker les questions dans le localStorage
      localStorage.setItem("softquestions", JSON.stringify(softQuestions));
      localStorage.setItem("ecoutequestions", JSON.stringify(ecouteQuestions));
      localStorage.setItem(
        "nonbruitquestions",
        JSON.stringify(nonbruitQuestions)
      );
      localStorage.setItem("mortquestions", JSON.stringify(mortQuestions));

      console.log("Questions stockées dans le localStorage");

      setIsTabReady(true);
    }
  }, [tabLevel]);

  useEffect(() => {
    if (isTabReady) {
      navigate("/gameplay");
    }
  }, [isTabReady, navigate]);

  const sortingQuestions = (zoneChercher: string) => {
    const table = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].zones[0] !== "All") {
        for (let y = 0; y < questions[i].zones.length; y++) {
          if (
            questions[i].zones[y] === zoneChercher &&
            !usedQuestions.has(questions[i].id)
          ) {
            table.push(questions[i].id);
          }
        }
      } else {
        if (!usedQuestions.has(questions[i].id)) {
          table.push(questions[i].id);
        }
      }
    }
    return table;
  };

  function getUniqueRandomValues(arr: number[], count: number) {
    const uniqueValues = new Set<number>();

    while (uniqueValues.size < count && arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      uniqueValues.add(arr[randomIndex]);
    }

    return Array.from(uniqueValues);
  }

  return (
    <main className="level-container">
      <img className="logo-level" src={logo} alt="Logo" />
      <h1 className="titre-level">Choisissez un niveau</h1>
      <form onSubmit={handleSubmit} className="level-form">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedLevel === "1"}
              onChange={handleLevelChange}
            />
            Facile
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedLevel === "2"}
              onChange={handleLevelChange}
            />
            Moyen
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="3"
              checked={selectedLevel === "3"}
              onChange={handleLevelChange}
            />
            Difficile
          </label>
        </div>
        <button type="submit" className="submit-button">
          Valider
        </button>
      </form>
    </main>
  );
}

export default Level;