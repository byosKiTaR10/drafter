const Game = () => {
    const getChampions = async () => {
        try{
            fetch('http://localhost:3030/Champions')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error de red: ${response.status}`);
                    }
                    return response.json()
                })
                .then(data => {

                })
                .catch (error => {
                    console.error('Error en la solicitud', error)
                })
        } catch (err) {
            console.error('Error obteniendo los campeones')
        }
    }
}

/**class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChampions: [],
      availableChampions: [
        "Ahri", "Akali", "Alistar", "Amumu", "Anivia", // Lista de campeones disponibles
        // Aquí puedes añadir más campeones si lo deseas
      ]
    };
  }

  selectChampion(champion) {
    if (this.state.selectedChampions.length < 5) {
      this.setState(prevState => ({
        selectedChampions: [...prevState.selectedChampions, champion],
        availableChampions: prevState.availableChampions.filter(c => c !== champion)
      }));
    }
  }

  render() {
    const { selectedChampions, availableChampions } = this.state;

    return (
      <div>
        <h1>Selección de Campeón</h1>
        <div>
          <h2>Campeones Seleccionados:</h2>
          <ul>
            {selectedChampions.map((champion, index) => (
              <li key={index}>{champion}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Campeones Disponibles:</h2>
          <ul>
            {availableChampions.map((champion, index) => (
              <li key={index}>
                <button onClick={() => this.selectChampion(champion)}>
                  {champion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
*/
export default Game;
