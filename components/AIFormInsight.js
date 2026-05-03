// file: components/AIFormInsight.js
'use client';

import styles from './aiFormInsight.module.css';

const INSIGHTS = {
  en: {
    "form-6": {
      purpose: "Form 6 is for fresh inclusion of name in the electoral roll. It is mandatory for any citizen who has turned 18 or has moved permanently to a new constituency.",
      warning: "Ensure your age is exactly 18 or above on the qualifying date (Jan 1, Apr 1, Jul 1, or Oct 1). Incorrect birth years are the #1 cause of rejection.",
      nextSteps: ["Verify Age Proof", "Verify Address Proof", "Submit via VSP Portal"]
    },
    "form-7": {
      purpose: "Form 7 is for objecting to a name inclusion or requesting a deletion. It is used when a voter has died, moved away, or is ineligible.",
      warning: "Objecting without valid proof or for personal grievances can be legally penalized. Use only for factual inconsistencies.",
      nextSteps: ["Provide Death Certificate (if applicable)", "Confirm shifting status", "Attend BLO hearing"]
    },
    "form-8": {
      purpose: "Form 8 is for correction of existing particulars. Use this if your name, photo, or age is misspelt or incorrect in the roll.",
      warning: "One form should ideally be used for one major correction. Multiple corrections might require separate justifications.",
      nextSteps: ["Keep correct document ready", "Check spelling on proof", "Update via Voter Helpline"]
    },
    "form-8a": {
      purpose: "Form 8A is specifically for shifting residence within the same assembly constituency. Your EPIC number remains the same.",
      warning: "Do not use this if you have moved to a different city or district. Use Form 6 for inter-constituency shifting.",
      nextSteps: ["Verify new address proof", "Locate new polling booth", "Update residential details"]
    },
    labels: {
      aiTitle: "🤖 BallotBuddy AI Insights",
      purpose: "Purpose & Validity",
      risk: "⚠️ High Risk Alert",
      next: "Actionable Next Steps",
      trust: "Based on official guidelines from the Election Commission of India"
    }
  },
  hi: {
    "form-6": {
      purpose: "फॉर्म 6 मतदाता सूची में नाम को नए सिरे से शामिल करने के लिए है। यह किसी भी नागरिक के लिए अनिवार्य है जो 18 वर्ष का हो गया है या स्थायी रूप से नए निर्वाचन क्षेत्र में चला गया है।",
      warning: "सुनिश्चित करें कि आपकी आयु अर्हक तिथि (1 जनवरी, 1 अप्रैल, 1 जुलाई या 1 अक्टूबर) पर ठीक 18 या उससे अधिक है। गलत जन्म वर्ष अस्वीकृति का #1 कारण हैं।",
      nextSteps: ["आयु प्रमाण सत्यापित करें", "पता प्रमाण सत्यापित करें", "वीएसपी पोर्टल के माध्यम से जमा करें"]
    },
    "form-7": {
      purpose: "फॉर्म 7 नाम शामिल करने पर आपत्ति करने या हटाने का अनुरोध करने के लिए है। इसका उपयोग तब किया जाता है जब मतदाता की मृत्यु हो गई हो, वह चला गया हो, या अपात्र हो।",
      warning: "वैध प्रमाण के बिना या व्यक्तिगत शिकायतों के लिए आपत्ति करना कानूनी रूप से दंडनीय हो सकता है। केवल तथ्यात्मक विसंगतियों के लिए उपयोग करें।",
      nextSteps: ["मृत्यु प्रमाण पत्र प्रदान करें (यदि लागू हो)", "स्थानांतरण स्थिति की पुष्टि करें", "बीएलओ सुनवाई में भाग लें"]
    },
    "form-8": {
      purpose: "फॉर्म 8 मौजूदा विवरणों के सुधार के लिए है। इसका उपयोग करें यदि आपका नाम, फोटो या आयु गलत तरीके से लिखी गई है या सूची में गलत है।",
      warning: "आदर्श रूप से एक प्रमुख सुधार के लिए एक फॉर्म का उपयोग किया जाना चाहिए। कई सुधारों के लिए अलग-अलग औचित्य की आवश्यकता हो सकती।",
      nextSteps: ["सही दस्तावेज तैयार रखें", "प्रमाण पर वर्तनी जांचें", "वोटर हेल्पलाइन के माध्यम से अपडेट करें"]
    },
    "form-8a": {
      purpose: "फॉर्म 8A विशेष रूप से एक ही विधानसभा क्षेत्र के भीतर निवास स्थान बदलने के लिए है। आपका एपिक नंबर वही रहता है।",
      warning: "यदि आप किसी दूसरे शहर या जिले में चले गए हैं तो इसका उपयोग न करें। अंतर-निर्वाचन क्षेत्र स्थानांतरण के लिए फॉर्म 6 का उपयोग करें।",
      nextSteps: ["नए पते का प्रमाण सत्यापित करें", "नया मतदान केंद्र खोजें", "आवासीय विवरण अपडेट करें"]
    },
    labels: {
      aiTitle: "🤖 बैलेटबडी एआई अंतर्दृष्टि",
      purpose: "उद्देश्य और वैधता",
      risk: "⚠️ उच्च जोखिम चेतावनी",
      next: "कार्रवाई योग्य अगले कदम",
      trust: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित"
    }
  }
};

export default function AIFormInsight({ formId, lang = 'en' }) {
  const t = INSIGHTS[lang];
  const insight = t[formId];

  if (!insight) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t.labels.aiTitle}</h3>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionTitle}>{t.labels.purpose}</span>
        <p className={styles.text}>{insight.purpose}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.warningBox}>
          <span className={styles.sectionTitleRisk}>{t.labels.risk}</span>
          <p className={styles.warningText}>{insight.warning}</p>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionTitle}>{t.labels.next}</span>
        <ul className={styles.nextSteps}>
          {insight.nextSteps.map((step, i) => (
            <li key={i} className={styles.stepItem}>{step}</li>
          ))}
        </ul>
      </div>

      <span className={styles.trustLabel}>{t.labels.trust}</span>
    </div>
  );
}
