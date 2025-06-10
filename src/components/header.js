import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import './styles/Home.css';

function Header() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="logo">LoD</div>
      <nav className="nav-links">
        <Link to="/">Inici</Link>
        <Link
          to="/lligues"
          className={location.pathname === '/lligues' ? 'active' : ''}
        >
          Lligues
        </Link>
        <Link
          to="/equips"
          className={location.pathname === '/equips' ? 'active' : ''}
        >
          Equips
        </Link>
        <Link
          to="/jugadors"
          className={location.pathname === '/jugadors' ? 'active' : ''}
        >
          Jugadors
        </Link>
        <Link
          to="/quesom"
          className={location.pathname === '/quesom' ? 'active' : ''}
        >
          Què som?
        </Link>
      </nav>
      <div className="language-select" ref={dropdownRef}>
        <span className="language-label">
          <img src="/catalan_flag.svg" alt="Catalan Flag" className="flag-icon" />
          Català
        </span>
        <div className="menu-icon" onClick={toggleDropdown}>☰</div>
        {dropdownOpen && (
          <div className="language-dropdown">
            <div className="language-option language-label">
              <img src="/uk_flag.png" alt="UK Flag" className="flag-icon" /> 
              English
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
