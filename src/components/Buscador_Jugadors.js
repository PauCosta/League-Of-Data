import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Jugadors.css';

function Buscador_Jugadors({ variant = 'default' }) {
  const [jugadors, setJugadors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJugadors = async () => {
      try {
        //const whereClause = `OverviewPage="LEC/2025 Season/Spring Season" OR OverviewPage="LCK/2025 Season/Rounds 1-2" OR OverviewPage="LPL/2024 Season/Spring Season" OR OverviewPage="LCS/2024 Season/Spring Season"`;

        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link',
            where: 'OverviewPage="LEC/2025 Season/Spring Season" OR OverviewPage="LCK/2025 Season/Rounds 1-2" OR OverviewPage="LPL/2024 Season/Spring Season" OR OverviewPage="LCS/2024 Season/Spring Season"',
            limit: '50000',
          }),
        });

        const data = await response.json();
        console.log('Respuesta de la API:', data);

        if (!data.cargoquery) {
          throw new Error('La respuesta no contiene cargoquery');
        }

        const noms = data.cargoquery
          .map((row) => row.title.Link)
          .filter((name) => !!name);

        setJugadors(noms);
      } catch (error) {
        console.error('Error carregant jugadors:', error);
      }
    };

    fetchJugadors();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const input = searchTerm.trim().toLowerCase();
      const matched = jugadors.find(j => j.toLowerCase().includes(input));

      if (matched) {
        navigate(`/jugadors/${matched}`);
      } else {
        alert('Jugador no trobat o fora de les 4 grans lligues (LEC, LCS, LCK i LPL).');
      }
    }
  };

  return (
    <div className={`search-container ${variant === 'concret' ? 'concret' : ''}`}>
      <input
        type="text"
        className={`search-bar ${variant === 'concret' ? 'search-bar-concret' : ''}`}
        placeholder="Busca un jugador..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default Buscador_Jugadors;
