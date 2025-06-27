import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const baseUrl = 'https://lol.fandom.com/api.php';

    const params = new URLSearchParams(JSON.parse(event.body));
    params.append('origin', '*');

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'LeagueOfDataBot/1.0 (2infernalred2@gmail.com)'
      },
      body: params.toString()
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('❌ Error en Netlify Function Leaguepedia:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al consultar Leaguepedia API' })
    };
  }
}
