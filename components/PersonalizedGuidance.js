// file: components/PersonalizedGuidance.js
'use client';

import styles from './personalizedGuidance.module.css';
import Link from 'next/link';
import { useUser } from '../context/UserContext';

const translations = {
  en: {
    title: "Your Election Journey",
    stateLabel: "Current Status",
    actionLabel: "Next Best Action",
    states: {
      NOT_STARTED: "Not Started",
      IN_PROGRESS: "Draft Active",
      SUBMITTED: "Application Filed",
      COMPLETED: "Ready to Vote"
    },
    actions: {
      NOT_STARTED: "Draft your registration form and verify eligibility.",
      IN_PROGRESS: "Complete your unfinished draft to secure your registration.",
      SUBMITTED: "Check your field verification timeline and BLO status.",
      COMPLETED: "Locate your polling booth and plan your voting day."
    },
    ctas: {
      NOT_STARTED: "Start Registration",
      IN_PROGRESS: "Continue Drafting",
      SUBMITTED: "Track Verification",
      COMPLETED: "Find Polling Booth"
    }
  },
  hi: {
    title: "आपकी चुनावी यात्रा",
    stateLabel: "वर्तमान स्थिति",
    actionLabel: "अगला सबसे अच्छा कदम",
    states: {
      NOT_STARTED: "शुरू नहीं हुआ",
      IN_PROGRESS: "ड्राफ्ट सक्रिय",
      SUBMITTED: "आवेदन दायर",
      COMPLETED: "मतदान के लिए तैयार"
    },
    actions: {
      NOT_STARTED: "अपना पंजीकरण फॉर्म ड्राफ्ट करें और पात्रता सत्यापित करें।",
      IN_PROGRESS: "अपनी पंजीकरण सुरक्षित करने के लिए अपना अधूरा ड्राफ्ट पूरा करें।",
      SUBMITTED: "अपने क्षेत्र सत्यापन समयरेखा और बीएलओ स्थिति की जांच करें।",
      COMPLETED: "अपने मतदान केंद्र का पता लगाएं और अपने मतदान दिवस की योजना बनाएं।"
    },
    ctas: {
      NOT_STARTED: "पंजीकरण शुरू करें",
      IN_PROGRESS: "ड्राफ्टिंग जारी रखें",
      SUBMITTED: "सत्यापन ट्रैक करें",
      COMPLETED: "मतदान केंद्र खोजें"
    }
  }
};

export default function PersonalizedGuidance({ lang = 'en' }) {
  const { userState } = useUser();
  const t = translations[lang];

  // Determine State
  let currentState = 'NOT_STARTED';
  if (userState.verificationStatus === 'COMPLETED') {
    currentState = 'COMPLETED';
  } else if (userState.registrationStatus === 'SUBMITTED') {
    currentState = 'SUBMITTED';
  } else if (userState.registrationStatus === 'IN_PROGRESS') {
    currentState = 'IN_PROGRESS';
  }

  const getTargetLink = () => {
    if (currentState === 'COMPLETED') return '/voting';
    if (currentState === 'SUBMITTED') return '/timeline';
    return '/register';
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t.title}</h3>
        <div className={styles.pulseIcon}></div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoBlock}>
          <span className={styles.label}>{t.stateLabel}</span>
          <span className={currentState === 'COMPLETED' ? styles.valueSuccess : styles.value}>
            {t.states[currentState]}
          </span>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>{t.actionLabel}</span>
          <p className={styles.actionText}>{t.actions[currentState]}</p>
        </div>
      </div>

      <Link href={getTargetLink()} className={styles.cta}>
        {t.ctas[currentState]} →
      </Link>
    </div>
  );
}
