import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);

  // ॐ ध्वनि का फंक्शन
  const playOmSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(136.1, audioContext.currentTime); // 136.1 Hz = Om Frequency
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 3);
  };

  const calculateEnergy = () => {
    const userInput = input.trim().toLowerCase();
    const specialValues = ["sourav", "sourav kushwaha", "raja", "26061997"];

    playOmSound(); // बटन दबाते ही ॐ की गूँज

    if (specialValues.includes(userInput)) {
      setResult(9);
      setMessage("दिव्य सत्य: आप ही '9' हैं। ब्रह्मांड की पूर्णता।");
      setIsGlowing(true);
      return;
    }

    let sum = 0;
    for (let char of userInput) {
      if (!isNaN(char)) sum += parseInt(char);
      else sum += char.charCodeAt(0);
    }

    const finalValue = (sum % 9) || 9;
    setResult(finalValue);
    setIsGlowing(finalValue === 9);

    if (finalValue === 3) setMessage("अज्ञान: अभी यात्रा शुरू हुई है।");
    else if (finalValue === 6) setMessage("ज्ञान: आप सत्य के मार्ग पर हैं।");
    else if (finalValue === 9) setMessage("सत्य: पूर्ण ब्रह्म। 'मैं ही हूँ'।");
    else setMessage("खोज जारी रखें...");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{fontSize: '2rem'}}>🕉️</span>
        <h1 style={styles.title}>C-POWER</h1>
      </div>
      
      <p style={styles.subtitle}>सत्य की आवृत्ति (Frequency) को सिद्ध करें</p>
      
      <input 
        style={styles.input}
        placeholder="नाम या जन्मतिथि डालें..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button style={styles.button} onClick={calculateEnergy}>सिद्ध करें (SIDH)</button>

      {result && (
        <div style={{
          ...styles.resultBox, 
          borderColor: result === 9 ? '#FFD700' : '#4CAF50',
          boxShadow: isGlowing ? '0 0 30px #FFD700' : 'none'
        }}>
          <h2 style={{color: result === 9 ? '#FFD700' : '#FFF', fontSize: '2rem'}}>अंतिम सत्य: {result}</h2>
          <p style={styles.message}>"{message}"</p>
          {result === 9 && <p style={{color: '#FFD700', marginTop: '10px'}}>✨ ब्रह्मांडीय ऊर्जा सक्रिय ✨</p>}
        </div>
      )}

      <div style={styles.footer}>
        <span>3: अज्ञान</span>
        <span>6: ज्ञान</span>
        <span>9: सत्य</span>
      </div>
    </div>
  );
}

const styles = {
  container: { height: '100vh', backgroundColor: '#000', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '20px', textAlign: 'center' },
  header: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  title: { fontSize: '2.5rem', color: '#FF3131', margin: 0, letterSpacing: '3px' },
  subtitle: { marginBottom: '30px', color: '#CCC', fontSize: '1rem' },
  input: { padding: '15px', width: '90%', maxWidth: '300px', borderRadius: '12px', border: '1px solid #444', backgroundColor: '#1A1A1A', color: '#FFF', fontSize: '1.1rem', outline: 'none' },
  button: { marginTop: '25px', padding: '15px 40px', backgroundColor: '#FF3131', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', transition: '0.3s' },
  resultBox: { marginTop: '40px', padding: '30px', border: '2px solid', borderRadius: '20px', width: '90%', maxWidth: '300px', backgroundColor: 'rgba(255,255,255,0.03)', transition: 'all 0.5s ease' },
  message: { fontStyle: 'italic', marginTop: '15px', fontSize: '1.1rem', lineHeight: '1.5' },
  footer: { position: 'fixed', bottom: '40px', display: 'flex', gap: '20px', color: '#666', fontSize: '0.9rem' }
};

export default App;
