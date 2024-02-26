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
    <div className="content">
      <h1>Champ select</h1>
      <div className="champion-grid">
        {champions.map((champion, index) => (
          <div key={index} className="champion-card">
            <img src={`data:image/jpeg;base64,${champion.img}`} alt={champion.name} onClick={() => handleChampionClick(champion)}/>
            <p>{champion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Game;
