import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BuscadorEquips from './Buscador_Equips.js';
import './styles/Home.css';
import './styles/Equips_Concret.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const teams = [
  // LCK
  { id: 'T1', names: ['t1'] },
  { id: 'GENG', names: ['gen.g', 'geng', 'gen g'] },
  { id: 'KT', names: ['kt rolster', 'kt'] },
  { id: 'HLE', names: ['hanwha life', 'hle', 'hanwha', 'hanwha life esports'] },
  { id: 'DK', names: ['dplus kia', 'dk'] },
  { id: 'DRX', names: ['drx'] },
  { id: 'NS', names: ['nongshim redforce', 'ns'] },
  { id: 'DNF', names: ['dn freecs', 'dnf'] },
  { id: 'BRO', names: ['oksavingsbank brion', 'ok brion', 'bro'] },
  { id: 'BFX', names: ['bnk fearx', 'bfx'] },

  // LEC
  { id: 'G2', names: ['g2 esports', 'g2'] },
  { id: 'FNC', names: ['fnatic', 'fnc'] },
  { id: 'MKOI', names: ['movistar koi', 'koi', 'mkoi'] },
  { id: 'TH', names: ['team heretics', 'heretics', 'th'] },
  { id: 'BDS', names: ['team bds', 'bds'] },
  { id: 'SK', names: ['sk gaming', 'sk'] },
  { id: 'VIT', names: ['team vitality', 'vitality', 'vit'] },
  { id: 'KC', names: ['karmine corp', 'kc'] },
  { id: 'GX', names: ['giantx', 'gx'] },
  { id: 'RGE', names: ['rogue', 'rge', 'rogue (european team)'] },

  // LPL
  { id: 'JDG', names: ['jd gaming', 'jdg'] },
  { id: 'BLG', names: ['bilibili gaming', 'blg', 'bilibili'] },
  { id: 'TES', names: ['top esports', 'tes', 'top'] },
  { id: 'WBG', names: ['weibo gaming', 'wbg'] },
  { id: 'LNG', names: ['lng esports', 'lng'] },
  { id: 'EDG', names: ['edward gaming', 'edg'] },
  { id: 'IG', names: ['invictus gaming', 'ig', 'invictus'] },
  { id: 'FPX', names: ['funplus phoenix', 'fpx'] },
  { id: 'RA', names: ['rare atom', 'ra'] },
  { id: 'RNG', names: ['royal never give up', 'rng', 'royal'] },
  { id: 'NIP', names: ['ninjas in pyjamas', 'nip', 'ninjas in pyjamas.cn'] },
  { id: 'OMG', names: ['oh my god', 'omg'] },
  { id: 'WE', names: ['team we', 'we'] },
  { id: 'AL', names: ["anyone's legend", 'al'] },
  { id: 'LGD', names: ['lgd gaming', 'lgd'] },
  { id: 'TT', names: ['thundertalk gaming', 'tt'] },
  { id: 'UP', names: ['ultra prime', 'up'] },

  // LCS
  { id: 'TL', names: ['team liquid', 'liquid', 'tl'] },
  { id: 'FLY', names: ['flyquest', 'fly'] },
  { id: 'C9', names: ['cloud9', 'cloud 9', 'c9'] },
  { id: 'NRG', names: ['nrg'] },
  { id: '100T', names: ['100 thieves', '100t'] },
  { id: 'IMT', names: ['immortals', 'imt'] },
  { id: 'DIG', names: ['dignitas', 'dig'] },
  { id: 'SR', names: ['shopify rebellion', 'shopify', 'sr'] },
];

function getTeamIdByName(name) {
  if (!name) return null;
  const lower = name.toLowerCase();
  const team = teams.find(t => t.names.includes(lower));
  return team?.id || null;
}

function getTeamLogoPath(ligaId, teamName) {
  const teamId = getTeamIdByName(teamName);
  if (!teamId) return null;
  return `/TeamLogos_${ligaId}/${teamId}.png`;
}

function EquipsConcret() {
  const { teamId } = useParams();
  const { t } = useTranslation();

  const teamMapping = {
     T1: 'T1', FNC: 'Fnatic', GENG: 'Gen.G', TL: 'Team Liquid', G2: 'G2 Esports', BLG: 'Bilibili Gaming',
     MKOI: 'Movistar KOI', TH: 'Team Heretics', BDS: 'Team BDS', SK: 'SK Gaming', VIT: 'Team Vitality',
     KC: 'Karmine Corp', GX: 'GiantX', RGE: 'Rogue (European Team)', KT: 'KT Rolster', HLE: 'Hanwha Life Esports', DK: 'Dplus KIA',
     DRX: 'DRX', NS: 'Nongshim Redforce', DNF: 'DN Freecs', BRO: 'OKsavingsbank Brion', BFX: 'BNK FearX',
     JDG: 'JD Gaming', TES: 'Top Esports', WBG: 'Weibo Gaming', LNG: 'LNG Esports', EDG: 'Edward Gaming',
     IG: 'Invictus Gaming', FPX: 'FunPlus Phoenix', RA: 'Rare Atom', RNG: 'Royal Never Give Up',
     NIP: 'Ninjas in Pyjamas.CN', OMG: 'Oh My God', WE: 'Team WE', AL: "Anyone's Legend",
     LGD: 'LGD Gaming', TT: 'ThunderTalk Gaming', UP: 'Ultra Prime',
     FLY: 'FlyQuest', C9: 'Cloud9', NRG: 'NRG', '100T': '100 Thieves',
     IMT: 'Immortals', DIG: 'Dignitas', SR: 'Shopify Rebellion',
  };
  
  const teamNombre = teamMapping[teamId] || teamId;

  const teamToLeague = {
    T1: 'LCK', FNC: 'LEC', GENG: 'LCK', TL: 'LCS', G2: 'LEC', BLG: 'LPL', MKOI: 'LEC', TH: 'LEC', BDS: 'LEC', 
    SK: 'LEC', VIT: 'LEC', KC: 'LEC', GX: 'LEC', RGE: 'LEC', KT: 'LCK', HLE: 'LCK', DK: 'LCK', DRX: 'LCK', 
    NS: 'LCK', DNF: 'LCK', BRO: 'LCK', BFX: 'LCK', JDG: 'LPL', TES: 'LPL', WBG: 'LPL', LNG: 'LPL', EDG: 'LPL', 
    IG: 'LPL', FPX: 'LPL', RA: 'LPL', RNG: 'LPL', NIP: 'LPL', OMG: 'LPL', WE: 'LPL', AL: 'LPL', LGD: 'LPL', 
    TT: 'LPL', UP: 'LPL', FLY: 'LCS', C9: 'LCS', NRG: 'LCS', "100T": 'LCS', IMT: 'LCS', DIG: 'LCS', SR: 'LCS'
  };
  const ligaId = teamToLeague[teamId];
  const ligaMapping = {
    LEC: 'LEC/2025 Season/Spring Season',
    LCK: 'LCK/2025 Season/Rounds 1-2',
    LPL: 'LPL/2024 Season/Spring Season',
    LCS: 'LCS/2024 Season/Spring Season',
  };
  const ligaNombre = ligaMapping[ligaId];

  const [clasificacion, setClasificacion] = useState([]);
  const [campeones, setCampeones] = useState([]);
  const [estadisticasJugadores, setEstadisticasJugadores] = useState([]);
  const [roster, setRoster] = useState([]);

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
        console.error(t('errors_equips.fetchClasificacion'), err);
      }
    };

    const fetchCampeones = async () => {
      if (!ligaNombre) return;
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'PicksAndBansS7',
            fields: [
              "Team1Pick1","Team1Pick2","Team1Pick3","Team1Pick4","Team1Pick5",
              "Team2Pick1","Team2Pick2","Team2Pick3","Team2Pick4","Team2Pick5",
              "Winner","Team1","Team2"
            ].join(','),
            where: `OverviewPage="${ligaNombre}"`,
            limit: '500',
          }),
        });
        const data = await response.json();
        const raw = data.cargoquery?.map(r => r.title) || [];

        const stats = {};
        raw.forEach(g => {
          const team1 = g.Team1?.toLowerCase();
          const team2 = g.Team2?.toLowerCase();

          const match = teams.find(t => t.id === teamId);
          if (!match) return;

          const matchesTeam1 = match.names.includes(team1);
          const matchesTeam2 = match.names.includes(team2);

          const teamSide = matchesTeam1 ? 'Team1' :
                          matchesTeam2 ? 'Team2' : null;
          if (!teamSide) return;

          for (let i = 1; i <= 5; i++) {
            const champ = g[`${teamSide}Pick${i}`];
            if (!champ) continue;
            if (!stats[champ]) stats[champ] = { games: 0, wins: 0 };
            stats[champ].games += 1;
            const winnerSide = g.Winner === '1' ? 'Team1' : 'Team2';
            if (winnerSide === teamSide) stats[champ].wins += 1;
          }
        });

        const arr = Object.entries(stats)
          .map(([champ, s]) => ({
            Champion: champ,
            GamesPlayed: s.games,
            WinRate: ((s.wins/s.games)*100).toFixed(1)
          }))
          .sort((a, b) => b.GamesPlayed - a.GamesPlayed)
          .slice(0, 10);

        setCampeones(arr);
      } catch (err) {
        console.error(t('errors_equips.fetchCampeones'), err);
      }
    };

    const fetchEstadisticasJugadores = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link,Team,Kills,Deaths,Assists,CS,Gold,GameId',
            where: `OverviewPage="${ligaNombre}" AND Team="${teamNombre}" AND Link!=""`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(d => d.title) || [];

        const players = {};
        const teamKillsPorPartida = {};

        let totalTeamGold = 0;

        rows.forEach(row => {
          const gameId = row.GameId;
          const kills = parseInt(row.Kills || 0);
          if (!teamKillsPorPartida[gameId]) teamKillsPorPartida[gameId] = 0;
          teamKillsPorPartida[gameId] += kills;
        });

        rows.forEach(row => {
          const rawName = row.Link.replace(/\s*\(.*?\)\s*/g, ''); //Elimina els entre parèntesis
          const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
          const kills = parseInt(row.Kills || 0);
          const deaths = parseInt(row.Deaths || 0);
          const assists = parseInt(row.Assists || 0);
          const cs = parseInt(row.CS || 0);
          const gold = parseInt(row.Gold || 0);
          const gameId = row.GameId;

          totalTeamGold += gold;

          const teamKills = teamKillsPorPartida[gameId] || 0;
          const kp = teamKills > 0 ? (kills + assists) / teamKills : 0;

          if (!players[name]) {
            players[name] = {
              name,
              kills: 0,
              deaths: 0,
              assists: 0,
              cs: 0,
              gold: 0,
              kpSum: 0,
              games: 0,
            };
          }

          players[name].kills += kills;
          players[name].deaths += deaths;
          players[name].assists += assists;
          players[name].cs += cs;
          players[name].gold += gold;
          players[name].kpSum += kp;
          players[name].games += 1;
        });

        const playerStats = Object.values(players).map(p => ({
          Jugador: p.name,
          KDA: ((p.kills + p.assists) / Math.max(1, p.deaths)).toFixed(2),
          KP: (p.kpSum / p.games * 100).toFixed(1) + '%',
          CSM: (p.cs / (p.games * 30)).toFixed(2),
          Or: ((p.gold / totalTeamGold) * 100).toFixed(1) + '%'
        }));

        setEstadisticasJugadores(playerStats);
      } catch (err) {
        console.error(t('errors_equips.fetchEstadisticasJugadores'), err);
      }
    };

    const fetchRoster = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'TournamentRosters',
            fields: 'RosterLinks,Roles',
            where: `OverviewPage="${ligaNombre}" AND Team="${teamNombre}"`,
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(d => d.title) || [];

        if (rows.length === 0) return;

        const rosterLinks = rows[0].RosterLinks?.split(';;') || [];
        const roles = rows[0].Roles?.split(';;') || [];

        const jugadores = rosterLinks
          .map((j, idx) => {
            const alias = j.replace(/\s*\(.*?\)\s*/g, '').trim(); //Treu els parèntesis amb el nom dels alias
            return { jugador: alias, rol: roles[idx] };
          })
          .filter(p => ['Top', 'Jungle', 'Mid', 'Bot', 'Support', 'ADC'].includes(p.rol));

        setRoster(jugadores);
      } catch (err) {
        console.error(t('errors_equips.fetchRoster'), err);
      }
    };

    fetchClasificacion();
    fetchCampeones();
    fetchEstadisticasJugadores();
    fetchRoster();
  }, [ligaNombre, teamNombre, teamId, t]);

  const getWinRateClass = (winRate) => {
    const rate = parseFloat(winRate);
    if (rate < 50) return 'winrate-red';
    if (rate < 60) return 'winrate-yellow';
    return 'winrate-green';
  };

  return (
    <div className="main-container">
      <main className="equips-concret-content">
        <BuscadorEquips variant="concret"/>
        <div className="team-header">
          {getTeamLogoPath(ligaId, teamNombre) && (
            <img
              src={getTeamLogoPath(ligaId, teamNombre)}
              alt={teamNombre}
              className="team-logo-large"
            />
          )}
          <h1 className="team-name-title">{teamNombre}</h1>
        </div>

        {roster.length > 0 && (
          <div className="table roster-table">
            <h2>{t('equips_concret.roster_title', { liga: ligaId })}</h2>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <table>
                <thead>
                  <tr>
                    {roster.map((j, i) => (
                      <th key={`rol-${i}`}>{j.rol}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {roster.map((j, i) => (
                      <td key={`jugador-${i}`}>
                        <Link 
                          to={`/jugadors/${encodeURIComponent(j.jugador)}`}style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#e2cc08')} onMouseLeave={(e) => (e.target.style.color = 'inherit')}>
                          {j.jugador}
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="tables-wrapper">
          <div className="table-row">
            {clasificacion.length > 0 && (
              <div className="table">
                <h2>{t('equips_concret.clasificacion_title', { liga: ligaId })}</h2>
                <table>
                  <thead>
                    <tr><th>#</th><th>{t('equips_concret.team')}</th><th>Record</th></tr>
                  </thead>
                  <tbody>
                    {clasificacion.map((equipo, idx) => {
                      const esEquipoActual = equipo.Team.toLowerCase() === teamNombre.toLowerCase();
                      return (
                        <tr style={{ backgroundColor: esEquipoActual ? '#433558' : 'transparent' }} key={idx}>
                          <td>{idx + 1}</td>
                          <td className="lligues-team-cell">
                            <Link 
                              to={`/equips/${getTeamIdByName(equipo.Team)}`} 
                              style={{color: 'inherit', textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                              <img
                                src={getTeamLogoPath(ligaId, equipo.Team)}
                                alt={equipo.Team}
                                className="lligues-team-logo"
                                onError={(e) => (e.target.style.display = 'none')}
                              />
                              <span style={{ fontWeight: esEquipoActual ? 'bold' : 'normal'}} onMouseEnter={(e) => (e.target.style.color = '#e2cc08')}onMouseLeave={(e) => (e.target.style.color = 'inherit')}>
                                {equipo.Team}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <span style={{ color: 'rgb(0, 179, 0)'}}>{equipo.WinSeries}</span> - <span style={{ color: 'rgb(230, 0, 0)'}}>{equipo.LossSeries}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="table">
              <h2>{t('equips_concret.champions_title')}</h2>
              <table>
                <thead>
                  <tr>
                    <th>{t('equips_concret.champion')}</th>
                    <th>{t('equips_concret.games')}</th>
                    <th>{t('equips_concret.win_rate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {campeones.map((c, i) => (
                    <tr key={i}>
                      <td>{c.Champion}</td>
                      <td>{c.GamesPlayed}</td>
                      <td className={getWinRateClass(c.WinRate)}>{c.WinRate}%</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="table">
            <h2>{t('equips_concret.player_stats_title')}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t('equips_concret.player')}</th>
                  <th>KDA</th>
                  <th>KP%</th>
                  <th>CSM</th>
                  <th>{t('equips_concret.gold')}</th>
                </tr>
              </thead>
              <tbody>
                {estadisticasJugadores.map((j, i) => (
                  <tr key={i}>
                    <td>
                      <Link 
                          to={`/jugadors/${encodeURIComponent(j.Jugador)}`}style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#e2cc08')} onMouseLeave={(e) => (e.target.style.color = 'inherit')}>
                          {j.Jugador}
                      </Link>
                    </td>
                    <td>{j.KDA}</td>
                    <td>{j.KP}</td>
                    <td>{j.CSM}</td>
                    <td>{j.Or}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EquipsConcret;
