import './App.css'
import { Home } from './Home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Juego/Game'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Drafter" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
