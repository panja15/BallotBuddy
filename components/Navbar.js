// file: components/Navbar.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navbarTranslations = {
  en: {
    eligibility: "Eligibility",
    register: "Register",
    timeline: "Timeline",
    voting: "Voting",
    langName: "हिन्दी"
  },
  hi: {
    eligibility: "पात्रता",
    register: "पंजीकरण",
    timeline: "यात्रा",
    voting: "मतदान",
    langName: "English"
  }
};

export default function Navbar() {
  const [lang, setLang] = useState('en');
  const pathname = usePathname();

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    window.dispatchEvent(new CustomEvent('langChange', { detail: newLang }));
    localStorage.setItem('ballotBuddy_lang', newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = navbarTranslations[lang];

  const navItems = [
    { name: t.eligibility, href: '/eligibility' },
    { name: t.register, href: '/register' },
    { name: t.timeline, href: '/timeline' },
    { name: t.voting, href: '/voting' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          Ballot<span style={{ color: '#fff' }}>Buddy</span>
        </Link>
        
        <div style={styles.rightSection}>
          <ul style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    style={{
                      ...styles.link,
                      ...(isActive ? styles.activeLink : {})
                    }}
                  >
                    {item.name}
                    {isActive && <div style={styles.activeIndicator} />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button onClick={toggleLang} style={styles.langToggle}>
            {t.langName}
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    backgroundColor: 'rgba(10, 15, 30, 0.85)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.4s ease',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '950',
    color: 'var(--primary)',
    letterSpacing: '-1px',
    textDecoration: 'none',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#94A3B8',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    position: 'relative',
    padding: '0.5rem 0',
  },
  activeLink: {
    color: '#E2E8F0',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '100%',
    height: '2px',
    background: 'var(--primary)',
    borderRadius: '2px',
  },
  langToggle: {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.25)',
  }
};
