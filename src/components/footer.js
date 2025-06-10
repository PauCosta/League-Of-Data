import React from 'react';
import './styles/Home.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <span>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram_icon.png" alt="Instagram" /> 
          </a>
        </span>
        <span>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/twitter_icon.png" alt="Twitter" />
          </a>
        </span>
        <span>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/facebook_icon.png" alt="Facebook" />
          </a>
        </span>
        <span>
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/discord_icon.png" alt="Discord" />
          </a>
        </span>
      </div>
      <p>© 2025 League of Data</p>
      <small>
        League of Data no rep el suport de Riot Games i no reflecteix els punts de vista o opinions
        de Riot Games ni de la seva gestió. League of Legends és una marca registrada de Riot Games,
        Inc.
      </small>
    </footer>
  );
}

export default Footer;
