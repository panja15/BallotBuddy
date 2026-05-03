// file: components/FormDecision.js
'use client';

import { useState } from 'react';
import styles from './formDecision.module.css';

const translations = {
  en: {
    title: "Select Your Intent",
    subtitle: "Tell us why you're here, and we'll guide you to the correct official form.",
    recommended: "Recommended Phase:",
    startFilling: "Start Preparation →",
    proceedECI: "Proceed to ECI Portal →",
    readyLabel: "I have all my documents ready (Aadhaar, Address Proof, Photo)",
    readyNote: "Check this to skip our internal guide and go directly to the official portal.",
    intents: [
      {
        id: 'registration',
        icon: '📝',
        label: 'New Voter Registration',
        form: 'form-6',
        explanation: 'For first-time voters or those who have moved to a new assembly constituency.'
      },
      {
        id: 'correction',
        icon: '✏️',
        label: 'Correction in Details',
        form: 'form-8',
        explanation: 'Correct existing details like name, age, or photo in the electoral roll.'
      },
      {
        id: 'deletion',
        icon: '🗑️',
        label: 'Deletion of a Name',
        form: 'form-7',
        explanation: 'Object to an inclusion or request removal due to death or shifting.'
      },
      {
        id: 'shift',
        icon: '🏠',
        label: 'Change of Address',
        form: 'form-8a',
        explanation: 'Moved your residence within the same assembly constituency.'
      }
    ]
  },
  hi: {
    title: "अपना इरादा चुनें",
    subtitle: "हमें बताएं कि आप यहाँ क्यों हैं, और हम आपको सही आधिकारिक फॉर्म तक ले जाएंगे।",
    recommended: "अनुशंसित चरण:",
    startFilling: "तैयारी शुरू करें →",
    proceedECI: "ईसीआई पोर्टल पर आगे बढ़ें →",
    readyLabel: "मेरे पास सभी दस्तावेज तैयार हैं (आधार, पते का प्रमाण, फोटो)",
    readyNote: "हमारे आंतरिक गाइड को छोड़ने और सीधे आधिकारिक पोर्टल पर जाने के लिए इसे चुनें।",
    intents: [
      {
        id: 'registration',
        icon: '📝',
        label: 'नया मतदाता पंजीकरण',
        form: 'form-6',
        explanation: 'पहली बार मतदाताओं के लिए या जो एक नए विधानसभा क्षेत्र में स्थानांतरित हुए हैं।'
      },
      {
        id: 'correction',
        icon: '✏️',
        label: 'विवरण में सुधार',
        form: 'form-8',
        explanation: 'मतदाता सूची में नाम, आयु या फोटो जैसे मौजूदा विवरण सुधारें।'
      },
      {
        id: 'deletion',
        icon: '🗑️',
        label: 'नाम हटाना',
        form: 'form-7',
        explanation: 'किसी नाम को शामिल करने पर आपत्ति या मृत्यु या स्थानांतरण के कारण हटाने का अनुरोध।'
      },
      {
        id: 'shift',
        icon: '🏠',
        label: 'पते में परिवर्तन',
        form: 'form-8a',
        explanation: 'उसी विधानसभा क्षेत्र के भीतर अपना निवास स्थान बदल लिया है।'
      }
    ]
  }
};

export default function FormDecision({ onSelect, lang = 'en' }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const t = translations[lang];

  const selectedIntent = t.intents.find(i => i.id === selectedId);

  const handleAction = () => {
    localStorage.setItem('ballotBuddy_activeForm', selectedIntent.form);
    if (isReady) {
      sessionStorage.setItem("eci_redirect", "true");
      window.open("https://voters.eci.gov.in/", "_blank");
    }
    onSelect(selectedIntent.form, isReady);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <div className={styles.optionsGrid}>
        {t.intents.map(intent => (
          <div 
            key={intent.id}
            className={`${styles.optionCard} ${selectedId === intent.id ? styles.selected : ''}`}
            onClick={() => setSelectedId(intent.id)}
          >
            <span className={styles.optionIcon}>{intent.icon}</span>
            <span className={styles.optionLabel}>{intent.label}</span>
          </div>
        ))}
      </div>

      {selectedIntent && (
        <div className={styles.resultPanel}>
          <div className={styles.resultHeader}>
            <div className={styles.formTag}>{selectedIntent.form.toUpperCase().replace('-', ' ')}</div>
            <h3 className={styles.resultTitle}>{t.recommended} {selectedIntent.label}</h3>
            <p className={styles.explanation}>{selectedIntent.explanation}</p>
          </div>

          <div className={styles.readyControl}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={isReady} 
                onChange={(e) => setIsReady(e.target.checked)} 
              />
              <span className={styles.checkText}>{t.readyLabel}</span>
            </label>
            <p className={styles.readyNote}>{t.readyNote}</p>
          </div>

          <button 
            className={isReady ? styles.proceedECI : styles.proceedBtn}
            onClick={handleAction}
          >
            {isReady ? t.proceedECI : t.startFilling}
          </button>
        </div>
      )}
    </div>
  );
}
