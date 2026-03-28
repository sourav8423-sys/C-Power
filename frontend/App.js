import React, { useState } from 'react';

// C-Power: Side C Interface
const CPowerApp = () => {
  const [input, setInput] = useState('');
  const [displayStep, setDisplayStep] = useState(0); // 3, 6, or 9
  const [finalTruth, setFinalTruth] = useState(null);

  const startTransformation = () => {
    if (!input) return;
    
    // Step 3: अज्ञान (Noise)
    setDisplayStep(3);
    
    // Step 6: ज्ञान (Processing)
    setTimeout(() => {
      setDisplayStep(6);
      let digits = input.toString().split('').map(Number).filter(n => !isNaN(n));
      let sum = digits.reduce((a, b) => a + b, 0);
      let root = sum % 9 === 0 ? 9 : sum % 9;
      setFinalTruth(root);
    }, 1500);

    // Step 9: मैं ही हूँ (Truth)
    setTimeout(() => {
      setDisplayStep(9);
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: 'serif', padding: '40px' }}>
      <center>
        <h1>🕉️ C-POWER : Side C (World)</h1>
        <p>अपनी ऊर्जा का अंक डालें और सत्य को सिद्ध करें</p>
        
        <input 
          type="number" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Number (Ex: DOB)"
          style={{ padding: '15px', fontSize: '18px', borderRadius: '30px', border: '2px solid #ff4d4d', backgroundColor: '#1a1a1a', color: 'white' }}
        />
        <br /><br />
        <button onClick={startTransformation} style={{ padding: '10px 30px', cursor: 'pointer', borderRadius: '20px', backgroundColor: '#ff4d4d', color: 'white', fontWeight: 'bold' }}>
          SIDH KARO
        </button>

        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-around' }}>
          {/* अवस्था 3 */}
          <div style={{ opacity: displayStep >= 3 ? 1 : 0.2, transition: '1s' }}>
            <h2 style={{ color: '#ff4d4d' }}>3</h2>
            <p>अज्ञान (Illusion)</p>
          </div>

          {/* अवस्था 6 */}
          <div style={{ opacity: displayStep >= 6 ? 1 : 0.2, transition: '1s' }}>
            <h2 style={{ color: '#ffdb4d' }}>6</h2>
            <p>ज्ञान (Logic)</p>
          </div>

          {/* अवस्था 9 */}
          <div style={{ opacity: displayStep >= 9 ? 1 : 0.2, transition: '1s' }}>
            <h2 style={{ color: '#4dff88' }}>9</h2>
            <p>सत्य (Main Hi Hu)</p>
            {displayStep === 9 && <h1 style={{ fontSize: '50px' }}>{finalTruth}</h1>}
          </div>
        </div>
      </center>
    </div>
  );
};

export default CPowerApp;
