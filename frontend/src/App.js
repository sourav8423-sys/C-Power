import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC14P04-PEw4gURFZhYWXT8XGgBw1B219g",
  authDomain: "c-power-db.firebaseapp.com",
  projectId: "c-power-db",
  storageBucket: "c-power-db.firebasestorage.app",
  messagingSenderId: "869590340421",
  appId: "1:869590340421:web:f9b62b67d0b1b00cd5e42c",
  measurementId: "G-8N816X99HB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');
  const [history, setHistory] = useState([]);
  const [themeColor, setThemeColor] = useState('#000'); // डिफ़ॉल्ट काला रंग

  useEffect(() => {
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "INDIA", "BHARAT"];
    let val = special.includes(name) ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;

    setResult(val);

    // 🎨 Side M: रंगों का खेल (Theme Engine)
    const themes = {
      9: { color: '#FF9933', msg: "सत्य: अखंड भारत की दिव्य शक्ति!" },
      3: { color: '#128807', msg: "सृजन: प्रकृति और निर्माण की ऊर्जा!" },
      6: { color: '#000080', msg: "ज्ञान: अनंत ब्रह्मांड का बोध!" }
    };

    const currentTheme = themes[val] || { color: '#333', msg: "अपनी ऊर्जा को संचित करें..." };
    setThemeColor(currentTheme.color);
    setOracle(currentTheme.msg);

    if (val === 9) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#128807'] });
    }

    await addDoc(collection(db, "sidh_records"), { name, val, timestamp: serverTimestamp() });
  };

  return (
    <div style={{...styles.bg, backgroundColor: themeColor}}>
      <div className="stars"></div>
      
      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>MANIFESTATION • SAURABH KUSHWAHA</p>
        
        <input style={styles.input} placeholder="नाम यहाँ सिद्ध करें..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button style={{...styles.btn, boxShadow: `0 0 20px ${themeColor}`}} onClick={calculateSidh}>सिद्ध करें 🚩</button>

        {result && (
          <div style={{...styles.resBox, borderColor: themeColor}}>
            <h2 style={{color: '#fff', fontSize: '3rem', textShadow: `0 0 10px ${themeColor}`}}>{result}</h2>
            <p style={styles.oracle}>"{oracle}"</p>
          </div>
        )}

        <div style={styles.historySection}>
          <p style={{fontSize: '0.6rem', color: '#555'}}>अमर इतिहास</p>
          {history.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <span>{item.name}</span> <span style={{color: themeColor}}>{item.val}</span>
            </div>
          ))}
        </div>
        
        <p style={styles.signature}>DESIGNED BY SAURABH KUSHWAHA</p>
      </div>

      <style>{`.stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent url(https://www.transparenttextures.com/patterns/stardust.png); z-index: 0; opacity: 0.3; transition: 1s; }`}</style>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', padding: '20px', transition: 'background-color 1.5s ease' },
  card: { zIndex: 10, textAlign: 'center', padding: '40px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', backgroundColor: 'rgba(0,0,0,0.85)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  header: { fontSize: '2.5rem', color: '#FF3131', letterSpacing: '5px', margin: 0, textShadow: '0 0 15px rgba(255,49,49,0.5)' },
  sub: { fontSize: '0.6rem', color: '#666', letterSpacing: '2px', marginBottom: '30px' },
  input: { width: '85%', padding: '15px', borderRadius: '15px', border: '1px solid #333', backgroundColor: '#050505', color: '#fff', textAlign: 'center', outline: 'none', transition: '0.3s' },
  btn: { marginTop: '20px', padding: '15px 50px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: '0.5s' },
  resBox: { marginTop: '25px', padding: '20px', border: '2px solid', borderRadius: '30px', animation: 'fadeIn 1s' },
  oracle: { fontStyle: 'italic', fontSize: '0.9rem', color: '#ddd' },
  historySection: { marginTop: '30px', borderTop: '1px solid #222', paddingTop: '15px' },
  historyItem: { fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #111' },
  signature: { marginTop: '35px', fontSize: '0.5rem', color: '#444', letterSpacing: '3px' }
};

export default App;
