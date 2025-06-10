import { Link } from 'react-router-dom';
import './styles/Jugadors.css';

function Jugadors() {
  return (
    <div className="main-container">
      <main className="main-content jugadors-page">
        <div className="header-row">
            <h1 className="jugadors-title">JUGADORS</h1>
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Busca un jugador..." />
            </div>
        </div>
        <p className="subtitle">Jugadors més populars</p>

         <div className="jugadors-grid">
          <Link to="/jugadors/Faker"><img src="/player_Faker.png" alt="Faker" className="jugador-logo" /></Link>
          <Link to="/jugadors/Caps"><img src="/player_Caps.png" alt="Caps" className="jugador-logo" /></Link>
          <Link to="/jugadors/Chovy"><img src="/player_Chovy.png" alt="Chovy" className="jugador-logo" /></Link>
          <Link to="/jugadors/Bin"><img src="/player_Bin.png" alt="Bin" className="jugador-logo" /></Link>
          <Link to="/jugadors/Peanut"><img src="/player_Peanut.png" alt="Peanut" className="jugador-logo" /></Link>
          <Link to="/jugadors/Mikyx"><img src="/player_Mikyx.png" alt="Mikyx" className="jugador-logo" /></Link>
        </div>
      </main>
    </div>
  );
}

export default Jugadors;
