// file: components/ValidityCheck.js
'use client';

import { useState } from 'react';
import styles from './validityCheck.module.css';

const translations = {
  en: {
    title: "Document Readiness Check",
    subtitle: "Select your specific scenario below to identify critical document requirements and common rejection risks.",
    selectReason: "What is your registration scenario for {form}?",
    riskLabel: "Critical Risk Detected",
    riskNote: "Application rejection risk is high if documentation doesn't match this requirement exactly.",
    readyQuestion: "Are you ready with these documents?",
    btnBack: "← Change Intent",
    btnProceed: "Proceed to ECI Portal",
    reasons: {
      "form-6": [
        { id: "new", label: "First-time Voter (Age 18+)", risk: "Mismatched DOB proof is the #1 cause of rejection. Ensure Aadhaar or Birth Certificate details are identical to your application." },
        { id: "shift", label: "Shifted from another AC", risk: "Proof of residence for the NEW address must be in your name or an immediate family member's name." }
      ],
      "form-8": [
        { id: "correction", label: "Correction in existing entry", risk: "Legal proof is mandatory (e.g., Marriage certificate for name change, Gazetted notification for age correction)." },
        { id: "photo", label: "Replacement of Photo", risk: "Photo must be recent, high-resolution, passport-sized, with a plain white background." }
      ],
      "form-7": [
        { id: "death", label: "Deletion due to Death", risk: "The original Death Certificate is mandatory. Applications without it are rejected instantly." },
        { id: "shifting", label: "Deletion due to Shifting", risk: "Physical verification by BLO is required. Ensure shifting proof is verifiable." }
      ],
      "form-8a": [
        { id: "internal", label: "Change of address within same AC", risk: "Utility bills (Electricity/Gas) are preferred. Ensure they are not older than 3 months." }
      ]
    }
  },
  hi: {
    title: "दस्तावेज़ तत्परता जांच",
    subtitle: "महत्वपूर्ण दस्तावेज़ आवश्यकताओं और सामान्य अस्वीकृति जोखिमों की पहचान करने के लिए नीचे अपनी विशिष्ट स्थिति चुनें।",
    selectReason: "{form} के लिए आपकी पंजीकरण स्थिति क्या है?",
    riskLabel: "गंभीर जोखिम पाया गया",
    riskNote: "यदि दस्तावेज़ इस आवश्यकता से बिल्कुल मेल नहीं खाते हैं तो आवेदन अस्वीकृति का जोखिम अधिक है।",
    readyQuestion: "क्या आप इन दस्तावेजों के साथ तैयार हैं?",
    btnBack: "← इरादा बदलें",
    btnProceed: "ईसीआई पोर्टल पर आगे बढ़ें",
    reasons: {
      "form-6": [
        { id: "new", label: "पहली बार मतदाता (आयु 18+)", risk: "असंगत जन्मतिथि प्रमाण अस्वीकृति का #1 कारण है। सुनिश्चित करें कि आधार या जन्म प्रमाण पत्र का विवरण आपके आवेदन के समान हो।" },
        { id: "shift", label: "दूसरे एसी से स्थानांतरित", risk: "नए पते के लिए निवास का प्रमाण आपके नाम या परिवार के किसी सदस्य के नाम पर होना चाहिए।" }
      ],
      "form-8": [
        { id: "correction", label: "मौजूदा प्रविष्टि में सुधार", risk: "कानूनी प्रमाण अनिवार्य है (जैसे, नाम परिवर्तन के लिए विवाह प्रमाण पत्र, आयु सुधार के लिए राजपत्रित अधिसूचना)।" },
        { id: "photo", label: "फोटो बदलना", risk: "फोटो हाल की, उच्च-रिज़ॉल्यूशन, पासपोर्ट आकार की और सफेद पृष्ठभूमि वाली होनी चाहिए।" }
      ],
      "form-7": [
        { id: "death", label: "मृत्यु के कारण हटाना", risk: "मूल मृत्यु प्रमाण पत्र अनिवार्य है। इसके बिना आवेदन तुरंत अस्वीकार कर दिए जाते हैं।" },
        { id: "shifting", label: "स्थानांतरण के कारण हटाना", risk: "बीएलओ द्वारा भौतिक सत्यापन आवश्यक है। सुनिश्चित करें कि स्थानांतरण का प्रमाण सत्यापन योग्य है।" }
      ],
      "form-8a": [
        { id: "internal", label: "एक ही एसी के भीतर पते का परिवर्तन", risk: "उपयोगिता बिल (बिजली/गैस) पसंद किए जाते हैं। सुनिश्चित करें कि वे 3 महीने से अधिक पुराने नहीं हैं।" }
      ]
    }
  }
};

export default function ValidityCheck({ formId, onValidated, onCancel, lang = 'en' }) {
  const [selectedId, setSelectedId] = useState(null);
  const t = translations[lang];

  const reasons = t.reasons[formId] || [];
  const selectedOption = reasons.find(r => r.id === selectedId);
  const isWarning = selectedId && selectedOption.risk;

  const handleProceed = () => {
    sessionStorage.setItem("eci_redirect", "true");
    window.open("https://voters.eci.gov.in/", "_blank");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <div className={styles.checkCard}>
        <div className={styles.questionGroup}>
          <label className={styles.label}>{t.selectReason.replace('{form}', formId.toUpperCase())}</label>
          <div className={styles.radioList}>
            {reasons.map(opt => (
              <label 
                key={opt.id} 
                className={`${styles.radioCard} ${selectedId === opt.id ? styles.selected : ''}`}
              >
                <input 
                  type="radio" 
                  name="validity-reason"
                  value={opt.id}
                  checked={selectedId === opt.id}
                  onChange={() => setSelectedId(opt.id)}
                  className={styles.hiddenRadio}
                />
                <div className={styles.radioCircle}>
                  {selectedId === opt.id && <div className={styles.radioInner} />}
                </div>
                <span className={styles.radioLabel}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {isWarning && (
          <div className={styles.warningBox}>
            <div className={styles.warningHeader}>
              <span className={styles.warningIcon}>⚠️</span>
              <strong>{t.riskLabel}</strong>
            </div>
            <p className={styles.riskDesc}>{selectedOption.risk}</p>
            <p className={styles.warningNote}>{t.riskNote}</p>
          </div>
        )}

        <div className={styles.actionSection}>
          <p className={styles.readyText}>{t.readyQuestion}</p>
          <div className={styles.btnGroup}>
            <button className={styles.secondaryBtn} onClick={onCancel}>{t.btnBack}</button>
            <button 
              className={styles.primaryBtn} 
              disabled={!selectedId}
              onClick={handleProceed}
            >
              {t.btnProceed}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
