import { Link } from 'react-router-dom';
import BuscadorEquips from './Buscador_Equips.js';
import './styles/Equips.css';
import { useTranslation } from 'react-i18next';

function Equips() {
  const { t } = useTranslation();

  return (
    <div className="main-container">
      <main className="main-content equips-page">
        <div className="header-row">
          <h1 className="equips-title">{t('equips.title')}</h1>
          <div className="search-container">
            <BuscadorEquips />
          </div>
        </div>

        <p className="subtitle">{t('equips.subtitle')}</p>
        <div className="teams-grid">
          <Link to="/equips/T1"><img src="/team_T1.png" alt="T1" className="team-logo" /></Link>
          <Link to="/equips/FNC"><img src="/team_FNC.png" alt="Fnatic" className="team-logo" /></Link>
          <Link to="/equips/GENG"><img src="/team_GENG.png" alt="Gen.G" className="team-logo" /></Link>
          <Link to="/equips/TL"><img src="/team_TL.png" alt="Team Liquid" className="team-logo" /></Link>
          <Link to="/equips/G2"><img src="/team_G2.png" alt="G2" className="team-logo" /></Link>
          <Link to="/equips/BLG"><img src="/team_BLG.png" alt="BLG" className="team-logo" /></Link>
        </div>
      </main>
    </div>
  );
}

export default Equips;