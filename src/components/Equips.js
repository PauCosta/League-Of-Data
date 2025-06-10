import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/Equips.css';

function Equips() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  //Llista d'equips amb els seus alias per la busqueda
  const teams = [
    //LCK
    { id: 'T1', names: ['t1'] },
    { id: 'GENG', names: ['gen.g', 'geng', 'gen g'] },
    { id: 'KT', names: ['kt rolster', 'kt'] },
    { id: 'HLE', names: ['hanwha life', 'hle', 'hanwha'] },
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
    { id: 'RGE', names: ['rogue', 'rge'] },

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
    { id: 'NIP', names: ['ninjas in pyjamas', 'nip'] },
    { id: 'OMG', names: ['oh my god', 'omg'] },
    { id: 'WE', names: ['team we', 'we'] },
    { id: 'AL', names: ['anyones legends', 'al'] },
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

  const teamNameToId = {};
  teams.forEach(team => {
    team.names.forEach(name => {
      teamNameToId[name.toLowerCase()] = team.id;
    });
  });

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const normalized = searchTerm.trim().toLowerCase();
      const teamId = teamNameToId[normalized];
      if (teamId) {
        navigate(`/equips/${teamId}`);
      } else {
        alert('Equip no trobat o fora de les 4 lligues principals.');
      }
    }
  };

  return (
    <div className="main-container">
      <main className="main-content equips-page">
        <div className="header-row">
          <h1 className="equips-title">EQUIPS</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Busca un equip..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <p className="subtitle">Equips més populars</p>
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
