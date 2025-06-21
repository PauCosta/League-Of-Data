import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/Jugadors_Concret.css';

function JugadorsConcret() {
  const { jugadorId } = useParams();

  const jugadorToEquipo = {
    Faker: 'T1',
    Caps: 'G2 Esports',
    Chovy: 'GEN.G',
    Bin: 'Bilibili Gaming',
    Peanut: 'GEN.G',
    Mikyx: 'Fnatic',
  };

  const equipoToLiga = {
    T1: 'LCK',
    "G2 Esports": 'LEC',
    "Fnatic": 'LEC',
    "GEN.G": 'LCK',
    "Bilibili Gaming": 'LPL',
  };

  const ligaMapping = {
    LEC: 'LEC/2025 Season/Spring Season',
    LCK: 'LCK/2025 Season/Rounds 1-2',
    LPL: 'LPL/2024 Season/Spring Season',
    LCS: 'LCS/2024 Season/Spring Season',
  };

  const equipo = jugadorToEquipo[jugadorId];
  const ligaId = equipoToLiga[equipo];
  const ligaNombre = ligaMapping[ligaId];

  const [clasificacion, setClasificacion] = useState([]);
  const [campeones, setCampeones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});

  useEffect(() => {
    const fetchClasificacion = async () => {
      if (!ligaNombre) return;
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

    const fetchCampeonesJugador = async () => {
      if (!ligaNombre || !jugadorId) return;
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Champion,Link,Team,PlayerWin',
            where: `OverviewPage="${ligaNombre}" AND Link LIKE "%${jugadorId}%"`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(r => r.title) || [];

        const stats = {};
        rows.forEach(row => {
          const champ = row.Champion;
          if (!champ) return;
          if (!stats[champ]) stats[champ] = { games: 0, wins: 0 };
          stats[champ].games += 1;
          if (row.PlayerWin === 'Yes') stats[champ].wins += 1;
        });

        const arr = Object.entries(stats)
          .map(([champ, s]) => ({
            Champion: champ,
            GamesPlayed: s.games,
            WinRate: ((s.wins / s.games) * 100).toFixed(1),
          }))
          .sort((a, b) => b.GamesPlayed - a.GamesPlayed)
          .slice(0, 10);

        setCampeones(arr);
      } catch (err) {
        console.error('Error en obtenir campions del jugador:', err);
      }
    };

    const fetchEstadisticasJugador = async () => {
      if (!ligaNombre || !jugadorId) return;
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link,Kills,Deaths,Assists,CS,Gold,DamageToChampions,TeamGold,GameId,TeamKills',
            where: `OverviewPage="${ligaNombre}" AND Link LIKE "%${jugadorId}%"`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(r => r.title) || [];

        let totalKills = 0, totalDeaths = 0, totalAssists = 0;
        let totalCS = 0, totalGold = 0, totalDamage = 0;
        let totalTeamGold = 0;
        let totalTeamKills = 0;
        let totalGames = 0;
        

        const teamKillsPorPartida = {};

        rows.forEach(row => {
          const gameId = row.GameId;
          const kills = parseInt(row.Kills || 0);
          if (!teamKillsPorPartida[gameId]) teamKillsPorPartida[gameId] = 0;
          teamKillsPorPartida[gameId] += kills;
        });

        rows.forEach(row => {
          const kills = parseInt(row.Kills || 0);
          const deaths = parseInt(row.Deaths || 0);
          const assists = parseInt(row.Assists || 0);
          const cs = parseInt(row.CS || 0);
          const gold = parseInt(row.Gold || 0);
          const damage = parseInt(row.DamageToChampions || 0);
          const teamGold = parseInt(row.TeamGold || 0);
          const teamKills = parseInt(row.TeamKills || 0);

          totalKills += kills;
          totalDeaths += deaths;
          totalAssists += assists;
          totalCS += cs;
          totalGold += gold;
          totalDamage += damage;
          totalTeamGold += teamGold;
          totalTeamKills += teamKills;
          totalGames++;
        });

        const kda = ((totalKills + totalAssists) / Math.max(1, totalDeaths)).toFixed(2);
        const kp = ((totalKills + totalAssists) / Math.max(1, totalTeamKills) * 100).toFixed(1);
        const csm = (totalCS / (totalGames * 30)).toFixed(2);
        const or = ((totalGold / Math.max(1, totalTeamGold)) * 100).toFixed(1);
        const dmgM = (totalDamage / (totalGames * 30)).toFixed(0);
        const dmgPct = ((totalDamage / Math.max(1, totalTeamGold)) * 100).toFixed(1);

        setEstadisticas({
          KDA: kda,
          KP: kp + '%',
          CSM: csm,
          OR: or + '%',
          DMGm: dmgM,
          DMGPct: dmgPct + '%'
        });

      } catch (err) {
        console.error('Error en obtenir estadístiques del jugador:', err);
      }
    };

    fetchClasificacion();
    fetchCampeonesJugador();
    fetchEstadisticasJugador();
  }, [ligaNombre, jugadorId]);

  return (
    <div className="main-container">
      <main className="jugador-concret-content">
        <div className="jugador-header">
          <img src={`/player_${jugadorId}.png`} alt={jugadorId} className="jugador-foto-gran" />
          <h1 className="jugador-nom-gran">{jugadorId}</h1>
        </div>

        <div className="tables-wrapper">
          <div className="table-row">
            {clasificacion.length > 0 && (
              <div className="table">
                <h2>Classificació {ligaId}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Equip</th>
                      <th>Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clasificacion.map((equipoClasificado, idx) => {
                    const esEquipoActual = equipoClasificado.Team.toLowerCase() === equipo.toLowerCase();
                    return (
                      <tr
                        key={idx}
                        style={{ backgroundColor: esEquipoActual ? '#433558' : 'transparent' }}
                      >
                        <td>{idx + 1}</td>
                        <td style={{ fontWeight: esEquipoActual ? 'bold' : 'normal' }}>
                          {equipoClasificado.Team}
                        </td>
                        <td>{`${equipoClasificado.WinSeries}-${equipoClasificado.LossSeries}`}</td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {campeones.length > 0 && (
              <div className="table">
                <h2>Campions més jugats</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Campió</th>
                      <th>Partides</th>
                      <th>% Vict.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campeones.map((c, i) => (
                      <tr key={i}>
                        <td>{c.Champion}</td>
                        <td>{c.GamesPlayed}</td>
                        <td>{c.WinRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {Object.keys(estadisticas).length > 0 && (
            <div className="table">
              <h2>Estadístiques Individuals</h2>
              <table>
                <tbody>
                  <tr><td><strong>KDA</strong></td><td>{estadisticas.KDA}</td></tr>
                  <tr><td><strong>KP%</strong></td><td>{estadisticas.KP}</td></tr>
                  <tr><td><strong>CSM</strong></td><td>{estadisticas.CSM}</td></tr>
                  <tr><td><strong>OR%</strong></td><td>{estadisticas.OR}</td></tr>
                  <tr><td><strong>DMG/m</strong></td><td>{estadisticas.DMGm}</td></tr>
                  <tr><td><strong>DMG%</strong></td><td>{estadisticas.DMGPct}</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default JugadorsConcret;
