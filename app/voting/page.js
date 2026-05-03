// file: app/voting/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './voting.module.css';

const translations = {
  en: {
    title: "Voting Day Guide",
    subtitle: "Actionable insights and official resources for the election cycle.",
    boothTitle: "Find Your Polling Booth",
    epicQuestion: "Do you have your EPIC (Voter ID) number?",
    yes: "Yes, I have it",
    no: "No, I don't",
    aiTip: "🤖 AI Booth Tip",
    aiTipYes: "Using your EPIC number is the fastest and most accurate method to find your booth.",
    aiTipNo: "You can still search using your name and location, but ensure details match your ID exactly.",
    eciPromptYes: "Use the EPIC search on the official portal for an instant booth lookup.",
    eciPromptNo: "Search using your personal details and residential location on the official site.",
    btnSearch: "Search on ECI Portal ↗",
    checklistTitle: "📝 After finding your booth, note down:",
    checkItem1: "Booth Number and Name",
    checkItem2: "Polling Station Address",
    checkItem3: "Voting Timings (Usually 7 AM to 6 PM)",
    phasesTitle: "📅 Election Process Phases",
    resultsTitle: "🏆 Check Election Results",
    resultsDesc: "Official results are published by the Election Commission of India after the counting process is finalized.",
    btnResults: "View Official Results ↗",
    disclaimer: "Note: Results are published officially on the Election Commission portal.",
    footerNote: "Based on official guidelines from the Election Commission of India.",
    phases: [
      {
        title: "Announcement",
        desc: "The ECI announces the schedule, triggering the Model Code of Conduct.",
        ai: "This ensures a level playing field for all political parties and candidates."
      },
      {
        title: "Registration",
        desc: "Eligible citizens can apply for inclusion or corrections in the electoral roll.",
        ai: "This is the window to ensure your name is correctly listed before the final roll."
      },
      {
        title: "Campaigning",
        desc: "Candidates and parties present their manifestos and reach out to voters.",
        ai: "A critical period for voters to evaluate candidate platforms and democratic choices."
      },
      {
        title: "Voting",
        desc: "The actual polling day where votes are cast at designated polling stations.",
        ai: "The core of democracy where every single vote contributes to the national mandate."
      },
      {
        title: "Results",
        desc: "Counting of votes and official declaration of the winning candidates.",
        ai: "The final verdict is processed with full transparency under official supervision."
      }
    ]
  },
  hi: {
    title: "मतदान दिवस गाइड",
    subtitle: "चुनाव चक्र के लिए व्यावहारिक अंतर्दृष्टि और आधिकारिक संसाधन।",
    boothTitle: "अपना मतदान केंद्र खोजें",
    epicQuestion: "क्या आपके पास अपना एपिक (वोटर आईडी) नंबर है?",
    yes: "हाँ, मेरे पास है",
    no: "नहीं, मेरे पास नहीं है",
    aiTip: "🤖 एआई बूथ टिप",
    aiTipYes: "अपने एपिक नंबर का उपयोग करना आपके बूथ को खोजने का सबसे तेज़ और सबसे सटीक तरीका है।",
    aiTipNo: "आप अभी भी अपने नाम और स्थान का उपयोग करके खोज सकते हैं, लेकिन सुनिश्चित करें कि विवरण आपकी आईडी से बिल्कुल मेल खाते हों।",
    eciPromptYes: "त्वरित बूथ लुकअप के लिए आधिकारिक पोर्टल पर एपिक सर्च का उपयोग करें।",
    eciPromptNo: "आधिकारिक साइट पर अपने व्यक्तिगत विवरण और आवासीय स्थान का उपयोग करके खोजें।",
    btnSearch: "ईसीआई पोर्टल पर खोजें ↗",
    checklistTitle: "📝 अपना बूथ खोजने के बाद, इसे नोट कर लें:",
    checkItem1: "बूथ संख्या और नाम",
    checkItem2: "मतदान केंद्र का पता",
    checkItem3: "मतदान का समय (आमतौर पर सुबह 7 बजे से शाम 6 बजे तक)",
    phasesTitle: "📅 चुनाव प्रक्रिया के चरण",
    resultsTitle: "🏆 चुनाव परिणाम जांचें",
    resultsDesc: "मतगणना प्रक्रिया पूरी होने के बाद भारत निर्वाचन आयोग द्वारा आधिकारिक परिणाम प्रकाशित किए जाते हैं।",
    btnResults: "आधिकारिक परिणाम देखें ↗",
    disclaimer: "नोट: परिणाम आधिकारिक तौर पर चुनाव आयोग पोर्टल पर प्रकाशित किए जाते हैं।",
    footerNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित।",
    phases: [
      {
        title: "घोषणा",
        desc: "ईसीआई कार्यक्रम की घोषणा करता है, जिससे आदर्श आचार संहिता लागू होती है।",
        ai: "यह सभी राजनीतिक दलों और उम्मीदवारों के लिए समान अवसर सुनिश्चित करता है।"
      },
      {
        title: "पंजीकरण",
        desc: "पात्र नागरिक मतदाता सूची में शामिल करने या सुधार के लिए आवेदन कर सकते हैं।",
        ai: "अंतिम सूची प्रकाशित होने से पहले यह सुनिश्चित करने का अवसर है कि आपका नाम सही ढंग से सूचीबद्ध है।"
      },
      {
        title: "प्रचार",
        desc: "उम्मीदवार और पार्टियां अपना घोषणापत्र पेश करते हैं और मतदाताओं तक पहुंचते हैं।",
        ai: "मतदाताओं के लिए उम्मीदवार के मंचों और लोकतांत्रिक विकल्पों का मूल्यांकन करने की एक महत्वपूर्ण अवधि।"
      },
      {
        title: "मतदान",
        desc: "वास्तविक मतदान का दिन जब निर्धारित मतदान केंद्रों पर वोट डाले जाते हैं।",
        ai: "लोकतंत्र का मूल जहां हर एक वोट राष्ट्रीय जनादेश में योगदान देता है।"
      },
      {
        title: "परिणाम",
        desc: "मतों की गिनती और जीतने वाले उम्मीदवारों की आधिकारिक घोषणा।",
        ai: "अंतिम फैसला आधिकारिक पर्यवेक्षण के तहत पूरी पारदर्शिता के साथ संसाधित किया जाता है।"
      }
    ]
  }
};

export default function VotingPage() {
  const [lang, setLang] = useState('en');
  const [hasEpic, setHasEpic] = useState(null);

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
      <div className={`fade-in ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* PART 2: Find Your Polling Booth */}
        <div className={styles.boothSearchSection}>
          <h2 className={styles.sectionTitle}>🔍 {t.boothTitle}</h2>
          <div className={styles.searchCard}>
            <p className={styles.searchQuestion}>{t.epicQuestion}</p>
            <div className={styles.searchBtns}>
              <button 
                className={`${styles.searchBtn} ${hasEpic === true ? styles.searchBtnActive : ''}`}
                onClick={() => setHasEpic(true)}
              >
                {t.yes}
              </button>
              <button 
                className={`${styles.searchBtn} ${hasEpic === false ? styles.searchBtnActive : ''}`}
                onClick={() => setHasEpic(false)}
              >
                {t.no}
              </button>
            </div>

            {hasEpic !== null && (
              <div className={styles.searchResult}>
                <div className={styles.aiInsightBox}>
                  <div className={styles.aiLabel}>{t.aiTip}</div>
                  <p>
                    {hasEpic ? t.aiTipYes : t.aiTipNo}
                  </p>
                </div>

                <div className={styles.actionBox}>
                  <p>
                    {hasEpic ? t.eciPromptYes : t.eciPromptNo}
                  </p>
                  <button 
                    className={styles.eciLinkBtn}
                    onClick={() => window.open("https://voters.eci.gov.in/", "_blank")}
                  >
                    {t.btnSearch}
                  </button>
                </div>

                <div className={styles.checklist}>
                  <h5>{t.checklistTitle}</h5>
                  <ul>
                    <li>{t.checkItem1}</li>
                    <li>{t.checkItem2}</li>
                    <li>{t.checkItem3}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PART 3: Election Process Phases */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.phasesTitle}</h2>
          <div className={styles.grid}>
            {t.phases.map((phase, i) => (
              <div key={i} className={styles.card}>
                <h4>{phase.title}</h4>
                <p className={styles.phaseDesc}>{phase.desc}</p>
                <div className={styles.aiContextBox}>
                  <span className={styles.aiContextLabel}>AI Context</span>
                  <p>{phase.ai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 4: Results Feature */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.resultsTitle}</h2>
          <div className={styles.resultsCard}>
            <p>{t.resultsDesc}</p>
            <button 
              className={styles.ctaButton}
              onClick={() => window.open("https://results.eci.gov.in/", "_blank")}
            >
              {t.btnResults}
            </button>
            <p className={styles.disclaimer}>{t.disclaimer}</p>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.finalNote}>{t.footerNote}</p>
        </div>
      </div>
    </div>
  );
}
