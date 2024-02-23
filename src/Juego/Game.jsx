import { useState, useEffect } from "react";
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
  return (
    <div className="content">
      <h1>Champ select</h1>
      <p>{champions.toString()}</p>
    </div>
  );
}

export default Game;
