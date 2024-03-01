import { useState, useEffect } from "react";
import "./Game.css";
const Game = () => {
  const [champions, setChampions] = useState([]);
  const getChampions = async () => {
    try {
      const response = await fetch('http://localhost:3030/Champions');
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      const campeones = await response.json();
      setChampions(campeones);
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  }
  useEffect(() => {
    getChampions();
  }, []);

  const handleChampionClick = (champion) => {
    console.log(`¡Seleccionaste a ${champion.name}!`);
    // Aquí puedes realizar cualquier acción adicional que desees al hacer clic en un campeón
  };

  return (
    <div>
      <h1>Champ Select</h1>
      <div className="content">
        <div className="container-team1">
          <div className="team1-grid">
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[0].img}`} alt={champions[0].name} />
              </div>
              <text>Hola</text>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[1].img}`} alt={champions[1].name} />
              </div>
              <text>Hola</text>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[2].img}`} alt={champions[2].name} />
              </div>
              <text>Hola</text>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[3].img}`} alt={champions[3].name} />
              </div>
              <text>Hola</text>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[4].img}`} alt={champions[4].name} />
              </div>
              <text>Hola</text>
            </div>
          </div>
        </div>
        <div className="container-team2">
          <div className="team2-grid">
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[0].img}`} alt={champions[0].name} />
              </div>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[1].img}`} alt={champions[1].name} />
              </div>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[2].img}`} alt={champions[2].name} />
              </div>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[3].img}`} alt={champions[3].name} />
              </div>
            </div>
            <div className="teams-item">
              <div className="teams-card">
                <img src={`data:image/jpeg;base64,${champions[4].img}`} alt={champions[4].name} />
              </div>
            </div>
          </div>
        </div>
          <div className="champion-grid">
            {champions.map((champion, index) => (
              <div key={index} className="champion-card">
                <img src={`data:image/jpeg;base64,${champion.img}`} alt={champion.name} onClick={() => handleChampionClick(champion)} />
                <p>{champion.name}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
export default Game;
