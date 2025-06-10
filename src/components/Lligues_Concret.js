import './styles/Home.css';
import './styles/Lligues_Concret.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LliguesConcret() {
  const { ligaId } = useParams();
  const [clasificacion, setClasificacion] = useState([]);
  const [campeones, setCampeones] = useState([]);
  const [mejoresKDA, setMejoresKDA] = useState([]);
  const [topCSM, setTopCSM] = useState([]);

  const ligaMapping = {
    LEC: 'LEC/2025 Season/Spring Season',
    LCK: 'LCK/2025 Season/Rounds 1-2',
    LPL: 'LPL/2024 Season/Spring Season',
    LCS: 'LCS/2024 Season/Spring Season',
  };

  const ligaNombre = ligaMapping[ligaId] || 'LEC/2025 Season/Spring Season';

  useEffect(() => {
    const fetchClasificacion = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'Standings',
            fields: 'Team,WinSeries,LossSeries',
            where: `OverviewPage="${ligaNombre}"`,
            order_by: 'WinSeries DESC',
            limit: '20',
          }),
        });

        const data = await response.json();
        setClasificacion(data.cargoquery?.map(item => item.title) || []);
      } catch (err) {
        console.error('Error en obtenir la classificació:', err);
      }
    };

    const fetchCampeones = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'PicksAndBansS7',
            fields: [
              'Team1Pick1', 'Team1Pick2', 'Team1Pick3', 'Team1Pick4', 'Team1Pick5',
              'Team2Pick1', 'Team2Pick2', 'Team2Pick3', 'Team2Pick4', 'Team2Pick5',
              'Winner'
            ].join(','),
            where: `OverviewPage="${ligaNombre}"`,
            limit: '500',
          }),
        });

        const data = await response.json();
        const rawGames = data.cargoquery?.map(d => d.title) || [];

        const picksStats = {};

        rawGames.forEach(game => {
          const winner = game.Winner;

          for (let i = 1; i <= 5; i++) {
            const champ1 = game[`Team1Pick${i}`];
            if (champ1) {
              if (!picksStats[champ1]) picksStats[champ1] = { games: 0, wins: 0 };
              picksStats[champ1].games += 1;
              if (winner === '1' || winner === 1) picksStats[champ1].wins += 1;
            }

            const champ2 = game[`Team2Pick${i}`];
            if (champ2) {
              if (!picksStats[champ2]) picksStats[champ2] = { games: 0, wins: 0 };
              picksStats[champ2].games += 1;
              if (winner === '2' || winner === 2) picksStats[champ2].wins += 1;
            }
          }
        });

        const campeonesArray = Object.entries(picksStats)
          .map(([champ, stats]) => ({
            Champion: champ,
            GamesPlayed: stats.games,
            WinRate: ((stats.wins / stats.games) * 100).toFixed(1),
          }))
          .sort((a, b) => b.GamesPlayed - a.GamesPlayed)
          .slice(0, 10);

        setCampeones(campeonesArray);
      } catch (err) {
        console.error('Error en obtenir campions fets servir:', err);
      }
    };

    const fetchMejoresKDA = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link,Team,Kills,Deaths,Assists',
            where: `OverviewPage="${ligaNombre}"`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rawPlayers = data.cargoquery?.map(d => d.title) || [];

        const kdaStats = {};

        rawPlayers.forEach(player => {
          const name = player.Link;
          const team = player.Team;
          const kills = parseInt(player.Kills || 0);
          const deaths = parseInt(player.Deaths || 0);
          const assists = parseInt(player.Assists || 0);

          if (!name) return;

          if (!kdaStats[name]) {
            kdaStats[name] = {
              Player: name,
              Team: team,
              Kills: 0,
              Deaths: 0,
              Assists: 0,
              Games: 0
            };
          }

          kdaStats[name].Kills += kills;
          kdaStats[name].Deaths += deaths;
          kdaStats[name].Assists += assists;
          kdaStats[name].Games += 1;
        });

        const kdaArray = Object.values(kdaStats)
          .map(player => ({
            Player: player.Player.replace(/\s*\(.*?\)\s*/g, ''),
            Team: player.Team,
            KDA: ((player.Kills + player.Assists) / Math.max(1, player.Deaths)).toFixed(2),
            Games: player.Games,
          }))
          .sort((a, b) => b.KDA - a.KDA)
          .slice(0, 5);

        setMejoresKDA(kdaArray);
      } catch (err) {
        console.error('Error en obtenir els millors KDA:', err);
      }
    };

    const fetchTopCSM = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link,Team,CS,GameId',
            where: `OverviewPage="${ligaNombre}" AND Link!="" AND CS IS NOT NULL`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rawPlayers = data.cargoquery?.map(entry => entry.title) || [];

        const csStats = {};

        rawPlayers.forEach(player => {
          const name = player.Link;
          const team = player.Team;
          const cs = parseInt(player.CS || 0);
          const gameId = player.GameId;

          if (!name || !team || !cs || !gameId) return;

          if (!csStats[name]) {
            csStats[name] = {
              Player: name,
              Team: team,
              CS: 0,
              Games: 0
            };
          }

          csStats[name].CS += cs;
          csStats[name].Games += 1;
        });

        const topCSM = Object.values(csStats)
          .map(p => ({
            Player: p.Player.replace(/\s*\(.*?\)\s*/g, ''),
            Team: p.Team,
            CSM: (p.CS / (p.Games * 30)).toFixed(2),
            Games: p.Games
          }))
          .sort((a, b) => b.CSM - a.CSM)
          .slice(0, 5);

        setTopCSM(topCSM);
      } catch (err) {
        console.error('Error en obtenir CSM:', err);
      }
    };

    fetchClasificacion();
    fetchCampeones();
    fetchMejoresKDA();
    fetchTopCSM();
  }, [ligaNombre]);

  return (
    <div className="main-container">
      <main className="lligues-concret-content">
        <div className="lliga-header">
          <img src={`/${ligaId}.png`} alt={ligaId} className="lliga-logo" />
          <h1 className="lligues-title">{ligaId}</h1>
        </div>

        <div className="tables-wrapper">
          <div className="table-row">
            <div className="table">
              <h2>Clasificación</h2>
              {clasificacion.length === 0 ? (
                <p>Carregant classificació o no hi ha dades disponibles</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Equip</th>
                      <th>Victòries</th>
                      <th>Derrotes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clasificacion.map((equipo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{equipo.Team}</td>
                        <td>{equipo.WinSeries}</td>
                        <td>{equipo.LossSeries}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="table">
              <h2>Campions fets servir</h2>
              {campeones.length === 0 ? (
                <p>Carregant dades dels campions...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Campió</th>
                      <th>Partides</th>
                      <th>% Vict.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campeones.map((champ, index) => (
                      <tr key={index}>
                        <td>{champ.Champion}</td>
                        <td>{champ.GamesPlayed}</td>
                        <td>{champ.WinRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="table-row">
            <div className="table">
              <h2>Millor KDA</h2>
              {mejoresKDA.length === 0 ? (
                <p>Carregant dades dels jugadors...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Jugador</th>
                      <th>Equip</th>
                      <th>KDA</th>
                      <th>Partides</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mejoresKDA.map((player, index) => (
                      <tr key={index}>
                        <td>{player.Player}</td>
                        <td>{player.Team}</td>
                        <td>{player.KDA}</td>
                        <td>{player.Games}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="table">
              <h2>Top CSM (Mitjana minions eliminats per minut)</h2>
              {topCSM.length === 0 ? (
                <p>Carregant dades de CSM...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Jugador</th>
                      <th>Equip</th>
                      <th>CSM</th>
                      <th>Partides</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCSM.map((player, index) => (
                      <tr key={index}>
                        <td>{player.Player}</td>
                        <td>{player.Team}</td>
                        <td>{player.CSM}</td>
                        <td>{player.Games}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LliguesConcret;
