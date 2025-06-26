import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Equips.css';
import { useTranslation } from 'react-i18next';

const teams = [
  // LCK
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
  { id: 'RGE', names: ['rogue', 'rge'] },

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
  { id: 'NIP', names: ['ninjas in pyjamas', 'nip'] },
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

const teamNameToId = {};
teams.forEach(team => {
  team.names.forEach(name => {
    teamNameToId[name.toLowerCase()] = team.id;
  });
});

function Buscador_Equips({ variant = 'default' }) { //Apliquem variant per poder fer servir diferents estils css a equips.js i equips_concret.js
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const normalized = searchTerm.trim().toLowerCase();
      const teamId = teamNameToId[normalized];
      if (teamId) {
        navigate(`/equips/${teamId}`);
      } else {
        alert(t('buscador_equips.alert'));
      }
    }
  };

  return (
    <div className={`search-container ${variant === 'concret' ? 'concret' : ''}`}>
      <input
        type="text"
        className={`search-bar ${variant === 'concret' ? 'search-bar-concret' : ''}`}
        placeholder={t('buscador_equips.placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default Buscador_Equips;
