import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');
  const [history, setHistory] = useState([]); // Side H: History State

  const calculateSidh = () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    // सौरभ कुशवाहा जी के लिए विशेष '9: सत्य' लॉजिक
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
    const currentOracle = msgs[val] || "खोज जारी रखें...";
    setOracle(currentOracle);

    // Side H: इतिहास में जोड़ना (अधिकतम 5 नाम)
    const newEntry = { name, val, time: new Date().toLocaleTimeString() };
    setHistory(prev => [newEntry, ...prev].slice(0, 5));
  };

  const shareToGlobal = () => {
    const shareText = `🔱 C-POWER 2.0 🔱\nसिद्धकर्ता: ${input.toUpperCase()}\nअंतिम सत्य: ${result}\nभविष्यवाणी: "${oracle}"\n\nअपनी आवृत्ति यहाँ जानें:\nhttps://c-power-6wta.vercel.app\n\nसिद्धकर्ता: सौरभ कुशवाहा 🚩`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.vision}>SAURABH KUSHWAHA VISION</p>
        
        <input 
          style={styles.input}
          placeholder="नाम यहाँ लिखें..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button style={styles.btn} onClick={calculateSidh}>सिद्ध करें (ORACLE)</button>

        {result && (
          <div style={styles.resContainer}>
            <div style={{...styles.resBox, borderColor: result === 9 ? '#FFD700' : '#FF3131'}}>
              <h2 style={{color: result === 9 ? '#FFD700' : '#FFF'}}>सत्य: {result}</h2>
              <p style={styles.oracleItalic}>"{oracle}"</p>
              <button style={styles.shareBtn} onClick={shareToGlobal}>🚩 WhatsApp पर साझा करें</button>
            </div>
          </div>
        )}

        {/* Side H: History Section */}
        {history.length > 0 && (
          <div style={styles.historySection}>
            <h4 style={styles.historyTitle}>हालिया सिद्धकर्ता (HISTORY)</h4>
            {history.map((item, index) => (
              <div key={index} style={styles.historyItem}>
                <span>{item.name}</span>
                <span style={{color: item.val === 9 ? '#FFD700' : '#FF3131'}}> अंक: {item.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        body { margin: 0; background: #000; font-family: 'Cinzel', serif; overflow-x: hidden; }
        .stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        .twinkling { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/twinkling.png) repeat; z-index: 1; animation: move-twink 200s linear infinite; }
        @keyframes move-twink { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', padding: '20px' },
  card: { zIndex: 10, textAlign: 'center', padding: '30px 15px', border: '1px solid #333', borderRadius: '30px', backgroundColor: 'rgba(0,0,0,0.9)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(10px)' },
  header: { fontSize: '2rem', color: '#FF3131', margin: '0', letterSpacing: '4px' },
  vision: { fontSize: '0.6rem', color: '#666', letterSpacing: '2px', marginBottom: '20px' },
  input: { width: '85%', padding: '12px', borderRadius: '12px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', marginBottom: '15px' },
  btn: { padding: '12px 35px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  resContainer: { marginTop: '20px' },
  resBox: { padding: '15px', border: '1px solid', borderRadius: '20px' },
  oracleItalic: { fontStyle: 'italic', fontSize: '0.9rem', color: '#ddd' },
  shareBtn: { marginTop: '10px', padding: '8px 15px', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' },
  historySection: { marginTop: '30px', borderTop: '1px solid #222', paddingTop: '15px' },
  historyTitle: { fontSize: '0.7rem', color: '#555', letterSpacing: '2px', marginBottom: '10px' },
  historyItem: { fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }
};

export default App;
