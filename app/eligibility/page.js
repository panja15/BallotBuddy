// file: app/eligibility/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './eligibility.module.css';
import { useUser } from '../../context/UserContext';

const translations = {
  en: {
    title: "Voter Eligibility Checker",
    desc: "Find out if you are eligible to register as a voter in India. Based on official ECI guidelines.",
    labelAge: "Your Age",
    placeholderAge: "Enter your age",
    labelCitizen: "Are you an Indian Citizen?",
    labelResident: "Are you an ordinary resident in your constituency?",
    btnCheck: "Check My Eligibility",
    btnChecking: "Checking...",
    yes: "Yes",
    no: "No",
    eligible: "✓ You are Eligible!",
    notEligible: "✕ Not Eligible",
    verifyDetails: "Verification Details:",
    aiLabel: "🤖 BallotBuddy AI Insight",
    trustLabel: "Based on official guidelines from the Election Commission of India",
    nextStep: "Next Step: Registration Guide →",
    reasons: {
      citizen: "Citizen of India",
      resident: "Ordinary Resident",
      agePass: "Age 18 or above",
      ageFail: "Under 18 years of age",
      nonCitizen: "Non-Indian Citizen",
      nonResident: "Not an ordinary resident"
    }
  },
  hi: {
    title: "मतदाता पात्रता जांचकर्ता",
    desc: "पता करें कि क्या आप भारत में मतदाता के रूप में पंजीकरण करने के पात्र हैं। आधिकारिक ईसीआई दिशानिर्देशों पर आधारित।",
    labelAge: "आपकी आयु",
    placeholderAge: "अपनी आयु दर्ज करें",
    labelCitizen: "क्या आप भारतीय नागरिक हैं?",
    labelResident: "क्या आप अपने निर्वाचन क्षेत्र में सामान्य निवासी हैं?",
    btnCheck: "मेरी पात्रता जांचें",
    btnChecking: "जांच हो रही है...",
    yes: "हाँ",
    no: "नहीं",
    eligible: "✓ आप पात्र हैं!",
    notEligible: "✕ पात्र नहीं है",
    verifyDetails: "सत्यापन विवरण:",
    aiLabel: "🤖 बैलेटबडी एआई अंतर्दृष्टि",
    trustLabel: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित",
    nextStep: "अगला कदम: पंजीकरण गाइड →",
    reasons: {
      citizen: "भारत का नागरिक",
      resident: "सामान्य निवासी",
      agePass: "18 वर्ष या उससे अधिक आयु",
      ageFail: "18 वर्ष से कम आयु",
      nonCitizen: "गैर-भारतीय नागरिक",
      nonResident: "सामान्य निवासी नहीं"
    }
  }
};

export default function EligibilityPage() {
  const [lang, setLang] = useState('en');
  const { updateState } = useUser();
  const [formData, setFormData] = useState({
    age: '',
    citizenship: 'yes',
    resident: 'yes',
  });
  const [result, setResult] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('ballotBuddy_userData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAIInsight = async (isEligible, reasons) => {
    setLoading(true);
    try {
      const prompt = `User Eligibility Result: ${isEligible ? 'Eligible' : 'Not Eligible'}. 
      Details: Age ${formData.age}, Citizen ${formData.citizenship}, Resident ${formData.resident}.
      Reasons: ${reasons.join(', ')}.
      Provide a brief, encouraging AI Insight explaining why and what the specific next action should be. 
      Answer in ${lang === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      setAiInsight(data.response || data.answer);
    } catch (err) {
      setAiInsight(lang === 'en' ? "You're on the right track! Make sure to verify your documents." : "आप सही रास्ते पर हैं! सुनिश्चित करें कि आप अपने दस्तावेजों का सत्यापन कर लें।");
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = (e) => {
    e.preventDefault();
    const ageNum = parseInt(formData.age);
    
    let isEligible = true;
    let reasons = [t.reasons.citizen, t.reasons.resident];

    if (ageNum < 18) {
      isEligible = false;
      reasons.push(t.reasons.ageFail);
    } else {
      reasons.push(t.reasons.agePass);
    }

    if (formData.citizenship === 'no') {
      isEligible = false;
      reasons = reasons.filter(r => r !== t.reasons.citizen);
      reasons.push(t.reasons.nonCitizen);
    }

    if (formData.resident === 'no') {
      isEligible = false;
      reasons = reasons.filter(r => r !== t.reasons.resident);
      reasons.push(t.reasons.nonResident);
    }

    if (isEligible) {
      updateState({ eligibilityChecked: true });
    }

    setResult({ isEligible, reasons });
    getAIInsight(isEligible, reasons);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`fade-in ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.description}>{t.desc}</p>
        </div>

        <div className={styles.glassCard}>
          <form className={styles.form} onSubmit={checkEligibility}>
            <div className={styles.group}>
              <label className={styles.label}>{t.labelAge}</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={styles.input}
                placeholder={t.placeholderAge}
                required
              />
            </div>

            <div className={styles.group}>
              <label className={styles.label}>{t.labelCitizen}</label>
              <select
                name="citizenship"
                value={formData.citizenship}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="yes">{t.yes}</option>
                <option value="no">{t.no}</option>
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>{t.labelResident}</label>
              <select
                name="resident"
                value={formData.resident}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="yes">{t.yes}</option>
                <option value="no">{t.no}</option>
              </select>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? t.btnChecking : t.btnCheck}
            </button>
          </form>
        </div>

        {result && (
          <div className={styles.resultPanel}>
            <div className={styles.resultHeader}>
              <h3 className={result.isEligible ? styles.eligible : styles.notEligible}>
                {result.isEligible ? t.eligible : t.notEligible}
              </h3>
            </div>
            
            <div className={styles.reasonsList}>
              <h4>{t.verifyDetails}</h4>
              <ul>
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {aiInsight && (
              <div className={styles.aiInsight}>
                <h4>{t.aiLabel}</h4>
                <p>{aiInsight}</p>
                <p className={styles.trustLabel}>{t.trustNote}</p>
              </div>
            )}

            {result.isEligible && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link href="/register" className={styles.nextStepBtn}>
                  {t.nextStep}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
