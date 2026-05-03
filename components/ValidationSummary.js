// file: components/ValidationSummary.js
'use client';

import styles from './validationSummary.module.css';

const translations = {
  en: {
    titleError: "❌ Pre-Submission Checklist",
    titleSuccess: "✅ Ready for Review",
    fieldStatus: "Field Status",
    requiredDocs: "Required Documents",
    missing: "is missing",
    allGood: "All mandatory fields completed",
    docNote: "Ensure these are scanned and ready in PDF/JPG format (under 2MB).",
    docMapping: {
      "form-6": ["Address Proof (Aadhaar/Bill)", "Age Proof (Birth Cert/Aadhaar)", "Passport Photo"],
      "form-8": ["EPIC Card Copy", "Proof of Correction (e.g. Birth Cert for Age)"],
      "form-7": ["Evidence for Objection (e.g. Death Certificate)"],
      "form-8a": ["New Residential Proof"]
    }
  },
  hi: {
    titleError: "❌ पूर्व-प्रस्तुति चेकलिस्ट",
    titleSuccess: "✅ समीक्षा के लिए तैयार",
    fieldStatus: "क्षेत्र स्थिति",
    requiredDocs: "आवश्यक दस्तावेज़",
    missing: "अनुपस्थित है",
    allGood: "सभी अनिवार्य क्षेत्र पूरे हो गए हैं",
    docNote: "सुनिश्चित करें कि ये पीडीएफ/जेपीजी प्रारूप (2 एमबी से कम) में स्कैन और तैयार हैं।",
    docMapping: {
      "form-6": ["पता प्रमाण (आधार/बिल)", "आयु प्रमाण (जन्म प्रमाण पत्र/आधार)", "पासपोर्ट फोटो"],
      "form-8": ["एपिक कार्ड की प्रति", "सुधार का प्रमाण (जैसे आयु के लिए जन्म प्रमाण पत्र)"],
      "form-7": ["आपत्ति के लिए साक्ष्य (जैसे मृत्यु प्रमाण पत्र)"],
      "form-8a": ["नया आवासीय प्रमाण"]
    }
  }
};

export default function ValidationSummary({ schema, formData, errors, lang = 'en' }) {
  const t = translations[lang];
  
  const missingFields = schema.sections.flatMap(s => 
    s.fields.filter(f => f.required && !formData[f.name])
  );

  const getRequiredDocs = () => {
    return t.docMapping[schema.id] || [];
  };

  const hasMajorErrors = Object.keys(errors).length > 0 || missingFields.length > 0;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {hasMajorErrors ? t.titleError : t.titleSuccess}
      </h3>

      <div className={styles.grid}>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>{t.fieldStatus}</span>
          <ul className={styles.list}>
            {missingFields.map(f => (
              <li key={f.name} className={`${styles.item} ${styles.error}`}>
                <span className={styles.statusIcon}>❗</span>
                {f.label} {t.missing}
              </li>
            ))}
            {Object.keys(errors).map(key => (
              <li key={key} className={`${styles.item} ${styles.warning}`}>
                <span className={styles.statusIcon}>⚠️</span>
                {errors[key]}
              </li>
            ))}
            {missingFields.length === 0 && Object.keys(errors).length === 0 && (
              <li className={`${styles.item} ${styles.success}`}>
                <span className={styles.statusIcon}>✓</span>
                {t.allGood}
              </li>
            )}
          </ul>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>{t.requiredDocs}</span>
          <div className={styles.docsList}>
            {getRequiredDocs().map((doc, i) => (
              <div key={i} className={styles.docBadge}>
                📄 {doc}
              </div>
            ))}
          </div>
          <p className={styles.docNote}>
            {t.docNote}
          </p>
        </div>
      </div>
    </div>
  );
}
