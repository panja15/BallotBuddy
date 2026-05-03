// file: components/OutcomeExplanation.js
'use client';

import styles from './outcomeExplanation.module.css';

const translations = {
  en: {
    title: "What happens next?",
    trustNote: "Based on official guidelines from the Election Commission of India. Typical processing time: 4-6 weeks.",
    rejectionTitle: "⚠️ Common Rejection Reasons",
    steps: [
      {
        icon: '🌐',
        title: 'Official Portal Submission',
        desc: 'You will need to upload your saved draft details and documents to the official ECI Voters\' Service Portal (VSP).'
      },
      {
        icon: '👮',
        title: 'BLO Field Verification',
        desc: 'A Booth Level Officer (BLO) will visit your residential address to verify the details and documents provided in your application.'
      },
      {
        icon: '⚖️',
        title: 'ERO Decision',
        desc: 'The Electoral Registration Officer (ERO) will review the BLO report and either approve or reject your application.'
      },
      {
        icon: '🪪',
        title: 'EPIC Generation',
        desc: 'If approved, your name will be added to the roll, and your physical Voter ID (EPIC) card will be printed and mailed to you.'
      }
    ],
    reasons: [
      "Age less than 18 years on the qualifying date",
      "Incomplete or blurry document uploads",
      "Applicant not found at residential address during BLO visit",
      "Multiple applications found for the same individual"
    ]
  },
  hi: {
    title: "आगे क्या होता है?",
    trustNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित। सामान्य प्रसंस्करण समय: 4-6 सप्ताह।",
    rejectionTitle: "⚠️ अस्वीकृति के सामान्य कारण",
    steps: [
      {
        icon: '🌐',
        title: 'आधिकारिक पोर्टल प्रस्तुति',
        desc: 'आपको अपने सहेजे गए ड्राफ्ट विवरण और दस्तावेजों को आधिकारिक ईसीआई वोटर्स सर्विस पोर्टल (VSP) पर अपलोड करना होगा।'
      },
      {
        icon: '👮',
        title: 'बीएलओ क्षेत्र सत्यापन',
        desc: 'एक बूथ स्तर का अधिकारी (BLO) आपके आवेदन में दिए गए विवरण और दस्तावेजों को सत्यापित करने के लिए आपके आवासीय पते पर आएगा।'
      },
      {
        icon: '⚖️',
        title: 'ईआरओ का निर्णय',
        desc: 'निर्वाचक रजिस्ट्रीकरण अधिकारी (ERO) बीएलओ रिपोर्ट की समीक्षा करेगा और आपके आवेदन को स्वीकृत या अस्वीकृत करेगा।'
      },
      {
        icon: '🪪',
        title: 'एपिक जनरेशन',
        desc: 'यदि स्वीकृत हो जाता है, तो आपका नाम सूची में जोड़ दिया जाएगा, और आपका भौतिक मतदाता आईडी (EPIC) कार्ड प्रिंट करके आपको डाक से भेजा जाएगा।'
      }
    ],
    reasons: [
      "अर्हक तिथि पर आयु 18 वर्ष से कम होना",
      "अधूरे या धुंधले दस्तावेज़ अपलोड",
      "बीएलओ विज़िट के दौरान आवासीय पते पर आवेदक का न मिलना",
      "एक ही व्यक्ति के लिए कई आवेदन मिलना"
    ]
  }
};

export default function OutcomeExplanation({ formId, lang = 'en' }) {
  const t = translations[lang];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t.title}</h3>
      
      <div className={styles.journey}>
        {t.steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.warningBox}>
        <div className={styles.warningTitle}>{t.rejectionTitle}</div>
        <ul className={styles.rejectionList}>
          {t.reasons.map((reason, i) => (
            <li key={i} className={styles.rejectionItem}>{reason}</li>
          ))}
        </ul>
      </div>

      <p className={styles.trustNote}>
        {t.trustNote}
      </p>
    </div>
  );
}
