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
