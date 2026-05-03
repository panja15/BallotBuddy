// file: components/FormRenderer.js
'use client';

import { useState } from 'react';
import styles from './formRenderer.module.css';

export default function FormRenderer({ schema, formData, errors = {}, onChange }) {
  const [activeHelp, setActiveHelp] = useState(null); // stores the field name currently showing help

  const toggleHelp = (fieldName) => {
    setActiveHelp(activeHelp === fieldName ? null : fieldName);
  };

  const renderField = (field) => {
    const isHelpActive = activeHelp === field.name;
    const hasError = !!errors[field.name];

    return (
      <div key={field.name} className={styles.field}>
        <div className={styles.labelArea}>
          <label className={styles.label}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          {field.aiHelp && (
            <button 
              type="button" 
              className={styles.aiHelpBtn}
              onClick={() => toggleHelp(field.name)}
              title="AI Help"
            >
              ?
            </button>
          )}
        </div>

        {field.type === 'select' ? (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${styles.select} ${hasError ? styles.inputError : ''}`}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            placeholder={`Enter ${field.label}`}
            required={field.required}
          />
        )}

        {hasError && <p className={styles.errorMessage}>{errors[field.name]}</p>}

        {isHelpActive && field.aiHelp && (
          <div className={styles.aiTooltip}>
            <h5>🤖 BallotBuddy Guidance</h5>
            <p>{field.aiHelp.explanation}</p>
            
            <div className={styles.mistakeArea}>
              <strong>Avoid:</strong> {field.aiHelp.commonMistakes}
            </div>
            
            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--accent)' }}>
              <strong>Tip:</strong> {field.aiHelp.tip}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.form}>
      {schema.sections.map(section => (
        <div key={section.id} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div className={styles.fieldGroup}>
            {section.fields.map(field => renderField(field))}
          </div>
        </div>
      ))}
    </div>
  );
}
