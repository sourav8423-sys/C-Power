import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, getCountFromServer } from "firebase/firestore";

// 🔥 सौरभ कुशवाहा जी की Firebase चाबी
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
  const [totalSidh, setTotalSidh] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🌍 Side K: लाइव काउंटर और इतिहास पढ़ना
  useEffect(() => {
    // इतिहास (History)
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTotalSidh(snapshot.size + 108); // 108 दिव्य संख्या का आशीर्वाद
    });
    return () => unsubscribe();
  }, []);

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;
    setLoading(true);

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "INDIA", "BHARAT"];
    let val = special.includes(name) ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;

    setResult(val);
    if (val === 9) {
      const colors = ['#FF9933', '#FFFFFF', '#128807'];
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors });
    }

    const msgs = { 9: "सत्य: अखंड भारत की शक्ति!", 3: "सृजन: राष्ट्र निर्माण!", 6: "ज्ञान: दिव्य संस्कृति!" };
    setOracle(msgs[val] || "खोज जारी रखें...");

    try {
      await addDoc(collection(db, "sidh_records"), { name, val, timestamp: serverTimestamp() });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      
      {/* 🔱 Side K: Kingdom Counter */}
      <div style={styles.kingdomBar}>
        <span>🚩 साम्राज्य की शक्ति: {totalSidh} सिद्धकर्ता</span>
      </div>

      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>KINGDOM EDITION • SAURABH KUSHWAHA</p>
        
        <input style={styles.input} placeholder="नाम सिद्ध करें..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button style={styles.btn} onClick={calculateSidh} disabled={loading}>
          {loading ? 'सिद्धि जारी है...' : 'सिद्ध करें 🚩'}
        </button>

        {result && (
          <div style={styles.resBox}>
            <h2 style={{color: result === 9 ? '#FF9933' : '#FFF'}}>अंक: {result}</h2>
            <p style={styles.oracle}>"{oracle}"</p>
          </div>
        )}

        <div style={styles.historySection}>
          <p style={styles.historyTitle}>अमर इतिहास (LIVE)</p>
          {history.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <span>{item.name}</span>
              <span style={{color: '#FF9933'}}> {item.val}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000 url(https://www.transparenttextures.com/patterns/stardust.png); z-index: 0; }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', padding: '20px' },
  kingdomBar: { position: 'absolute', top: '20px', backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: '10px 20px', borderRadius: '50px', border: '1px solid #FFD700', fontSize: '0.8rem', color: '#FFD700', zIndex: 20, letterSpacing: '1px' },
  card: { zIndex: 10, textAlign: 'center', padding: '30px 20px', border: '1px solid #333', borderRadius: '30px', backgroundColor: 'rgba(0,0,0,0.95)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(15px)' },
  header: { fontSize: '2.2rem', color: '#FF3131', letterSpacing: '4px', margin: 0 },
  sub: { fontSize: '0.6rem', color: '#666', marginBottom: '25px' },
  input: { width: '85%', padding: '12px', borderRadius: '12px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', outline: 'none' },
  btn: { marginTop: '15px', padding: '12px 40px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  resBox: { marginTop: '20px', padding: '15px', border: '1px solid #333', borderRadius: '20px' },
  oracle: { fontStyle: 'italic', color: '#ccc', fontSize: '0.9rem' },
  historySection: { marginTop: '25px', borderTop: '1px solid #222', paddingTop: '15px' },
  historyTitle: { fontSize: '0.7rem', color: '#444', marginBottom: '10px' },
  historyItem: { fontSize: '0.8rem', padding: '8px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between' }
};

export default App;
