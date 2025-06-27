import React from 'react';
import './styles/Home.css';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="main-container fade-in">
      <main className="main-content">
        <h1>League of Data (LoD)</h1>
        <p>
          {t('home.description_part1')}
          <br />
          {t('home.description_part2')}
        </p>

        <img
          src="/home_image1.png"
          alt="League of Legends"
          className="main-image"
        />

        <div className="dictionary-section">
          <p>
            {t('home.dictionary_text')}
            <br />
            {t('home.dictionary_link_text_start')}{' '}
            <a
              href="https://es.scribd.com/document/672949555/Diccionari-LOL-en-catala#from_embed"
              className="highlight-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('home.dictionary_link_text')}
            </a>
          </p>
          <a
            href="https://es.scribd.com/document/672949555/Diccionari-LOL-en-catala#from_embed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/home_diccionari.png" 
              alt={t('home.dictionary_alt')}
              className="dictionary-icon"
            />
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;
