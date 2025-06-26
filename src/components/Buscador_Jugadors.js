import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Jugadors.css';
import { useTranslation } from 'react-i18next';

function Buscador_Jugadors({ variant = 'default' }) {
  const [jugadors, setJugadors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const ligaMapping = {
      LEC: 'LEC/2025 Season/Spring Season',
      LCK: 'LCK/2025 Season/Rounds 1-2',
      LPL: 'LPL/2024 Season/Spring Season',
      LCS: 'LCS/2024 Season/Spring Season',
    };

    const fetchJugadors = async () => {
    try {
      const normalize = (str) => str?.trim().toLowerCase();
      const allPlayers = [];

      for (const overviewPage of Object.values(ligaMapping)) {
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch('http://localhost:4000/api/leaguepedia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              action: 'cargoquery',
              format: 'json',
              tables: 'ScoreboardPlayers',
              fields: 'Link',
              where: `OverviewPage="${overviewPage}"`,
              limit: '500',
              offset: offset.toString(),
            }),
          });

          const data = await response.json();
          const currentBatch = data.cargoquery?.map((row) => row.title.Link?.trim()).filter(Boolean) || [];

          allPlayers.push(...currentBatch);

          if (currentBatch.length < 500) {
            hasMore = false;
          } else {
            offset += 500;
          }
        }
      }

      //Evitar duplicats
      const uniqueMap = new Map();
      allPlayers.forEach((name) => {
        const key = normalize(name);
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, name);
        }
      });

      const finalList = Array.from(uniqueMap.values()).sort((a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' })
      );

      //Manual per problemes amb l'API
      const manualPlayers = ['Faker', 'Mikyx', 'Peanut'];
      manualPlayers.forEach((name) => {
        if (!finalList.includes(name)) {
          finalList.push(name);
        }
      });

      finalList.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      setJugadors(finalList);
      console.log(`Jugadors disponibles (${finalList.length}):`, finalList);
    } catch (error) {
      console.error('Error carregant jugadors:', error);
    }
  };

    fetchJugadors();
  }, []);

  const aliasReverse = {
  'Bin (Chen Ze-Bin)': 'Bin',
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const input = searchTerm.trim().toLowerCase();
      const matched =
        jugadors.find((j) => j.toLowerCase() === input) ||
        jugadors.find((j) => j.toLowerCase().includes(input));

      if (matched) {
        const routeName = aliasReverse[matched] || matched;
        navigate(`/jugadors/${routeName}`);
      } else {
        alert(t('buscador_jugadors.alert'));
      }
    }
  };

  return (
    <div className={`search-container ${variant === 'concret' ? 'concret' : ''}`}>
      <input
        type="text"
        className={`search-bar ${variant === 'concret' ? 'search-bar-concret' : ''}`}
        placeholder={t('buscador_jugadors.placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        autoComplete="off"
      />
    </div>
  );
}

export default Buscador_Jugadors;
