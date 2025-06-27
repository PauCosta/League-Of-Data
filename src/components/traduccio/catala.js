const traduccioCA = {
  header: {
    home: 'Inici',
    leagues: 'Lligues',
    teams: 'Equips',
    players: 'Jugadors',
    about: 'Què som?',
    language_ca: 'Català',
    language_en: 'Anglès',
  },
  footer: {
    disclaimer:
      'League of Data no rep el suport de Riot Games i no reflecteix els punts de vista o opinions de Riot Games ni de la seva gestió. League of Legends és una marca registrada de Riot Games, Inc.',
  },
  home: {
    description_part1:
      'La primera pàgina web de visualització de dades d’equips professionals del videojoc',
    description_part2: 'League of Legends en català!',
    dictionary_text: 'Estàs perdut? Hi ha conceptes que no entens?',
    dictionary_link_text_start: 'Ja està disponible el',
    dictionary_link_text: 'diccionari de League of Legends en català!',
    dictionary_alt: 'Diccionari',
  },
  lligues: {
    title: 'LLIGUES'
  },
  lligues_concret: {
    clasificacion_title: 'Classificació',
    loading_clasificacion: 'Carregant classificació o no hi ha dades disponibles',
    classificacioTeam: 'Equip',
    wins: 'Victòries',
    losses: 'Derrotes',

    campeones_title: 'Campions fets servir',
    loading_campeones: 'Carregant els campions o no hi ha dades disponibles',

    champion: 'Campió',
    games_played: 'Partides',
    win_rate: '% Vict.',

    mejores_kda_title: 'Millors KDA',
    loading_mejores_kda: 'Carregant jugadors amb millor KDA o no hi ha dades disponibles',

    player: 'Jugador',
    team: 'Equip',
    kda: 'KDA',
    games: 'Partides',

    top_csm_title: 'Top CSM (Mitjana minions eliminats per minut)',
    loading_top_csm: 'Carregant Top CSM o no hi ha dades disponibles',
  },
  errors_lligues: {
    fetchClasificacion: 'Error carregant la classificació',
    fetchCampeones: 'Error carregant els campions',
    fetchMejoresKDA: 'Error carregant els millors KDA',
    fetchTopCSM: 'Error carregant el millor CS per minut',
  },
  buscador_equips: {
    alert: 'Equip no trobat o fora de les 4 lligues principals',
    placeholder: 'Busca un equip...',
  },
  equips: {
    title: 'EQUIPS',
    subtitle: 'Equips més populars',
  },
  equips_concret: {
    roster_title: 'Roster Actiu ({{liga}})',
    clasificacion_title: 'Classificació {{liga}}',
    team: 'Equip',
    champions_title: 'Campions més jugats',
    champion: 'Campió',
    games: 'Partides',
    win_rate: '% Vict.',
    player_stats_title: 'Estadístiques Individuals dels Jugadors',
    player: 'Jugador',
    gold: 'OR%',
  },
  errors_equips: {
    fetchClasificacion: 'Error carregant la classificació',
    fetchCampeones: 'Error carregant els campions de l’equip',
    fetchEstadisticasJugadores: 'Error carregant estadístiques dels jugadors',
    fetchRoster: 'Error carregant el roster',
  },
  jugadors: {
    title: 'JUGADORS',
    subtitle: 'Jugadors més populars',
  },
  buscador_jugadors:{
    alert: 'Jugador no trobat o fora de les 4 grans lligues (LEC, LCS, LCK i LPL). | Estàs fent masses peticions a la API, espera un moment abans de tornar a buscar.',
    placeholder: 'Busca un jugador...',
  },
  jugadors_concret: {
    clasificacion_title: 'Classificació {{liga}}',
    team: 'Equip',
    record: 'Record',
    champions_title: 'Campions més jugats',
    champion: 'Campió',
    games: 'Partides',
    win_rate: '% Vict.',
    player_stats_title: 'Estadístiques Individuals',
    gold: 'OR%',
  },
  errors_jugadors: {
    fetchEquipoYLiga: 'Error en obtenir equip i lliga',
    fetchClasificacion: 'Error en obtenir la classificació',
    fetchCampeonesJugador: 'Error en obtenir campions del jugador',
    fetchEstadistiquesJugador: 'Error en obtenir estadístiques del jugador',
  },
  quesom: {
    title: 'QUÈ SOM?',
    intro_text_part1: 'League of Data (LoD) és la primera pàgina web de visualització de dades d’equips professionals del videojoc League of Legends en català. El propòsit d’aquest projecte és apropar i augmentar la comunitat catalana de l’apartat competitiu del LoL.',
    intro_text_part2: 'Per fer-ho, s’ha creat un tastet de què en un futur serà una pàgina web amb totes les dades que t’imaginis. Per això de moment, el nombre de taules és limitat i hi ha vegades que tarda a carregar.',
    secondary_text_part1: 'A LoD podràs descobrir les dades competitives més interessants dels teus jugadors i equips preferits.',
    secondary_text_part2: 'A més, tindràs l’oportunitat de seguir totes les lligues del Tier 1 junt amb les seves estadístiques sense la necessitat de fer més de tres clics.',
    image1_alt: 'Esdeveniment de LoL',
    image2_alt: 'Celebració d’un torneig',
    image3_alt: 'Estadístiques de LoL',
 },
};

export default traduccioCA;
