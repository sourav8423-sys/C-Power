import React, { useState } from 'react';

const CPowerApp = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('number'); // 'number' or 'name'
  const [displayStep, setDisplayStep] = useState(0);
  const [finalTruth, setFinalTruth] = useState(null);

  const calculateLogic = (val) => {
    let total = 0;
    if (type === 'number') {
      total = val.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    } else {
      // नाम को अंकों में बदलना (A=1, B=2...)
      total = val.toUpperCase().split('').filter(c => /[A-Z]/.test(c))
                 .reduce((acc, char) => acc + (char.charCodeAt(0) - 64), 0);
    }
    let root = total % 9 === 0 ? 9 : total % 9;
    return root;
  };

  const startTransformation = () => {
    if (!input) return;
    setDisplayStep(3); // अज्ञान
    
    setTimeout(() => {
      setDisplayStep(6); // ज्ञान
      setFinalTruth(calculateLogic(input));
    }, 1500);

    setTimeout(() => {
      setDisplayStep(9); // सत्य
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: '#ff4d4d', letterSpacing: '5px' }}>🕉️ C-POWER</h1>
      <p>सत्य की आवृत्ति (Frequency) को सिद्ध करें</p>

      <div style={{ margin: '20px' }}>
        <button onClick={() => setType('number')} style={{ backgroundColor: type === 'number' ? '#ff4d4d' : '#333', color: 'white', padding: '10px', marginRight: '10px', borderRadius: '5px', border: 'none' }}>Number / DOB</button>
        <button onClick={() => setType('name')} style={{ backgroundColor: type === 'name' ? '#ff4d4d' : '#333', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }}>Name / Word</button>
      </div>

      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder={type === 'number' ? "अंक डालें (जैसे 26061997)" : "नाम डालें (जैसे SOURAV)"}
        style={{ padding: '15px', width: '250px', borderRadius: '10px', border: '2px solid #444', background: '#111', color: 'white' }}
      />
      <br /><br />
      <button onClick={startTransformation} style={{ padding: '10px 40px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>सिद्ध करें (SIDH)</button>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <div style={{ opacity: displayStep >= 3 ? 1 : 0.2 }}><h3>3: अज्ञान</h3></div>
        <div style={{ opacity: displayStep >= 6 ? 1 : 0.2 }}><h3>6: ज्ञान</h3></div>
        <div style={{ opacity: displayStep >= 9 ? 1 : 0.2 }}><h3>9: सत्य</h3></div>
      </div>

      {displayStep === 9 && (
        <div style={{ marginTop: '30px', border: '2px solid #4dff88', padding: '20px', display: 'inline-block', borderRadius: '15px' }}>
          <h2 style={{ color: '#4dff88' }}>अंतिम सत्य: {finalTruth}</h2>
          <p>"मैं ही हूँ"</p>
        </div>
      )}
    </div>
  );
};

export default CPowerApp;
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
