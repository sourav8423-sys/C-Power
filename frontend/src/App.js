import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);

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
      3: "अज्ञान: अभी यात्रा शुरू हुई है। स्वयं को खोजें।",
      6: "ज्ञान: आप सत्य के मार्ग पर हैं। प्रकाश निकट है।",
      9: "सत्य: पूर्ण ब्रह्म। 'मैं ही हूँ' - अहम ब्रह्मास्मि।"
    };
    setMessage(msgs[finalValue] || "खोज जारी रखें...");
  };

  return (
    <div className="cosmos-container" style={styles.container}>
      {/* Side E: Stars Animation Overlay */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <span style={{fontSize: '2.5rem'}}>🕉️</span>
          <h1 style={styles.title}>C-POWER</h1>
        </div>
        
        <p style={styles.subtitle}>अपनी ब्रह्मांडीय आवृत्ति को सिद्ध करें</p>
        
        <input 
          style={styles.input}
          placeholder="नाम या तिथि (जैसे 26061997)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="sidh-btn" style={styles.button} onClick={calculateEnergy}>
          सिद्ध करें (SIDH)
        </button>

        {result && (
          <div className="result-card" style={{
            ...styles.resultBox, 
            borderColor: result === 9 ? '#FFD700' : '#FF3131',
            boxShadow: isGlowing ? '0 0 40px rgba(255, 215, 0, 0.6)' : '0 0 15px rgba(255, 49, 49, 0.2)'
          }}>
            <h2 style={{color: result === 9 ? '#FFD700' : '#FFF', fontSize: '2.2rem', margin: '0'}}>
               सत्य: {result}
            </h2>
            <p style={styles.message}>{message}</p>
            {result === 9 && <div className="divine-tag">✨ ब्रह्मांडीय ऊर्जा सक्रिय ✨</div>}
          </div>
        )}

        <div style={styles.footer}>
          <span>3: अज्ञान</span> | <span>6: ज्ञान</span> | <span>9: सत्य</span>
        </div>
      </div>

      <style>{`
        .cosmos-container { position: relative; overflow: hidden; }
        .stars, .twinkling { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; display: block; }
        .stars { background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat top center; z-index: 0; }
        .twinkling { background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat top center; z-index: 1; animation: move-twink-back 200s linear infinite; }
        @keyframes move-twink-back { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
        .sidh-btn:active { transform: scale(0.95); opacity: 0.8; }
        .divine-tag { color: #FFD700; margin-top: 15px; font-weight: bold; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

const styles = {
  container: { height: '100vh', width: '100vw', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cinzel', serif", textAlign: 'center' },
  content: { zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' },
  title: { fontSize: '2.8rem', color: '#FF3131', margin: 0, letterSpacing: '5px', fontWeight: '900' },
  subtitle: { marginBottom: '35px', color: '#AAA', fontSize: '0.9rem', letterSpacing: '2px' },
  input: { padding: '18px', width: '85%', maxWidth: '320px', borderRadius: '15px', border: '1px solid #333', backgroundColor: 'rgba(26, 26, 26, 0.8)', color: '#FFF', fontSize: '1.1rem', textAlign: 'center', backdropFilter: 'blur(5px)' },
  button: { marginTop: '30px', padding: '15px 45px', backgroundColor: '#FF3131', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(255, 49, 49, 0.4)', transition: '0.3s' },
  resultBox: { marginTop: '40px', padding: '35px', border: '1px solid', borderRadius: '25px', width: '85%', maxWidth: '320px', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', transition: 'all 0.8s ease' },
  message: { fontStyle: 'italic', marginTop: '20px', fontSize: '1.1rem', color: '#EEE' },
  footer: { position: 'fixed', bottom: '30px', color: '#555', fontSize: '0.8rem', letterSpacing: '3px' }
};

export default App;
