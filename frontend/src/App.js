import React, { useState } from 'react';
import './App.css'; // सुनिश्चित करें कि CSS फाइल मौजूद है

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const calculateEnergy = () => {
    // सौरव जी के लिए विशेष Side D लॉजिक
    const specialNames = ["SOURAV", "SOURAV KUSHWAHA", "RAJA"];
    const upperInput = input.toUpperCase().trim();

    if (specialNames.includes(upperInput) || input === "26061997") {
      setResult(9);
      setMessage("दिव्य सत्य: आप ही '9' हैं। ब्रह्मांड की पूर्णता।");
      return;
    }

    // साधारण 3-6-9 लॉजिक
    let sum = 0;
    for (let char of input) {
      if (!isNaN(char)) sum += parseInt(char);
      else sum += char.charCodeAt(0);
    }

    const finalValue = (sum % 9) || 9;
    setResult(finalValue);

    if (finalValue === 3) setMessage("अज्ञान: अभी यात्रा शुरू हुई है।");
    else if (finalValue === 6) setMessage("ज्ञान: आप सत्य के मार्ग पर हैं।");
    else if (finalValue === 9) setMessage("सत्य: पूर्ण ब्रह्म। 'मैं ही हूँ'।");
    else setMessage("खोज जारी रखें...");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🕉️ C-POWER 3-6-9</h1>
      <p style={styles.subtitle}>अपनी आवृत्ति (Frequency) को सिद्ध करें</p>
      
      <input 
        style={styles.input}
        placeholder="नाम या जन्मतिथि डालें..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button style={styles.button} onClick={calculateEnergy}>सिद्ध करें (SIDH)</button>

      {result && (
        <div style={{...styles.resultBox, borderColor: result === 9 ? '#FFD700' : '#4CAF50'}}>
          <h2 style={{color: result === 9 ? '#FFD700' : '#FFF'}}>अंतिम सत्य: {result}</h2>
          <p style={styles.message}>"{message}"</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { height: '100vh', backgroundColor: '#000', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' },
  title: { fontSize: '3rem', color: '#FF3131', textShadow: '0 0 10px rgba(255,49,49,0.5)' },
  subtitle: { marginBottom: '20px', letterSpacing: '2px' },
  input: { padding: '15px', width: '280px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#111', color: '#FFF', textAlign: 'center', fontSize: '1.2rem' },
  button: { marginTop: '20px', padding: '12px 30px', backgroundColor: '#FF3131', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' },
  resultBox: { marginTop: '40px', padding: '20px', border: '2px solid', borderRadius: '15px', textAlign: 'center', width: '300px', backgroundColor: 'rgba(255,255,255,0.05)' },
  message: { fontStyle: 'italic', marginTop: '10px' }
};

export default App;
