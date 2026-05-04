// file: components/ChatWidget.js
'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './chatWidget.module.css';
import { commonTranslations } from '../lib/i18n';

const starterSuggestions = [
  "How do I apply for Form 6?",
  "What is the age eligibility for voting?",
  "How to change my address in voter ID?",
  "Where can I find my polling booth?"
];

export default function ChatWidget() {
  const [lang, setLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('ballotBuddy_lang') || 'en';
    setLang(savedLang);

    setMessages([
      { 
        role: 'bot', 
        answer: savedLang === 'hi' ? 'नमस्ते! मैं बैलेटबडी हूं। आज मैं मतदान प्रक्रिया में आपकी कैसे सहायता कर सकता हूं?' : 'Namaste! I am BallotBuddy. How can I assist you with the voting process today?',
        reasoning: [],
        nextSteps: [],
        source: 'ECI Official Guide'
      }
    ]);

    const handleLangChange = (e) => {
      setLang(e.detail);
    };
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (forcedMsg = null) => {
    const msgToSend = forcedMsg || input;
    if (!msgToSend.trim() || loading) return;

    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ballotBuddy_userData') || '{}') : {};
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', answer: msgToSend }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgToSend, userData }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'bot', ...data }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        answer: 'I encountered an error. Please try again later.',
        reasoning: [],
        nextSteps: [],
        source: 'System'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={`fade-in ${styles.chatWindow}`}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatarBot}>🤖</div>
              <div className={styles.headerText}>
                <span className={styles.botName}>BallotBuddy AI</span>
                <span className={styles.onlineStatus}><span className={styles.dot}></span> Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className={styles.closeBtn}
              aria-label="Close Chat Assistant"
            >
              ✕
            </button>
          </div>
          
          <div className={styles.messages} ref={scrollRef} role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userRow : styles.botRow}>
                {m.role === 'bot' && <div className={styles.msgAvatar} aria-hidden="true">🇮🇳</div>}
                <div className={m.role === 'user' ? styles.userMsg : styles.botMsg}>
                  <p className={styles.mainText}>{m.answer}</p>
                  
                  {m.reasoning?.length > 0 && (
                    <div className={styles.structured}>
                      <div className={styles.structLabel}>Analysis Context</div>
                      <ul className={styles.list}>
                        {m.reasoning.map((r, idx) => <li key={idx}>{r}</li>)}
                      </ul>
                    </div>
                  )}

                  {m.nextSteps?.length > 0 && (
                    <div className={styles.structured}>
                      <div className={styles.structLabel}>Recommended Actions</div>
                      <ul className={styles.list}>
                        {m.nextSteps.map((s, idx) => <li key={idx}>{s}</li>)}
                      </ul>
                    </div>
                  )}

                  {m.role === 'bot' && (
                    <div className={styles.sourceFooter}>
                      <span>Source: {m.source}</span>
                      <span className={styles.time}>Just now</span>
                    </div>
                  )}
                </div>
                {m.role === 'user' && <div className={styles.msgAvatarUser} aria-hidden="true">👤</div>}
              </div>
            ))}
            
            {loading && (
              <div className={styles.botRow}>
                <div className={styles.msgAvatar} aria-hidden="true">🇮🇳</div>
                <div className={styles.botMsg}>
                  <div className={styles.typingIndicator} aria-label="AI is typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.bottomSection}>
            {messages.length === 1 && (
              <div className={styles.suggestionGrid}>
                {starterSuggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)} 
                    className={styles.suggestionBtn}
                    aria-label={`Ask: ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.inputArea}>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask BallotBuddy..."
                className={styles.input}
                aria-label="Chat Input"
              />
              <button 
                onClick={() => handleSend()} 
                className={styles.sendBtn} 
                disabled={loading || !input.trim()}
                aria-label="Send Message"
              >
                {loading ? '...' : '➤'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.toggleBtn}
        aria-label={isOpen ? "Close Chat Assistant" : "Open Chat Assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : (
          <>
            <span className={styles.toggleIcon} aria-hidden="true">💬</span>
            <span className={styles.toggleText}>Ask BallotBuddy</span>
          </>
        )}
      </button>
    </div>
  );
}
