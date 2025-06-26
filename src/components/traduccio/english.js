const traduccioEN = {
  header: {
    home: 'Home',
    leagues: 'Leagues',
    teams: 'Teams',
    players: 'Players',
    about: 'About Us',
    language_ca: 'Catalan',
    language_en: 'English',
  },
  footer: {
    disclaimer:
      'League of Data is not supported by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in managing League of Legends. League of Legends is a registered trademark of Riot Games, Inc.',
  },
  home: {
    description_part1:
      'The first website showing data visualization of professional teams of the video game',
    description_part2: 'League of Legends in catalan!',
    dictionary_text: 'Are you lost? Are there concepts you don’t understand?',
    dictionary_link_text_start: 'The',
    dictionary_link_text: 'League of Legends dictionary in catalan is now available!',
    dictionary_alt: 'Dictionary',
  },
  lligues: {
    title: 'LEAGUES'
  },
  lligues_concret: {
    clasificacion_title: 'Standings',
    loading_clasificacion: 'Loading standings...',
    classificacioTeam: 'Team',
    wins: 'Wins',
    losses: 'Losses',

    campeones_title: 'Most Picked Champions',
    loading_campeones: 'Loading champions...',

    champion: 'Champion',
    games_played: 'Games Played',
    win_rate: '%WR',

    mejores_kda_title: 'Best KDA',
    loading_mejores_kda: 'Loading best KDA players...',

    player: 'Player',
    team: 'Team',
    kda: 'KDA',
    games: 'Games',

    top_csm_title: 'TOP CSM (Average minions killed per minute)',
    loading_top_csm: 'Loading CS per minute...',
  },
  errors_lligues: {
    fetchClasificacion: 'Error loading standings',
    fetchCampeones: 'Error loading champions',
    fetchMejoresKDA: 'Error loading best KDA players',
    fetchTopCSM: 'Error loading best CS per minute',
  },
  buscador_equips: {
    alert: 'Team not found or outside the 4 major leagues.',
    placeholder: 'Search a team...',
  },
  equips: {
    title: 'TEAMS',
    subtitle: 'Most popular teams',
  },
  equips_concret: {
    roster_title: 'Active Roster ({{liga}})',
    clasificacion_title: 'Standings {{liga}}',
    team: 'Team',
    champions_title: 'Most Played Champions',
    champion: 'Champion',
    games: 'Games',
    win_rate: '% WR',
    player_stats_title: 'Individual Player Stats',
    player: 'Player',
    gold: 'Gold%',
  },
  errors_equips: {
    fetchClasificacion: 'Error loading standings',
    fetchCampeones: 'Error loading team champions',
    fetchEstadisticasJugadores: 'Error loading player statistics',
    fetchRoster: 'Error loading team roster',
  },
  jugadors: {
    title: 'PLAYERS',
    subtitle: 'Most popular players',
  },
  buscador_jugadors:{
    alert: 'Player not found or outside the 4 major leagues (LEC, LCS, LCK and LPL). | You are making too many requests to the API, please wait a moment before searching again.',
    placeholder: 'Search a player...',
  },
  jugadors_concret: {
    clasificacion_title: 'Standings {{liga}}',
    team: 'Team',
    record: 'Record',
    champions_title: 'Most Played Champions',
    champion: 'Champion',
    games: 'Games',
    win_rate: '% WR',
    player_stats_title: 'Individual Stats',
    gold: 'Gold%',
  },
  errors_jugadors: {
    fetchEquipoYLiga: 'Error fetching team and league',
    fetchClasificacion: 'Error fetching standings',
    fetchCampeonesJugador: 'Error fetching player champions',
    fetchEstadistiquesJugador: 'Error fetching player statistics',
  },
  quesom: {
    title: 'WHAT ARE WE?',
    intro_text_part1: 'League of Data (LoD) is the first website for data visualization of professional League of Legends teams in catalan. The purpose of this project is to promote and grow the catalan competitive LoL community.',
    intro_text_part2: 'To do this, a taste of what will be a web page with all the data you can imagine in the future has been created. For this reason, the number of tables is limited for now.',
    secondary_text_part1: 'At LoD, you will be able to explore the most interesting competitive data of your favorite players and teams.',
    secondary_text_part2: 'Plus, you will have the opportunity to follow all Tier 1 leagues and their stats without needing more than three clicks.',
    image1_alt: 'LoL event',
    image2_alt: 'Tournament celebration',
    image3_alt: 'LoL statistics',
  },
};

export default traduccioEN;
