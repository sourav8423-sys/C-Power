import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');

  const calculateGlobal = () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "RAJA", "26061997"];
    let val;
    if (special.includes(name)) {
      val = 9;
    } else {
      let sum = 0;
      for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
      val = (sum % 9) || 9;
    }

    setResult(val);
    const msgs = {
      3: "सृजन: नई शुरुआत का समय है।",
      6: "ज्ञान: आप सही मार्ग पर हैं।",
      9: "सत्य: ब्रह्मांड आपके साथ है। आप जो चाहेंगे वो सिद्ध होगा।"
    };
    setOracle(msgs[val] || "खोज जारी रखें...");
  };

  // Side G: WhatsApp Sharing Logic
  const shareToGlobal = () => {
    const shareText = `🔱 C-POWER 2.0 🔱\nसिद्धकर्ता: ${input.toUpperCase()}\nअंतिम सत्य: ${result}\nभविष्यवाणी: "${oracle}"\n\nअपनी ब्रह्मांडीय आवृत्ति यहाँ जानें:\nhttps://c-power-6wta.vercel.app\n\nबनाया गया: सौरभ कुशवाहा विज़न 🚩`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div style={styles.card}>
        <div style={styles.header}>🕉️ C-POWER 2.0</div>
        <p style={styles.vision}>SAURABH KUSHWAHA VISION</p>
        
        <input 
          style={styles.input}
          placeholder="अपना नाम यहाँ सिद्ध करें..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button style={styles.btn} onClick={calculateGlobal}>सिद्ध करें (ORACLE)</button>

        {result && (
          <div style={styles.resContainer}>
            <div style={{...styles.resBox, borderColor: result === 9 ? '#FFD700' : '#FF3131'}}>
              <h2 style={{color: result === 9 ? '#FFD700' : '#FFF', margin: '5px 0'}}>सत्य: {result}</h2>
              <p style={styles.oracleItalic}>"{oracle}"</p>
            </div>
            
            <button style={styles.shareBtn} onClick={shareToGlobal}>
              🚩 WhatsApp पर साझा करें
            </button>
          </div>
        )}
      </div>

      <style>{`
        body { margin: 0; background: #000; font-family: 'Cinzel', serif; overflow: hidden; }
        .stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        .twinkling { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat; z-index: 1; animation: move-twink 200s linear infinite; }
        @keyframes move-twink { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative' },
  card: { zIndex: 10, textAlign: 'center', padding: '40px 20px', border: '1px solid #333', borderRadius: '30px', backgroundColor: 'rgba(0,0,0,0.9)', width: '90%', maxWidth: '380px', backdropFilter: 'blur(10px)', boxShadow: '0 0 30px rgba(255,49,49,0.1)' },
  header: { fontSize: '2.2rem', color: '#FF3131', fontWeight: 'bold', letterSpacing: '4px' },
  vision: { fontSize: '0.7rem', color: '#666', letterSpacing: '3px', marginBottom: '30px' },
  input: { width: '85%', padding: '15px', borderRadius: '15px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', fontSize: '1.1rem', outline: 'none' },
  btn: { marginTop: '20px', padding: '15px 40px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,49,49,0.3)' },
  resContainer: { marginTop: '30px', animation: 'fadeIn 1s' },
  resBox: { padding: '20px', border: '1px solid', borderRadius: '20px', backgroundColor: 'rgba(20,20,20,0.5)' },
  oracleItalic: { fontStyle: 'italic', fontSize: '1rem', color: '#ddd', margin: '10px 0' },
  shareBtn: { marginTop: '20px', padding: '12px 25px', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }
};

export default App;
