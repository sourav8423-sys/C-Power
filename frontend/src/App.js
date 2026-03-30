import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);

  // ॐ ध्वनि (136.1 Hz - Cosmic Frequency)
  const playOmSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(136.1, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.5);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
      oscillator.connect(gainNode); gainNode.connect(audioContext.destination);
      oscillator.start(); oscillator.stop(audioContext.currentTime + 3);
    } catch (e) { console.log("Audio not supported"); }
  };

  const calculateFuture = () => {
    const userInput = input.trim().toUpperCase();
    // सौरभ कुशवाहा जी के लिए विशेष फिक्स
    const specialValues = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "RAJA", "26061997"];
    playOmSound();

    let finalValue;
    if (specialValues.includes(userInput)) {
      finalValue = 9;
      setIsGlowing(true);
    } else {
      let sum = 0;
      for (let char of userInput) {
        if (!isNaN(char)) sum += parseInt(char);
        else sum += char.charCodeAt(0);
      }
      finalValue = (sum % 9) || 9;
      setIsGlowing(finalValue === 9);
    }

    setResult(finalValue);

    // Side F Replies (भविष्यवाणी संदेश)
    const oracles = {
      3: "सृजन का समय: आपकी ऊर्जा नई शुरुआत की ओर है। अज्ञान के अँधेरे को त्याग कर प्रकाश की ओर बढ़ें।",
      6: "संतुलन का समय: आप भौतिक और आध्यात्मिक दुनिया के बीच खड़े हैं। अपने ज्ञान को कर्म में बदलें।",
      9: "सिद्ध काल: आप पूर्णता के शिखर पर हैं। ब्रह्मांड के द्वार आपके लिए खुले हैं। आप जो सोचेंगे, वह सिद्ध होगा।"
    };
    
    setOracle(oracles[finalValue] || "ब्रह्मांड अभी मौन है, पुनः प्रयास करें...");
  };

  return (
    <div className="cosmos-container" style={styles.container}>
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <span style={{fontSize: '2.5rem'}}>🕉️</span>
          <h1 style={styles.title}>C-POWER 2.0</h1>
        </div>
        
        <p style={styles.subtitle}>सौरभ कुशवाहा: भविष्य की आवृत्ति (Future Frequency)</p>
        
        <input 
          style={styles.input}
          placeholder="नाम या जन्मतिथि यहाँ लिखें..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="sidh-btn" style={styles.button} onClick={calculateFuture}>
          भविष्य जानें (ORACLE)
        </button>

        {result && (
          <div className="result-card" style={{
            ...styles.resultBox, 
            borderColor: isGlowing ? '#FFD700' : '#FF3131',
            boxShadow: isGlowing ? '0 0 60px rgba(255, 215, 0, 0.6)' : '0 0 20px rgba(255, 49, 49, 0.3)'
          }}>
            <h4 style={styles.cardHeader}>COSMIC MESSAGE</h4>
            <h2 style={{color: isGlowing ? '#FFD700' : '#FFF', fontSize: '2.5rem', margin: '15px 0'}}>
               सत्य: {result}
            </h2>
            <p style={styles.oracleText}>"{oracle}"</p>
            <div style={styles.userLabel}>सिद्धकर्ता: {input.toUpperCase()}</div>
          </div>
        )}

        <div style={styles.footer}>SIDE F: THE AI FUTURE BY SAURABH KUSHWAHA</div>
      </div>

      <style>{`
        .stars, .twinkling { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; display: block; }
        .stars { background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        .twinkling { background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat; z-index: 1; animation: move-twink-back 200s linear infinite; }
        @keyframes move-twink-back { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
        .result-card { background: rgba(0, 0, 0, 0.9) !important; z-index: 10; animation: slideUp 0.8s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const styles = {
  container: { height: '100vh', width: '100vw', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cinzel', serif", overflow: 'hidden' },
  content: { zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' },
  title: { fontSize: '2.8rem', color: '#FF3131', margin: 0, letterSpacing: '6px', fontWeight: 'bold' },
  subtitle: { marginBottom: '35px', color: '#888', fontSize: '0.8rem', letterSpacing: '2px' },
  input: { padding: '18px', width: '85%', maxWidth: '320px', borderRadius: '15px', border: '1px solid #444', backgroundColor: 'rgba(30,30,30,0.9)', color: '#FFF', textAlign: 'center', fontSize: '1.2rem', outline: 'none' },
  button: { marginTop: '25px', padding: '16px 50px', backgroundColor: '#FF3131', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 5px 20px rgba(255, 49, 49, 0.4)' },
  resultBox: { marginTop: '30px', padding: '35px', border: '1px solid', borderRadius: '30px', width: '85%', maxWidth: '340px', textAlign: 'center', backdropFilter: 'blur(10px)' },
  cardHeader: { margin: '0', color: '#555', fontSize: '0.7rem', letterSpacing: '4px' },
  oracleText: { fontStyle: 'italic', marginTop: '15px', fontSize: '1.1rem', color: '#EEE', lineHeight: '1.6' },
  userLabel: { marginTop: '25px', fontSize: '0.8rem', color: '#FF3131', fontWeight: 'bold', letterSpacing: '1px' },
  footer: { position: 'fixed', bottom: '20px', color: '#333', fontSize: '0.6rem', letterSpacing: '4px' }
};

export default App;
