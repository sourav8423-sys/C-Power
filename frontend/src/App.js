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
  const [totalSidh, setTotalSidh] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTotalSidh(snapshot.size + 108); 
    });
    return () => unsubscribe();
  }, []);

  const shareResult = () => {
    const text = `मैंने C-POWER 2.0 पर अपनी सिद्धि प्राप्त की! मेरा अंक ${result} है। आप भी अपनी आवृत्ति चेक करें: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "INDIA", "BHARAT"];
    let val = special.includes(name) ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;

    setResult(val);
    if (val === 9) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#128807'] });
    }

    const msgs = { 9: "सत्य: अखंड भारत की शक्ति!", 3: "सृजन: राष्ट्र निर्माण!", 6: "ज्ञान: दिव्य संस्कृति!" };
    setOracle(msgs[val] || "अपनी ऊर्जा को संचित करें...");

    await addDoc(collection(db, "sidh_records"), { name, val, timestamp: serverTimestamp() });
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div style={styles.kingdomBar}>🚩 साम्राज्य की शक्ति: {totalSidh}</div>

      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>THE FINAL LEGACY • SAURABH KUSHWAHA</p>
        
        <input style={styles.input} placeholder="नाम सिद्ध करें..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button style={styles.btn} onClick={calculateSidh}>सिद्ध करें 🚩</button>

        {result && (
          <div style={styles.resBox}>
            <h2 style={{color: '#FFD700', fontSize: '2.5rem'}}>{result}</h2>
            <p style={styles.oracle}>"{oracle}"</p>
            <button style={styles.shareBtn} onClick={shareResult}>WhatsApp पर साझा करें 📲</button>
          </div>
        )}

        <div style={styles.historySection}>
          {history.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <span>{item.name}</span> <span style={{color: '#FFD700'}}>{item.val}</span>
            </div>
          ))}
        </div>
        
        {/* 🔱 अमर हस्ताक्षर */}
        <p style={styles.signature}>A Digital Legacy by Saurabh Kushwaha</p>
      </div>
      <style>{`.stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000 url(https://www.transparenttextures.com/patterns/stardust.png); z-index: 0; }`}</style>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', padding: '20px' },
  kingdomBar: { position: 'absolute', top: '20px', border: '1px solid #FFD700', padding: '10px 20px', borderRadius: '50px', color: '#FFD700', zIndex: 10, fontSize: '0.8rem' },
  card: { zIndex: 10, textAlign: 'center', padding: '30px', border: '1px solid #333', borderRadius: '40px', backgroundColor: 'rgba(0,0,0,0.95)', width: '100%', maxWidth: '380px', boxShadow: '0 0 50px rgba(255,49,49,0.2)' },
  header: { fontSize: '2.5rem', color: '#FF3131', letterSpacing: '5px', marginBottom: '5px' },
  sub: { fontSize: '0.6rem', color: '#666', letterSpacing: '3px', marginBottom: '30px' },
  input: { width: '85%', padding: '15px', borderRadius: '15px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center', outline: 'none', fontSize: '1rem' },
  btn: { marginTop: '20px', padding: '15px 45px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  resBox: { marginTop: '20px', padding: '20px', border: '1px solid #FFD700', borderRadius: '25px', backgroundColor: 'rgba(255,215,0,0.05)' },
  oracle: { fontStyle: 'italic', marginBottom: '15px' },
  shareBtn: { backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' },
  historySection: { marginTop: '25px', opacity: 0.6 },
  historyItem: { fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', padding: '5px 0' },
  signature: { marginTop: '30px', fontSize: '0.6rem', color: '#FFD700', letterSpacing: '2px', textTransform: 'uppercase' }
};

export default App;
