import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

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
  const [showAdmin, setShowAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      setShowAdmin(!showAdmin);
      setClickCount(0);
      alert("प्रणाम स्वामी! एडमिन पैनल जाग्रत हो गया है। 🚩");
    }
  };

  const deleteRecord = async (id) => {
    if(window.confirm("क्या आप इस रिकॉर्ड को साम्राज्य से मिटाना चाहते हैं?")) {
      await deleteDoc(doc(db, "sidh_records", id));
    }
  };

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;
    let val = (name === "INDIA" || name === "SAURABH") ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;
    setResult(val);
    setThemeColor(val === 9 ? '#FF9933' : '#111');
    if (val === 9) confetti({ particleCount: 150, spread: 70 });
    await addDoc(collection(db, "sidh_records"), { name, val, timestamp: serverTimestamp() });
  };

  return (
    <div style={{...styles.bg, backgroundColor: themeColor}}>
      <div style={styles.card}>
        <h1 onClick={handleSecretClick} style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>PRIVILEGE EDITION • SAURABH KUSHWAHA</p>
        
        {!showAdmin ? (
          <>
            <input style={styles.input} placeholder="नाम सिद्ध करें..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button style={styles.btn} onClick={calculateSidh}>सिद्ध करें 🚩</button>
            {result && <div style={styles.resBox}><h2>अंक: {result}</h2></div>}
          </>
        ) : (
          <div style={styles.adminBox}>
            <h3 style={{color: '#FFD700'}}>ब्रह्मांडीय नियंत्रण (ADMIN)</h3>
            {history.map(item => (
              <div key={item.id} style={styles.adminItem}>
                <span>{item.name} ({item.val})</span>
                <button onClick={() => deleteRecord(item.id)} style={styles.delBtn}>भस्म ⚔️</button>
              </div>
            ))}
            <button onClick={() => setShowAdmin(false)} style={styles.closeBtn}>वापस जाएँ</button>
          </div>
        )}

        <div style={styles.historySection}>
          <p style={{fontSize: '0.6rem'}}>इतिहास</p>
          {history.slice(0, 5).map(item => (
            <div key={item.id} style={styles.historyItem}>{item.name} - {item.val}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', transition: '1s' },
  card: { textAlign: 'center', padding: '30px', borderRadius: '40px', backgroundColor: 'rgba(0,0,0,0.9)', width: '350px', border: '1px solid #333' },
  header: { fontSize: '2.5rem', color: '#FF3131', cursor: 'pointer', userSelect: 'none' },
  sub: { fontSize: '0.6rem', color: '#666', marginBottom: '20px' },
  input: { width: '80%', padding: '12px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#111', color: '#fff' },
  btn: { marginTop: '15px', padding: '10px 30px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer' },
  resBox: { marginTop: '20px', border: '1px solid #FF9933', borderRadius: '15px' },
  adminBox: { marginTop: '20px', textAlign: 'left', maxHeight: '300px', overflowY: 'auto' },
  adminItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #222', fontSize: '0.8rem' },
  delBtn: { backgroundColor: '#440000', color: '#FF0000', border: '1px solid #FF0000', borderRadius: '5px', cursor: 'pointer', fontSize: '0.6rem' },
  closeBtn: { marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '10px' },
  historySection: { marginTop: '20px', borderTop: '1px solid #222' },
  historyItem: { fontSize: '0.7rem', padding: '5px' }
};

export default App;
