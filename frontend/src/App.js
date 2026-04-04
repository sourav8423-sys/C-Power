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
  const [themeColor, setThemeColor] = useState('#000');
  const [nexusNotify, setNexusNotify] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(docs);
      if(docs.length > 0 && docs[0].val === 9) {
        setNexusNotify(`${docs[0].name} ने अभी-अभी 'सत्य' प्राप्त किया! 🚩`);
        setTimeout(() => setNexusNotify(null), 5000);
      }
    });
    return () => unsubscribe();
  }, []);

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    const themes = {
      9: { color: '#FF9933', msg: "सत्य: अखंड भारत की दिव्य शक्ति!" },
      3: { color: '#128807', msg: "सृजन: निर्माण की अजेय ऊर्जा!" },
      6: { color: '#000080', msg: "ज्ञान: अनंत ब्रह्मांड का प्रकाश!" }
    };

    let val = (name === "INDIA" || name === "SAURABH") ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;
    setResult(val);
    setThemeColor(themes[val]?.color || '#333');
    setOracle(themes[val]?.msg || "खोज जारी रखें...");

    if (val === 9) confetti({ particleCount: 150, spread: 70, colors: ['#FF9933', '#FFF', '#128807'] });
    await addDoc(collection(db, "sidh_records"), { name, val, timestamp: serverTimestamp() });
  };

  return (
    <div style={{...styles.bg, backgroundColor: themeColor}}>
      {nexusNotify && <div style={styles.toast}>{nexusNotify}</div>}
      
      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>NEXUS EDITION • SAURABH KUSHWAHA</p>
        
        <input style={styles.input} placeholder="नाम यहाँ सिद्ध करें..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button style={{...styles.btn, boxShadow: `0 0 20px ${themeColor}`}} onClick={calculateSidh}>सिद्ध करें 🚩</button>

        {result && (
          <div style={{...styles.resBox, borderColor: themeColor}}>
            <h2 style={{color: '#fff', fontSize: '2.5rem'}}>{result}</h2>
            <p style={styles.oracle}>"{oracle}"</p>
            {result === 9 && (
              <button style={styles.nexusBtn} onClick={() => window.open('https://www.youtube.com/@SaurabhKushwaha2.0', '_blank')}>
                साम्राज्य से जुड़ें (YouTube) 🔔
              </button>
            )}
          </div>
        )}

        <div style={styles.historySection}>
          {history.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <span>{item.name}</span> <span style={{color: themeColor}}>{item.val}</span>
            </div>
          ))}
        </div>
        <p style={styles.signature}>A GLOBAL NEXUS BY SAURABH KUSHWAHA</p>
      </div>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', padding: '20px', transition: '1s ease', fontFamily: 'sans-serif' },
  toast: { position: 'fixed', top: '20px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', zIndex: 100, boxShadow: '0 5px 15px rgba(0,0,0,0.3)', animation: 'fadeInDown 0.5s' },
  card: { zIndex: 10, textAlign: 'center', padding: '40px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', backgroundColor: 'rgba(0,0,0,0.85)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(20px)' },
  header: { fontSize: '2.2rem', color: '#FF3131', letterSpacing: '4px', margin: 0 },
  sub: { fontSize: '0.6rem', color: '#666', marginBottom: '25px', letterSpacing: '2px' },
  input: { width: '85%', padding: '15px', borderRadius: '15px', border: '1px solid #333', backgroundColor: '#050505', color: '#fff', textAlign: 'center', outline: 'none' },
  btn: { marginTop: '20px', padding: '15px 50px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  resBox: { marginTop: '25px', padding: '20px', border: '2px solid', borderRadius: '30px' },
  nexusBtn: { marginTop: '10px', backgroundColor: '#FF0000', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem' },
  oracle: { fontStyle: 'italic', fontSize: '0.9rem', margin: '10px 0' },
  historySection: { marginTop: '30px', opacity: 0.7 },
  historyItem: { fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #111' },
  signature: { marginTop: '35px', fontSize: '0.5rem', color: '#444', letterSpacing: '2px' }
};

export default App;
