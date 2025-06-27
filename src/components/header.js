import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n.js';
import './styles/Home.css';

function Header() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const currentLang = i18n.language || 'ca';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //Canvi d'idioma i banderas
  const isCatalan = currentLang === 'ca';
  const currentFlag = isCatalan ? '/catalan_flag.svg' : '/uk_flag.png';
  const currentLangName = isCatalan ? t('header.language_ca') : t('header.language_en');

  const otherLang = isCatalan ? 'en' : 'ca';
  const otherFlag = isCatalan ? '/uk_flag.png' : '/catalan_flag.svg';
  const otherLangName = isCatalan ? t('header.language_en') : t('header.language_ca');

  return (
    <header className="navbar">
      <Link to="/" className="logo">LoD</Link>
      <nav className="nav-links">
        <Link to="/">{t('header.home')}</Link>
        <Link to="/lligues" className={location.pathname === '/lligues' ? 'active' : ''}>
          {t('header.leagues')}
        </Link>
        <Link to="/equips" className={location.pathname === '/equips' ? 'active' : ''}>
          {t('header.teams')}
        </Link>
        <Link to="/jugadors" className={location.pathname === '/jugadors' ? 'active' : ''}>
          {t('header.players')}
        </Link>
        <Link to="/quesom" className={location.pathname === '/quesom' ? 'active' : ''}>
          {t('header.about')}
        </Link>
      </nav>

      <div className="language-select" ref={dropdownRef}>
        <span className="language-label">
          <img src={currentFlag} alt="Flag" className="flag-icon" />
          {currentLangName}
        </span>
        <div className="menu-icon" onClick={toggleDropdown}>☰</div>

        {dropdownOpen && (
          <div className="language-dropdown">
            <div
              className="language-option language-label"
              onClick={() => changeLanguage(otherLang)}
            >
              <img src={otherFlag} alt="Flag" className="flag-icon" />
              {otherLangName}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
