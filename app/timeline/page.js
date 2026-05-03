// file: app/timeline/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './timeline.module.css';
import { useUser } from '../../context/UserContext';

const translations = {
  en: {
    pageTitle: "Your Voting Journey",
    pageSubtitle: "A comprehensive roadmap from registration to the polling booth.",
    currentStatus: "Current Status",
    currentlyAt: "You are currently at",
    phase1: "Eligibility Phase",
    phase2: "Form Phase",
    phase3: "Post-Application Phase",
    phaseDone: "Mission Accomplished",
    happeningLabel: "What’s happening",
    actionLabel: "What you should do",
    controlQuestion: "Have you completed this step?",
    yes: "Yes",
    notYet: "Not yet",
    aiTip: "🤖 AI Practical Tip",
    nextAction: "Next Best Action",
    nextActionEligibility: "Complete Eligibility Check",
    nextActionForm: "Complete {form}",
    nextActionVerify: "Verify Voter Entry",
    promptEligibility: "Finish your eligibility check to proceed to registration.",
    promptForm: "Complete your {form} draft to initiate the verification process.",
    trustNote: "Based on official guidelines from the Election Commission of India",
    readyTitle: "You're Ready to Vote!",
    readySub: "Congratulations! You have completed all essential phases of the voter journey.",
    readyChecklist: "Final Checklist:",
    readyItem1: "EPIC ID (Voter ID Card) received",
    readyItem2: "Name verified in electoral roll",
    readyItem3: "Polling booth located",
    btnBooth: "Find Polling Booth →",
    btnGuide: "Voting Day Guide →",
    steps: {
      eligibility: {
        title: "Eligibility Check",
        happening: "Verifying your fundamental right to vote based on age, residency, and citizenship.",
        action: "Review your eligibility criteria on the dashboard and ensure all details are accurate.",
        ai: "Tip: Use your Aadhaar or Birth Certificate as a primary reference to avoid date mismatches."
      },
      registration: {
        title: "Registration ({form})",
        happening: "Submission of {form} to the Election Commission for your requested update.",
        action: "Complete the schema-driven {form} and keep scanned copies of your documents ready.",
        ai: "Pro-Tip: Ensure your photo is passport-sized with a white background for faster processing."
      },
      verification: {
        title: "Verification",
        happening: "BLO (Booth Level Officer) field verification is in progress for your application.",
        action: "Keep your phone reachable and be available at your residential address for physical verification.",
        ai: "Real-World Tip: BLOs usually call before visiting. Keep your original documents handy."
      },
      voterListCheck: {
        title: "Check Voter List",
        happening: "Your name is being added or updated in the official Electoral Roll for your constituency.",
        action: "Use the EPIC search tool on the official ECI portal once your application is approved.",
        ai: "Tip: Final rolls are usually published 1-2 months before the actual voting day."
      },
      votingDay: {
        title: "Voting Day",
        happening: "The final phase where you cast your vote at your assigned polling booth.",
        action: "Download your digital voter slip (e-EPIC) to locate your booth and carry a valid ID.",
        ai: "Booth Tip: Voting is usually fastest between 10 AM and 12 PM."
      }
    }
  },
  hi: {
    pageTitle: "आपकी मतदान यात्रा",
    pageSubtitle: "पंजीकरण से लेकर मतदान केंद्र तक का एक व्यापक रोडमैप।",
    currentStatus: "वर्तमान स्थिति",
    currentlyAt: "आप अभी यहाँ हैं",
    phase1: "पात्रता चरण",
    phase2: "फॉर्म चरण",
    phase3: "आवेदन के बाद का चरण",
    phaseDone: "मिशन पूरा हुआ",
    happeningLabel: "क्या हो रहा है",
    actionLabel: "आपको क्या करना चाहिए",
    controlQuestion: "क्या आपने यह चरण पूरा कर लिया है?",
    yes: "हाँ",
    notYet: "अभी नहीं",
    aiTip: "🤖 एआई व्यावहारिक टिप",
    notReady: "तैयार नहीं",
    nextAction: "अगला सबसे अच्छा कदम",
    nextActionEligibility: "पात्रता जांच पूरी करें",
    nextActionForm: "{form} पूरा करें",
    nextActionVerify: "मतदाता प्रविष्टि सत्यापित करें",
    promptEligibility: "पंजीकरण के लिए आगे बढ़ने के लिए अपनी पात्रता जांच पूरी करें।",
    promptForm: "सत्यापन प्रक्रिया शुरू करने के लिए अपना {form} ड्राफ्ट पूरा करें।",
    trustNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित",
    readyTitle: "आप वोट देने के लिए तैयार हैं!",
    readySub: "बधाई हो! आपने मतदाता यात्रा के सभी आवश्यक चरणों को पूरा कर लिया है।",
    readyChecklist: "अंतिम चेकलिस्ट:",
    readyItem1: "एपिक आईडी (मतदाता पहचान पत्र) प्राप्त हुआ",
    readyItem2: "मतदाता सूची में नाम सत्यापित",
    readyItem3: "मतदान केंद्र का पता लगाया गया",
    btnBooth: "मतदान केंद्र खोजें →",
    btnGuide: "मतदान दिवस गाइड →",
    steps: {
      eligibility: {
        title: "पात्रता जांच",
        happening: "आयु, निवास और नागरिकता के आधार पर वोट देने के आपके मौलिक अधिकार का सत्यापन।",
        action: "डैशबोर्ड पर अपने पात्रता मानदंडों की समीक्षा करें और सुनिश्चित करें कि सभी विवरण सटीक हैं।",
        ai: "टिप: तारीखों के बेमेल होने से बचने के लिए अपने आधार या जन्म प्रमाण पत्र का प्राथमिक संदर्भ के रूप में उपयोग करें।"
      },
      registration: {
        title: "पंजीकरण ({form})",
        happening: "आपके अनुरोधित अपडेट के लिए चुनाव आयोग को {form} जमा करना।",
        action: "स्कीमा-संचालित {form} पूरा करें और अपने दस्तावेजों की स्कैन की गई प्रतियां तैयार रखें।",
        ai: "प्रो-टिप: सुनिश्चित करें कि तेजी से प्रसंस्करण के लिए आपकी तस्वीर सफेद पृष्ठभूमि के साथ पासपोर्ट आकार की है।"
      },
      verification: {
        title: "सत्यापन",
        happening: "आपके आवेदन के लिए बीएलओ (बूथ स्तर के अधिकारी) क्षेत्र सत्यापन प्रगति पर है।",
        action: "अपना फोन चालू रखें और भौतिक सत्यापन के लिए अपने आवासीय पते पर उपलब्ध रहें।",
        ai: "वास्तविक दुनिया की टिप: बीएलओ आमतौर पर आने से पहले कॉल करते हैं। अपने मूल दस्तावेज पास रखें।"
      },
      voterListCheck: {
        title: "मतदाता सूची जांचें",
        happening: "आपका नाम आपके निर्वाचन क्षेत्र के लिए आधिकारिक मतदाता सूची में जोड़ा या अपडेट किया जा रहा है।",
        action: "आपका आवेदन स्वीकृत होने के बाद आधिकारिक ईसीआई पोर्टल पर एपिक सर्च टूल का उपयोग करें।",
        ai: "टिप: अंतिम सूची आमतौर पर वास्तविक मतदान दिवस से 1-2 महीने पहले प्रकाशित की जाती है।"
      },
      votingDay: {
        title: "मतदान का दिन",
        happening: "अंतिम चरण जहां आप अपने निर्धारित मतदान केंद्र पर अपना वोट डालते हैं।",
        action: "अपने बूथ का पता लगाने के लिए अपना डिजिटल वोटर स्लिप (ई-एपिक) डाउनलोड करें और एक वैध आईडी साथ रखें।",
        ai: "बूथ टिप: मतदान आमतौर पर सुबह 10 बजे से दोपहर 12 बजे के बीच सबसे तेज़ होता है।"
      }
    }
  }
};

export default function TimelinePage() {
  const [lang, setLang] = useState('en');
  const { userState, updateState } = useUser();

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = translations[lang];

  // Map Global State to Timeline Steps
  const stepProgress = {
    eligibility: userState.eligibilityChecked,
    registration: userState.registrationStatus === 'SUBMITTED',
    verification: userState.verificationStatus === 'COMPLETED',
    voterListCheck: userState.verificationStatus === 'COMPLETED',
    votingDay: userState.verificationStatus === 'COMPLETED' // Simplified for now
  };

  const activeFormLabel = userState.formType ? userState.formType.replace('_', ' ') : 'Form 6';

  const toggleStep = (key, completed) => {
    if (key === 'eligibility') {
      updateState({ eligibilityChecked: completed });
    } else if (key === 'registration') {
      updateState({ registrationStatus: completed ? 'SUBMITTED' : 'IN_PROGRESS' });
    } else if (key === 'verification' || key === 'voterListCheck' || key === 'votingDay') {
      updateState({ verificationStatus: completed ? 'COMPLETED' : 'PENDING' });
    }
  };

  const journeySteps = [
    {
      id: 1,
      key: 'eligibility',
      title: t.steps.eligibility.title,
      happening: t.steps.eligibility.happening,
      action: t.steps.eligibility.action,
      aiInsight: t.steps.eligibility.ai,
      link: "/eligibility"
    },
    {
      id: 2,
      key: 'registration',
      title: t.steps.registration.title.replace('{form}', activeFormLabel),
      happening: t.steps.registration.happening.replace('{form}', activeFormLabel),
      action: t.steps.registration.action.replace('{form}', activeFormLabel),
      aiInsight: t.steps.registration.ai,
      link: "/register"
    },
    {
      id: 3,
      key: 'verification',
      title: t.steps.verification.title,
      happening: t.steps.verification.happening,
      action: t.steps.verification.action,
      aiInsight: t.steps.verification.ai,
      link: "/register"
    },
    {
      id: 4,
      key: 'voterListCheck',
      title: t.steps.voterListCheck.title,
      happening: t.steps.voterListCheck.happening,
      action: t.steps.voterListCheck.action,
      aiInsight: t.steps.voterListCheck.ai,
      link: "/voting"
    },
    {
      id: 5,
      key: 'votingDay',
      title: t.steps.votingDay.title,
      happening: t.steps.votingDay.happening,
      action: t.steps.votingDay.action,
      aiInsight: t.steps.votingDay.ai,
      link: "/voting"
    }
  ];

  const currentStep = journeySteps.find(step => !stepProgress[step.key]);
  const isAllCompleted = !currentStep;
  const currentStepId = currentStep ? currentStep.id : 6;

  return (
    <div className={styles.wrapper}>
      <div className={`fade-in ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t.pageTitle}</h1>
          <p className={styles.subtitle}>{t.pageSubtitle}</p>
        </div>

        <div className={styles.statusBanner}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>{t.currentStatus}</span>
            <span className={styles.statusValue}>
              {isAllCompleted ? t.phaseDone : (currentStepId === 1 ? t.phase1 : (currentStepId === 2 ? t.phase2 : t.phase3))}
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>{t.currentlyAt}</span>
            <span className={styles.statusValue}>{isAllCompleted ? (lang === 'en' ? 'Voting Ready' : 'मतदान के लिए तैयार') : currentStep.title}</span>
          </div>
        </div>
        
        <div className={styles.journey}>
          {journeySteps.map((step) => {
            const isCompleted = stepProgress[step.key];
            const isStepActive = currentStep ? step.id === currentStepId : false;
            const isUpcoming = currentStep ? step.id > currentStepId : false;

            const statusLabel = isCompleted ? (lang === 'en' ? "Completed" : "पूरा हुआ") : (isStepActive ? (lang === 'en' ? "In Progress" : "प्रगति पर") : (lang === 'en' ? "Upcoming" : "आगामी"));
            const icon = isCompleted ? "✔" : "⏳";

            return (
              <div 
                key={step.id} 
                className={`${styles.stepItem} ${isStepActive ? styles.activeStep : (isUpcoming ? styles.dimmedStep : '')} ${isCompleted ? styles.completedStep : ''}`}
              >
                <div className={styles.stepNumber}>
                  {icon}
                </div>
                
                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <h3 className={styles.itemTitle}>{step.title}</h3>
                    <span className={`${styles.statusBadge} ${isCompleted ? styles.completed : (isStepActive ? styles.inprogress : styles.upcoming)}`}>
                      {statusLabel}
                    </span>
                  </div>
                  
                  <div className={styles.infoSection}>
                    <label className={styles.infoLabel}>{t.happeningLabel}</label>
                    <p className={styles.infoText}>{step.happening}</p>
                  </div>

                  <div className={styles.infoSection}>
                    <label className={styles.infoLabel}>{t.actionLabel}</label>
                    <p className={styles.infoText}>{step.action}</p>
                  </div>

                  <div className={styles.userControl}>
                    <p className={styles.controlQuestion}>{t.controlQuestion}</p>
                    <div className={styles.controlBtns}>
                      <button 
                        className={`${styles.controlBtn} ${isCompleted ? styles.controlBtnActive : ''}`}
                        onClick={() => toggleStep(step.key, true)}
                      >
                        {t.yes}
                      </button>
                      <button 
                        className={`${styles.controlBtn} ${!isCompleted ? styles.controlBtnActive : ''}`}
                        onClick={() => toggleStep(step.key, false)}
                      >
                        {t.notYet}
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.aiInsightBox}>
                    <div className={styles.aiLabel}>{t.aiTip}</div>
                    <p>{step.aiInsight}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isAllCompleted ? (
          <div className={`fade-in ${styles.finalCard}`}>
            <div className={styles.finalHeader}>
              <span className={styles.bigCheck}>🛡️</span>
              <h2 className={styles.finalTitle}>{t.readyTitle}</h2>
              <p className={styles.finalSub}>{t.readySub}</p>
            </div>
            
            <div className={styles.finalChecklist}>
              <h4>{t.readyChecklist}</h4>
              <ul>
                <li>{t.readyItem1}</li>
                <li>{t.readyItem2}</li>
                <li>{t.readyItem3}</li>
              </ul>
            </div>

            <div className={styles.finalActions}>
              <Link href="/voting" className={styles.actionBtnPrimary}>{t.btnBooth}</Link>
              <Link href="/voting" className={styles.actionBtnSecondary}>{t.btnGuide}</Link>
            </div>
          </div>
        ) : (
          <div className={styles.nextActionBanner}>
            <span className={styles.nextActionLabel}>{t.nextAction}</span>
            <h2 className={styles.nextActionTitle}>
              {currentStepId === 1 ? t.nextActionEligibility : (currentStepId === 2 ? t.nextActionForm.replace('{form}', activeFormLabel) : t.nextActionVerify)}
            </h2>
            <Link href={currentStep.link} className={styles.nextActionBtn}>
              {currentStep.title} →
            </Link>
            <p className={styles.actionPrompt}>
              {currentStepId === 1 ? t.promptEligibility : t.promptForm.replace('{form}', activeFormLabel)}
            </p>
          </div>
        )}

        <div className={styles.trustSection}>
          <span className={styles.trustLabel}>{t.trustNote}</span>
        </div>
      </div>
    </div>
  );
}
