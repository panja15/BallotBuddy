// file: components/SmartAlertBanner.js
'use client';

import { useState } from 'react';
import styles from './smartAlertBanner.module.css';
import Link from 'next/link';
import { useUser } from '../context/UserContext';

const translations = {
  en: {
    NOT_STARTED: "Final inclusion window open! Register before the deadline to vote in the upcoming cycle.",
    IN_PROGRESS: "You have an unfinished draft. Complete your form to ensure your spot on the electoral roll.",
    SUBMITTED_PENDING: "Application submitted! Track your field verification status and BLO visit timeline.",
    VERIFIED_COMPLETED: "Verification complete! You are officially registered and ready for the voting day.",
    ctaRegister: "Register Now",
    ctaContinue: "Continue Form",
    ctaTrack: "Track Progress",
    ctaBooth: "Find Booth",
    statusNotStarted: "Not Registered",
    statusInProgress: "Draft Active",
    statusPending: "Verification Pending",
    statusCompleted: "Approved"
  },
  hi: {
    NOT_STARTED: "अंतिम समावेश विंडो खुली है! आगामी चक्र में मतदान करने के लिए समय सीमा से पहले पंजीकरण करें।",
    IN_PROGRESS: "आपके पास एक अधूरा ड्राफ्ट है। मतदाता सूची में अपना स्थान सुनिश्चित करने के लिए अपना फॉर्म पूरा करें।",
    SUBMITTED_PENDING: "आवेदन जमा हो गया! अपने क्षेत्र सत्यापन स्थिति और बीएलओ विज़िट समयरेखा को ट्रैक करें।",
    VERIFIED_COMPLETED: "सत्यापन पूरा! आप आधिकारिक तौर पर पंजीकृत हैं और मतदान दिवस के लिए तैयार हैं।",
    ctaRegister: "अभी पंजीकरण करें",
    ctaContinue: "फॉर्म जारी रखें",
    ctaTrack: "प्रगति ट्रैक करें",
    ctaBooth: "बूथ खोजें",
    statusNotStarted: "पंजीकृत नहीं",
    statusInProgress: "ड्राफ्ट सक्रिय",
    statusPending: "सत्यापन लंबित",
    statusCompleted: "स्वीकृत"
  }
};

export default function SmartAlertBanner({ lang = 'en' }) {
  const { userState } = useUser();
  const [isVisible, setIsVisible] = useState(true);
  const t = translations[lang];

  if (!isVisible) return null;

  // Determine Banner Content based on Global State
  let bannerKey = 'NOT_STARTED';
  let badgeStyle = styles.badgeWarning;
  let statusText = t.statusNotStarted;
  let ctaText = t.ctaRegister;
  let targetLink = '/register';

  if (userState.verificationStatus === 'COMPLETED') {
    bannerKey = 'VERIFIED_COMPLETED';
    badgeStyle = styles.badgeSuccess;
    statusText = t.statusCompleted;
    ctaText = t.ctaBooth;
    targetLink = '/voting';
  } else if (userState.registrationStatus === 'SUBMITTED') {
    bannerKey = 'SUBMITTED_PENDING';
    badgeStyle = styles.badgeInfo;
    statusText = t.statusPending;
    ctaText = t.ctaTrack;
    targetLink = '/timeline';
  } else if (userState.registrationStatus === 'IN_PROGRESS') {
    bannerKey = 'IN_PROGRESS';
    badgeStyle = styles.badgeWarning;
    statusText = t.statusInProgress;
    ctaText = t.ctaContinue;
    targetLink = '/register';
  }

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={badgeStyle}>
            {statusText}
          </span>
          <p className={styles.message}>
            {t[bannerKey]}
          </p>
        </div>
        <div className={styles.right}>
          <Link href={targetLink} className={styles.cta}>
            {ctaText} →
          </Link>
          <button className={styles.close} onClick={() => setIsVisible(false)}>✕</button>
        </div>
      </div>
    </div>
  );
}
