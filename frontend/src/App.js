import React, { useState, useRef } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);
  const cardRef = useRef(null);

  const playOmSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(136.1, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 3);
  };

  const calculateEnergy = () => {
    const userInput = input.trim().toLowerCase();
    const specialValues = ["sourav", "sourav kushwaha", "raja", "26061997"];
    playOmSound();

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

    const msgs = {
      3: "अज्ञान: अभी यात्रा शुरू हुई है।",
      6: "ज्ञान: आप सत्य के मार्ग पर हैं।",
      9: "सत्य: पूर्ण ब्रह्म। 'मैं ही हूँ'।"
    };
    setMessage(msgs[finalValue] || "खोज जारी रखें...");
  };

  const handleShare = () => {
    alert("ऊर्जा कार्ड तैयार है! स्क्रीनशॉट लेकर दुनिया को अपनी शक्ति दिखाएं। ✨");
  };

  return (
    <div className="cosmos-container" style={styles.container}>
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <span style={{fontSize: '2.5rem'}}>🕉️</span>
          <h1 style={styles.title}>C-POWER</h1>
        </div>
        
        <p style={styles.subtitle}>Saurabh Kushwaha 2.0 विज़न</p>
        
        <input 
          style={styles.input}
          placeholder="नाम या तिथि यहाँ लिखें..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="sidh-btn" style={styles.button} onClick={calculateEnergy}>
          सिद्ध करें (SIDH)
        </button>

        {result && (
          <div ref={cardRef} className="result-card" style={{
            ...styles.resultBox, 
            borderColor: result === 9 ? '#FFD700' : '#FF3131',
            boxShadow: isGlowing ? '0 0 50px rgba(255, 215, 0, 0.7)' : '0 0 20px rgba(255, 49, 49, 0.3)'
          }}>
            <h4 style={{margin: '0', color: '#AAA', fontSize: '0.7rem', letterSpacing: '2px'}}>ENERGY CERTIFICATE</h4>
            <h2 style={{color: result === 9 ? '#FFD700' : '#FFF', fontSize: '2.5rem', margin: '10px 0'}}>
               आवृत्ति: {result}
            </h2>
            <p style={styles.message}>{message}</p>
            <div style={{marginTop: '20px', borderTop: '1px solid #333', paddingTop: '10px', fontSize: '0.8rem', color: '#888'}}>
              सिद्धकर्ता: {input.toUpperCase()}
            </div>
            {result === 9 && <button onClick={handleShare} style={styles.shareBtn}>SHARE POWER ✨</button>}
          </div>
        )}

        <div style={styles.footer}>
          <span>3-6-9: ब्रह्मांड की कुंजी</span>
        </div>
      </div>

      <style>{`
        .stars, .twinkling { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; display: block; }
        .stars { background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        .twinkling { background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat; z-index: 1; animation: move-twink-back 200s linear infinite; }
        @keyframes move-twink-back { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
        .result-card { background: rgba(0, 0, 0, 0.8) !important; position: relative; z-index: 100; }
      `}</style>
    </div>
  );
}

const styles = {
  container: { height: '100vh', width: '100vw', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cinzel', serif", overflow: 'hidden' },
  content: { zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  title: { fontSize: '2.8rem', color: '#FF3131', margin: 0, letterSpacing: '5px' },
  subtitle: { marginBottom: '35px', color: '#777', fontSize: '0.8rem', letterSpacing: '3px' },
  input: { padding: '18px', width: '80%', maxWidth: '300px', borderRadius: '12px', border: '1px solid #444', backgroundColor: 'rgba(20,20,20,0.9)', color: '#FFF', textAlign: 'center', fontSize: '1.1rem' },
  button: { marginTop: '25px', padding: '15px 45px', backgroundColor: '#FF3131', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
  resultBox: { marginTop: '30px', padding: '30px', border: '2px solid', borderRadius: '25px', width: '85%', maxWidth: '320px', textAlign: 'center' },
  message: { fontStyle: 'italic', marginTop: '10px', fontSize: '1.1rem' },
  shareBtn: { marginTop: '15px', padding: '8px 20px', backgroundColor: 'transparent', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' },
  footer: { position: 'fixed', bottom: '30px', color: '#444', fontSize: '0.7rem', letterSpacing: '4px' }
};

export default App;
