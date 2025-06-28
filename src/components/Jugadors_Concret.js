import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BuscadorJugadors from './Buscador_Jugadors.js';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles/Jugadors_Concret.css';

const teams = [
  //LCK
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

  //LEC
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

  //LPL
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

  //LCS
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

function JugadorsConcret() {
  const { jugadorId } = useParams();
  const { t } = useTranslation();

  //Creem una constant amb els alias d'alguns jugadors, ja que sino no es poden buscar bé al uscar el seu nom complet amb els parèntesis
  const aliasMapping = {
    Bin: 'Bin (Chen Ze-Bin)',
    Ice: 'Ice (Yoon Sang-hoon)',
    Berserker: 'Berserker (Kim Min-cheol)',
    APA: 'APA (Eain Stearns)',
    Angel: 'Angel (Xiang Tao)',
    Aki: 'Aki (Mao An)',
  };

  const [equipo, setEquipo] = useState('');
  const [ligaId, setLigaId] = useState('');
  const [ligaNombre, setLigaNombre] = useState('');
  const [clasificacion, setClasificacion] = useState([]);
  const [campeones, setCampeones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  
  const nomBuscat = aliasMapping[jugadorId] || jugadorId;

  useEffect(() => {
    const ligaMapping = {
      LEC: 'LEC/2025 Season/Spring Season',
      LCK: 'LCK/2025 Season/Rounds 1-2',
      LPL: 'LPL/2024 Season/Spring Season',
      LCS: 'LCS/2024 Season/Spring Season',
    };

    const fetchEquipoYLiga = async () => {
      try {
        const ligas = Object.values(ligaMapping).map(liga => `"${liga}"`).join(', ');
        const response = await fetch('/.netlify/functions/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Team,OverviewPage',
            where: `Link="${nomBuscat}" AND OverviewPage IN (${ligas})`,
            limit: '500',
          }),
        });

        const data = await response.json();
        const row = data?.cargoquery?.[0]?.title;

        if (!row) return;

        setEquipo(row.Team);
        const foundLigaId = Object.keys(ligaMapping).find(key => ligaMapping[key] === row.OverviewPage);
        setLigaId(foundLigaId);
        setLigaNombre(row.OverviewPage);
      } catch (err) {
        console.error(t('errors_jugadors.fetchEquipoYLiga'), err);
      }
    };

    fetchEquipoYLiga();
  }, [jugadorId, nomBuscat, t]);

  useEffect(() => {
    if (!ligaNombre || !equipo) return;

    const fetchClasificacion = async () => {
      try {
        const response = await fetch('/.netlify/functions/leaguepedia', {
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
        console.error(t('errors_jugadors.fetchClasificacion'), err);
      }
    };

    const fetchCampeonesJugador = async () => {
      try {
        const response = await fetch('/.netlify/functions/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Champion,Link,Team,PlayerWin,Kills,Deaths,Assists',
            where: `OverviewPage="${ligaNombre}" AND Link="${nomBuscat}"`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(r => r.title) || [];

        const stats = {};
        rows.forEach(row => {
          const champ = row.Champion;
          if (!champ) return;

          const kills = parseInt(row.Kills || '0', 10);
          const deaths = parseInt(row.Deaths || '0', 10);
          const assists = parseInt(row.Assists || '0', 10);
          const win = row.PlayerWin === 'Yes';

          if (!stats[champ]) {
            stats[champ] = { games: 0, wins: 0, kills: 0, deaths: 0, assists: 0 };
          }

          stats[champ].games += 1;
          if (win) stats[champ].wins += 1;
          stats[champ].kills += kills;
          stats[champ].deaths += deaths;
          stats[champ].assists += assists;
        });

        const arr = Object.entries(stats)
          .map(([champ, s]) => ({
            Champion: champ,
            GamesPlayed: s.games,
            WinRate: ((s.wins / s.games) * 100).toFixed(1),
            KDA: ((s.kills + s.assists) / Math.max(1, s.deaths)).toFixed(2),
          }))
          .sort((a, b) => b.GamesPlayed - a.GamesPlayed)
          .slice(0, 10);

        setCampeones(arr);
      } catch (err) {
        console.error(t('errors_jugadors.fetchCampeonesJugador'), err);
      }
    };

    const fetchEstadisticasJugador = async () => {
      try {
        const response = await fetch('/.netlify/functions/leaguepedia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: 'ScoreboardPlayers',
            fields: 'Link,Kills,Deaths,Assists,CS,Gold,DamageToChampions,TeamGold,GameId,TeamKills',
            where: `OverviewPage="${ligaNombre}" AND Link="${nomBuscat}"`,
            limit: '10000',
          }),
        });

        const data = await response.json();
        const rows = data.cargoquery?.map(r => r.title) || [];

        let totalKills = 0, totalDeaths = 0, totalAssists = 0;
        let totalCS = 0, totalGold = 0, totalDamage = 0;
        let totalTeamGold = 0, totalTeamKills = 0, totalGames = 0;

        rows.forEach(row => {
          totalKills += parseInt(row.Kills || '0', 10);
          totalDeaths += parseInt(row.Deaths || '0', 10);
          totalAssists += parseInt(row.Assists || '0', 10);
          totalCS += parseInt(row.CS || '0', 10);
          totalGold += parseInt(row.Gold || '0', 10);
          totalDamage += parseInt(row.DamageToChampions || '0', 10);
          totalTeamGold += parseInt(row.TeamGold || '0', 10);
          totalTeamKills += parseInt(row.TeamKills || '0', 10);
          totalGames++;
        });

        setEstadisticas({
          KDA: ((totalKills + totalAssists) / Math.max(1, totalDeaths)).toFixed(2),
          KP: ((totalKills + totalAssists) / Math.max(1, totalTeamKills) * 100).toFixed(1) + '%',
          CSM: (totalCS / (totalGames * 30)).toFixed(2),
          OR: ((totalGold / Math.max(1, totalTeamGold)) * 100).toFixed(1) + '%',
          DMGm: (totalDamage / (totalGames * 30)).toFixed(0),
          DMGPct: ((totalDamage / Math.max(1, totalTeamGold)) * 100).toFixed(1) + '%'
        });
      } catch (err) {
        console.error(t('errors_jugadors.fetchEstadistiquesJugador'), err);
      }
    };

    fetchClasificacion();
    fetchCampeonesJugador();
    fetchEstadisticasJugador();
  }, [ligaNombre, equipo, nomBuscat, t]);

  const getWinRateClass = (winRate) => {
    const rate = parseFloat(winRate);
    if (rate < 50) return 'winrate-red';
    if (rate < 60) return 'winrate-yellow';
    return 'winrate-green';
  };

  return (
    <div className="main-container">
      <BuscadorJugadors variant="concret"/>
      <main className="jugador-concret-content">
        <div className="jugador-header">
        
           {getTeamLogoPath(ligaId, equipo) && (
            <img
              src={getTeamLogoPath(ligaId, equipo)}
              alt={equipo}
              className="team-logo-large"
            />
          )}
          <h1 className="jugador-nom-gran">{jugadorId}</h1>
        </div>

        <div className="tables-wrapper">
          <div className="table-row">
            {clasificacion.length > 0 && (
              <div className="table">
                <h2>{t('jugadors_concret.clasificacion_title', { liga: ligaId })}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t('jugadors_concret.team')}</th>
                      <th>{t('jugadors_concret.record')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clasificacion.map((equipoClasificado, idx) => {
                      const esEquipoActual = equipoClasificado.Team.toLowerCase() === equipo.toLowerCase();
                      return (
                        <tr
                          key={idx}
                          style={{ backgroundColor: esEquipoActual ? '#433558' : 'transparent' }}>
                          <td>{idx + 1}</td>
                          <td className="lligues-team-cell">
                            <Link 
                              to={`/equips/${getTeamIdByName(equipoClasificado.Team)}`} 
                              style={{color: 'inherit', textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                              <img
                                src={getTeamLogoPath(ligaId, equipoClasificado.Team)}
                                alt={equipoClasificado.Team}
                                className="lligues-team-logo"
                                onError={(e) => (e.target.style.display = 'none')}
                              />
                              <span style={{ fontWeight: esEquipoActual ? 'bold' : 'normal' }} onMouseEnter={(e) => (e.target.style.color = '#e2cc08')}onMouseLeave={(e) => (e.target.style.color = 'inherit')}>
                                {equipoClasificado.Team}
                              </span>
                            </Link>
                          </td>
                           <td>
                            <span style={{ color: 'rgb(0, 179, 0)'}}>{equipoClasificado.WinSeries}</span> - <span style={{ color: 'rgb(230, 0, 0)'}}>{equipoClasificado.LossSeries}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {campeones.length > 0 && (
              <div className="table">
                <h2>{t('jugadors_concret.champions_title')}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>{t('jugadors_concret.champion')}</th>
                      <th>{t('jugadors_concret.games')}</th>
                      <th>{t('jugadors_concret.win_rate')}</th>
                      <th>KDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campeones.map((c, i) => (
                      <tr key={i}>
                        <td>{c.Champion}</td>
                        <td>{c.GamesPlayed}</td>
                        <td className={getWinRateClass(c.WinRate)}>{c.WinRate}%</td> 
                        <td>{c.KDA}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {Object.keys(estadisticas).length > 0 && (
            <div className="table">
              <h2>{t('jugadors_concret.player_stats_title')}</h2>
              <table>
                <tbody>
                  <tr><td><strong>KDA</strong></td><td>{estadisticas.KDA}</td></tr>
                  <tr><td><strong>KP%</strong></td><td>{estadisticas.KP}</td></tr>
                  <tr><td><strong>CSM</strong></td><td>{estadisticas.CSM}</td></tr>
                  <tr><td><strong>{t('equips_concret.gold')}</strong></td><td>{estadisticas.OR}</td></tr>
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
