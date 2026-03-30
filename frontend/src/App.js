import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');

  const calculateSidh = () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    // सौरभ कुशवाहा जी के लिए विशेष '9: सत्य' फिक्स
    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "RAJA", "26061997"];
    
    let val;
    if (special.includes(name)) {
      val = 9;
    } else {
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
      }
      val = (sum % 9) || 9;
    }

    setResult(val);

    // Side F: भविष्यवाणियाँ
    const msgs = {
      3: "सृजन: नई शुरुआत का समय है।",
      6: "ज्ञान: आप सही मार्ग पर हैं।",
      9: "सत्य: ब्रह्मांड आपके साथ है। आप जो चाहेंगे वो सिद्ध होगा।"
    };
    setOracle(msgs[val] || "खोज जारी रखें...");
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div style={styles.card}>
        <h1 style={{color: '#FF3131', letterSpacing: '5px'}}>C-POWER 2.0</h1>
        <p style={{color: '#888'}}>सौरभ कुशवाहा विज़न</p>
        
        <input 
          style={styles.input}
          placeholder="नाम यहाँ लिखें..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button style={styles.btn} onClick={calculateSidh}>सिद्ध करें (ORACLE)</button>

        {result && (
          <div style={styles.res}>
            <h2 style={{color: val === 9 ? '#FFD700' : '#FFF'}}>सत्य: {result}</h2>
            <p style={{fontStyle: 'italic'}}>"{oracle}"</p>
            <p style={{fontSize: '0.7rem', marginTop: '10px'}}>सिद्धकर्ता: {name}</p>
          </div>
        )}
      </div>

      <style>{`
        body { margin: 0; background: #000; font-family: sans-serif; }
        .stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                 background: url(https://www.transparenttextures.com/patterns/stardust.png) repeat; 
                 opacity: 0.5; z-index: 0; }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#fff' },
  card: { zIndex: 1, textAlign: 'center', padding: '30px', border: '1px solid #333', borderRadius: '20px', backgroundColor: 'rgba(0,0,0,0.8)', width: '85%', maxWidth: '350px' },
  input: { width: '90%', padding: '12px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', marginBottom: '20px' },
  btn: { padding: '12px 30px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' },
  res: { marginTop: '25px', borderTop: '1px solid #222', paddingTop: '20px' }
};

export default App;
