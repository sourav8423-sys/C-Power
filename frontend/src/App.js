import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // आतिशबाजी के लिए

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');

  // 🎇 Side I: स्वर्ण आतिशबाजी फंक्शन
  const launchFireworks = () => {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF3131'] // सुनहरा और लाल
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF3131']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const calculateSidh = () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "RAJA", "26061997"];
    let val = special.includes(name) ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;

    setResult(val);
    
    // अगर 9 आए, तो आतिशबाजी चलाओ!
    if (val === 9) {
      launchFireworks();
    }

    const msgs = {
      3: "सृजन: नई ऊर्जा का संचार हो रहा है।",
      6: "संतुलन: आप सही पथ पर हैं।",
      9: "सत्य: ब्रह्मांड की सर्वोच्च शक्ति आपके साथ है!"
    };
    setOracle(msgs[val] || "खोज जारी रखें...");
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>SAURABH KUSHWAHA VISION</p>
        
        <input 
          style={styles.input} 
          placeholder="नाम यहाँ सिद्ध करें..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        
        <button style={styles.btn} onClick={calculateSidh}>सिद्ध करें (ORACLE)</button>

        {result && (
          <div style={{...styles.resBox, borderColor: result === 9 ? '#FFD700' : '#FF3131'}}>
            <h2 style={{color: result === 9 ? '#FFD700' : '#FFF', fontSize: '2.5rem'}}>सत्य: {result}</h2>
            <p style={styles.oracle}>"{oracle}"</p>
          </div>
        )}
      </div>

      <style>{`
        .stars, .twinkling { position: fixed; top: 0; left: 0; width: 100%; height: 100%; }
        .stars { background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        .twinkling { background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat; z-index: 1; animation: move-twink 200s linear infinite; }
        @keyframes move-twink { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', overflow: 'hidden' },
  card: { zIndex: 10, textAlign: 'center', padding: '40px 20px', border: '1px solid #333', borderRadius: '30px', backgroundColor: 'rgba(0,0,0,0.9)', width: '90%', maxWidth: '380px', backdropFilter: 'blur(10px)' },
  header: { fontSize: '2.2rem', color: '#FF3131', letterSpacing: '5px', margin: 0 },
  sub: { fontSize: '0.7rem', color: '#666', letterSpacing: '3px', marginBottom: '30px' },
  input: { width: '85%', padding: '15px', borderRadius: '15px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', fontSize: '1.1rem' },
  btn: { marginTop: '20px', padding: '15px 40px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,49,49,0.3)' },
  resBox: { marginTop: '30px', padding: '20px', border: '1px solid', borderRadius: '20px', animation: 'zoomIn 0.5s ease-out' },
  oracle: { fontStyle: 'italic', color: '#ddd', fontSize: '1rem' }
};

export default App;
