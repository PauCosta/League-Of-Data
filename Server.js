import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/leaguepedia', async (req, res) => {
  try {
    const baseUrl = 'https://lol.fandom.com/api.php';
    const params = new URLSearchParams(req.body);
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
    res.json(data);
  } catch (error) {
    console.error('❌ Error en el proxy de Leaguepedia:', error);
    res.status(500).json({ error: 'Error al consultar Leaguepedia API' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy actiu a http://localhost:${PORT}`);
});
