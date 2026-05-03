// file: app/register/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './register.module.css';
import { useUser } from '../../context/UserContext';

// System Components
import FormRenderer from '../../components/FormRenderer';
import FormDecision from '../../components/FormDecision';
import ValidityCheck from '../../components/ValidityCheck';
import AIFormInsight from '../../components/AIFormInsight';
import ValidationSummary from '../../components/ValidationSummary';
import OutcomeExplanation from '../../components/OutcomeExplanation';

// Logic & Data
import { FORM_6_SCHEMA } from '../../lib/forms/form6.schema';
import { FORM_7_SCHEMA } from '../../lib/forms/form7.schema';
import { FORM_8_SCHEMA } from '../../lib/forms/form8.schema';
import { FORM_8A_SCHEMA } from '../../lib/forms/form8a.schema';
import { validateForm } from '../../lib/forms/validate';

const FORMS = {
  "form-6": FORM_6_SCHEMA,
  "form-7": FORM_7_SCHEMA,
  "form-8": FORM_8_SCHEMA,
  "form-8a": FORM_8A_SCHEMA
};

const translations = {
  en: {
    portalTitle: "Voter Registration Portal",
    portalSub: "Let BallotBuddy guide you through the official Indian election process.",
    welcomeBack: "Welcome Back!",
    redirectNote: "We noticed you were redirected to the official Election Commission portal.",
    confirmQuestion: "Did you complete and submit your application on the ECI portal?",
    confirmYes: "Yes, it's submitted",
    confirmNo: "No, not yet",
    hintNote: "Updating this helps BallotBuddy track your verification timeline and BLO visit status.",
    draftPrepared: "Registration Draft Prepared!",
    journeyTracked: "Your application journey is being tracked. Next, wait for BLO verification.",
    viewTimeline: "View My Journey Timeline →",
    intent: "Intent",
    validity: "Validity",
    saveDraft: "Save {form} Draft",
    trustNote: "Based on official guidelines from the Election Commission of India",
    previewTitle: "Draft Preview",
    noData: "No data entered yet..."
  },
  hi: {
    portalTitle: "मतदाता पंजीकरण पोर्टल",
    portalSub: "बैलेटबडी को आधिकारिक भारतीय चुनाव प्रक्रिया के माध्यम से आपका मार्गदर्शन करने दें।",
    welcomeBack: "वापसी पर स्वागत है!",
    redirectNote: "हमने देखा कि आपको आधिकारिक चुनाव आयोग पोर्टल पर भेज दिया गया था।",
    confirmQuestion: "क्या आपने ईसीआई पोर्टल पर अपना आवेदन पूरा किया और जमा किया?",
    confirmYes: "हाँ, यह जमा हो गया है",
    confirmNo: "नहीं, अभी नहीं",
    hintNote: "इसे अपडेट करने से बैलेटबडी को आपके सत्यापन समयरेखा और बीएलओ विज़िट स्थिति को ट्रैक करने में मदद मिलती है।",
    draftPrepared: "पंजीकरण ड्राफ्ट तैयार!",
    journeyTracked: "आपकी आवेदन यात्रा को ट्रैक किया जा रहा है। अगला, बीएलओ सत्यापन की प्रतीक्षा करें।",
    viewTimeline: "मेरी यात्रा समयरेखा देखें →",
    intent: "इरादा",
    validity: "वैधता",
    saveDraft: "{form} ड्राफ्ट सहेजें",
    trustNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित",
    previewTitle: "ड्राफ्ट पूर्वावलोकन",
    noData: "अभी तक कोई डेटा दर्ज नहीं किया गया है..."
  }
};

export default function RegisterPage() {
  const [lang, setLang] = useState('en');
  const { userState, updateState } = useUser();
  const [step, setStep] = useState('decision'); // decision | validity | filling | success | confirmation
  const [activeFormId, setActiveFormId] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const activeSchema = FORMS[activeFormId];

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener('langChange', handleLangChange);

    const isReturning = sessionStorage.getItem('eci_redirect');
    if (isReturning) {
      setStep('confirmation');
    }

    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = translations[lang];

  // --- Handlers ---

  const handleIntentSelected = (formId) => {
    setActiveFormId(formId);
    updateState({ formType: formId, registrationStatus: 'IN_PROGRESS' });
    setStep('validity');
  };

  const handleValidityConfirmed = () => {
    setStep('filling');
  };

  const handleFieldChange = (name, value) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      const validationErrors = validateForm(activeSchema, updated);
      setErrors(validationErrors);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(activeSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateState({ registrationStatus: 'SUBMITTED', verificationStatus: 'PENDING' });
    setStep('success');
  };

  const handleConfirmCompletion = (isComplete) => {
    if (isComplete) {
      updateState({ registrationStatus: 'SUBMITTED', verificationStatus: 'PENDING' });
      setStep('success');
    } else {
      setStep('decision');
    }
    sessionStorage.removeItem('eci_redirect');
  };

  // --- Render Steps ---

  if (step === 'confirmation') {
    return (
      <div className={styles.wrapper}>
        <div className={`fade-in ${styles.container}`}>
          <div className={styles.confirmationCard}>
            <div className={styles.confirmationHeader}>
              <span className={styles.iconLarge}>🗳️</span>
              <h2>{t.welcomeBack}</h2>
              <p>{t.redirectNote}</p>
            </div>
            
            <div className={styles.questionSection}>
              <p className={styles.mainQuestion}>{t.confirmQuestion}</p>
              <div className={styles.confirmBtns}>
                <button 
                  className={styles.btnConfirm} 
                  onClick={() => handleConfirmCompletion(true)}
                >
                  {t.confirmYes}
                </button>
                <button 
                  className={styles.btnCancel} 
                  onClick={() => handleConfirmCompletion(false)}
                >
                  {t.confirmNo}
                </button>
              </div>
            </div>
            
            <p className={styles.hint}>
              {t.hintNote}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'decision') {
    return (
      <div className={styles.wrapper}>
        <div className={`fade-in ${styles.container}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t.portalTitle}</h1>
            <p className={styles.subtitle}>{t.portalSub}</p>
          </div>
          <FormDecision onSelect={handleIntentSelected} lang={lang} />
        </div>
      </div>
    );
  }

  if (step === 'validity') {
    return (
      <div className={styles.wrapper}>
        <div className={`fade-in ${styles.container}`}>
          <ValidityCheck 
            formId={activeFormId} 
            onValidated={handleValidityConfirmed}
            onCancel={() => setStep('decision')}
            lang={lang}
          />
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className={styles.wrapper}>
        <div className={`fade-in ${styles.container}`}>
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>✓</div>
            <h2>{t.draftPrepared}</h2>
            <p>{t.journeyTracked}</p>
          </div>
          <OutcomeExplanation formId={activeFormId || 'form-6'} lang={lang} />
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/timeline" className={styles.nextStepBtn}>
              {t.viewTimeline}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Filling Step ---
  return (
    <div className={styles.wrapper}>
      <div className={`fade-in ${styles.container}`}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <button onClick={() => setStep('decision')}>{t.intent}</button>
            <span>›</span>
            <button onClick={() => setStep('validity')}>{t.validity}</button>
            <span>›</span>
            <strong className={styles.activeLabel}>{activeFormId?.toUpperCase()}</strong>
          </div>
          <h1 className={styles.title}>{activeSchema?.title}</h1>
        </div>

        <div className={styles.flexLayout}>
          <div className={styles.formSection}>
            <AIFormInsight formId={activeFormId} lang={lang} />
            
            <form onSubmit={handleSubmit}>
              <div className={styles.glassForm}>
                <FormRenderer 
                  schema={activeSchema} 
                  formData={formData} 
                  errors={errors}
                  onChange={handleFieldChange} 
                />

                <ValidationSummary 
                  schema={activeSchema} 
                  formData={formData} 
                  errors={errors} 
                  lang={lang}
                />

                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    className={styles.ctaButton}
                    disabled={Object.keys(errors).length > 0}
                  >
                    {t.saveDraft.replace('{form}', activeFormId?.replace('-', ' ').toUpperCase())}
                  </button>
                  <p className={styles.trustLabel}>
                    {t.trustNote}
                  </p>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.previewSection}>
            <div className={styles.previewCard}>
              <h3>{t.previewTitle}</h3>
              <div className={styles.previewList}>
                {Object.entries(formData).length === 0 ? (
                  <p style={{ opacity: 0.5 }}>{t.noData}</p>
                ) : (
                  Object.entries(formData).map(([key, value]) => (
                    <div key={key} className={styles.previewItem}>
                      <span>{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <strong>{value || '—'}</strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
