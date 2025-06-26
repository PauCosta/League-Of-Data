import { Link } from 'react-router-dom';
import './styles/Home.css';
import './styles/Lligues.css';
import { useTranslation } from 'react-i18next';


function Lligues() {
  
  const { t } = useTranslation();

  return (
    <div className="main-container">
      <main className="lligues-content">
        <h1 className="lligues-main-title">{t('lligues.title')}</h1>
        <div className="lligues-grid">
          <Link to="/lligues/LEC">
            <img src="/LEC.png" alt="LEC" className="lligues-lliga-logo" /> 
          </Link>
          <Link to="/lligues/LCS">
          <img src="/LCS.png" alt="LCS" className="lligues-lliga-logo" />
          </Link>
          <Link to="/lligues/LCK">
          <img src="/LCK.png" alt="LCK" className="lligues-lliga-logo" />
          </Link>
          <Link to="/lligues/LPL">
          <img src="/LPL.png" alt="LPL" className="lligues-lliga-logo" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Lligues;
