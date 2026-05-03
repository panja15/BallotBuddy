// file: components/ChatBot.js
'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am BallotBuddy. How can I help you with the election process today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'bot', text: data.response || 'Sorry, I am having trouble connecting.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error: Could not reach the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span>BallotBuddy AI</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
          </div>
          <div style={styles.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === 'user' ? styles.userMsg : styles.botMsg}>
                {m.text}
              </div>
            ))}
            {loading && <div style={styles.botMsg}>...</div>}
          </div>
          <div style={styles.inputArea}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendBtn}>➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleBtn}>
        {isOpen ? '✕' : '💬 Help'}
      </button>
    </div>
  );
}

const styles = {
  wrapper: { position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 },
  toggleBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '30px',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  chatWindow: {
    width: '350px',
    height: '450px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  header: {
    padding: '1rem',
    background: 'var(--primary)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '700',
  },
  closeBtn: { background: 'none', border: 'none', color: 'white', cursor: 'pointer' },
  messages: { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  userMsg: { alignSelf: 'flex-end', background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px 12px 0 12px', fontSize: '0.9rem', maxWidth: '80%' },
  botMsg: { alignSelf: 'flex-start', background: 'var(--border)', color: 'var(--foreground)', padding: '0.5rem 1rem', borderRadius: '12px 12px 12px 0', fontSize: '0.9rem', maxWidth: '80%' },
  inputArea: { padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' },
  input: { flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)' },
  sendBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--primary)' }
};
