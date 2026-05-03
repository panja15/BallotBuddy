// file: app/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Smart UX Components
import SmartAlertBanner from '../components/SmartAlertBanner';
import PersonalizedGuidance from '../components/PersonalizedGuidance';

const translations = {
  en: {
    heroTitle: "Register. Verify. Vote — Without Confusion.",
    heroSub: "The all-in-one AI assistant for the Indian election cycle. Draft registration forms, correct your voter ID details, and locate your polling booth with confidence.",
    ctaStart: "Start Your Journey →",
    pathsTitle: "What do you want to do?",
    path1Title: "New Registration",
    path1Desc: "Apply for Form 6 and join the official electoral roll.",
    path2Title: "ID Correction",
    path2Desc: "Fix names, photos, or addresses in your existing ID.",
    path3Title: "Find My Booth",
    path3Desc: "Locate your polling station and plan your vote.",
    path4Title: "Journey Timeline",
    path4Desc: "Track every step from application to the booth.",
    whyTitle: "Designed for Accuracy",
    why1: "Official ECI Scenarios",
    why2: "Real-time AI Guidance",
    why3: "No Unofficial Data",
    trustNote: "Based on official guidelines from the Election Commission of India"
  },
  hi: {
    heroTitle: "पंजीकरण। सत्यापन। मतदान — बिना किसी भ्रम के।",
    heroSub: "भारतीय चुनाव चक्र के लिए ऑल-इन-वन एआई सहायक। पंजीकरण फॉर्म ड्राफ्ट करें, अपनी मतदाता पहचान पत्र विवरण सुधारें, और आत्मविश्वास के साथ अपना मतदान केंद्र खोजें।",
    ctaStart: "अपनी यात्रा शुरू करें →",
    pathsTitle: "आप क्या करना चाहते हैं?",
    path1Title: "नया पंजीकरण",
    path1Desc: "फॉर्म 6 के लिए आवेदन करें और आधिकारिक मतदाता सूची में शामिल हों।",
    path2Title: "आईडी सुधार",
    path2Desc: "अपनी मौजूदा आईडी में नाम, फोटो या पता सुधारें।",
    path3Title: "मेरा बूथ खोजें",
    path3Desc: "अपने मतदान केंद्र का पता लगाएं और अपने वोट की योजना बनाएं।",
    path4Title: "यात्रा समयरेखा",
    path4Desc: "आवेदन से बूथ तक हर कदम को ट्रैक करें।",
    whyTitle: "सटीकता के लिए डिज़ाइन किया गया",
    why1: "आधिकारिक ईसीआई परिदृश्य",
    why2: "वास्तविक समय एआई मार्गदर्शन",
    why3: "कोई अनौपचारिक डेटा नहीं",
    trustNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित"
  }
};

export default function Home() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = translations[lang];

  return (
    <div className={styles.wrapper}>
      {/* Smart Alert Banner - High Visibility */}
      <SmartAlertBanner lang={lang} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.badge}>{t.trustNote}</div>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.heroSub}>{t.heroSub}</p>
          
          {/* Personalized Command Center */}
          <PersonalizedGuidance lang={lang} />
          
          <div className={styles.heroActions}>
            <Link href="/eligibility" className={styles.ctaButton}>
              {t.ctaStart}
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.imageCard}>
            <Image 
              src="/hero.png" 
              alt="BallotBuddy Product Interface" 
              width={600} 
              height={400} 
              className={styles.mainImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* User Paths */}
      <section className={styles.pathsSection}>
        <h2 className={styles.sectionTitle}>{t.pathsTitle}</h2>
        <div className={styles.pathGrid}>
          <Link href="/register" className={styles.pathCard}>
            <div className={styles.cardIcon}>✍️</div>
            <h3>{t.path1Title}</h3>
            <p>{t.path1Desc}</p>
          </Link>
          <Link href="/register" className={styles.pathCard}>
            <div className={styles.cardIcon}>✏️</div>
            <h3>{t.path2Title}</h3>
            <p>{t.path2Desc}</p>
          </Link>
          <Link href="/voting" className={styles.pathCard}>
            <div className={styles.cardIcon}>📍</div>
            <h3>{t.path3Title}</h3>
            <p>{t.path3Desc}</p>
          </Link>
          <Link href="/timeline" className={styles.pathCard}>
            <div className={styles.cardIcon}>🛤️</div>
            <h3>{t.path4Title}</h3>
            <p>{t.path4Desc}</p>
          </Link>
        </div>
      </section>

      {/* Why Section */}
      <section className={styles.whySection}>
        <div className={styles.whyHeader}>
          <h2 className={styles.whyTitle}>{t.whyTitle}</h2>
        </div>
        <div className={styles.whyGrid}>
          <div className={styles.whyItem}>
            <div className={styles.whyIcon}>🛡️</div>
            <p>{t.why1}</p>
          </div>
          <div className={styles.whyItem}>
            <div className={styles.whyIcon}>🤖</div>
            <p>{t.why2}</p>
          </div>
          <div className={styles.whyItem}>
            <div className={styles.whyIcon}>⚖️</div>
            <p>{t.why3}</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 BallotBuddy — {t.trustNote}</p>
      </footer>
    </div>
  );
}
