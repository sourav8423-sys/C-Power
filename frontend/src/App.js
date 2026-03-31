import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "firebase/firestore";

// 🔥 सौरभ कुशवाहा जी की असली Firebase चाबी
const firebaseConfig = {
  apiKey: "AIzaSyC14P04-PEw4gURFZhYWXT8XGgBw1B219g",
  authDomain: "c-power-db.firebaseapp.com",
  projectId: "c-power-db",
  storageBucket: "c-power-db.firebasestorage.app",
  messagingSenderId: "869590340421",
  appId: "1:869590340421:web:f9b62b67d0b1b00cd5e42c",
  measurementId: "G-8N816X99HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [oracle, setOracle] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🌍 Side J: डेटाबेस से लाइव इतिहास (History) पढ़ना
  useEffect(() => {
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(records);
    });
    return () => unsubscribe();
  }, []);

  const launchIndiaFireworks = () => {
    const colors = ['#FF9933', '#FFFFFF', '#128807']; // तिरंगा 🇮🇳
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: colors });
  };

  const calculateSidh = async () => {
    const name = input.trim().toUpperCase();
    if (!name) return;
    setLoading(true);

    const special = ["SOURAV", "SOURAV KUSHWAHA", "SAURABH KUSHWAHA", "INDIA", "BHARAT"];
    let val = special.includes(name) ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;

    setResult(val);
    if (val === 9) launchIndiaFireworks();

    const msgs = {
      9: "सत्य: अखंड भारत की शक्ति आपके साथ है!",
      3: "सृजन: राष्ट्र निर्माण का संकल्प लें।",
      6: "ज्ञान: आप भारतीय संस्कृति के प्रतीक हैं।"
    };
    const currentOracle = msgs[val] || "खोज जारी रखें...";
    setOracle(currentOracle);

    // 💾 Side J: डेटाबेस में हमेशा के लिए सुरक्षित करना
    try {
      await addDoc(collection(db, "sidh_records"), {
        name: name,
        val: val,
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.error("Error: ", e);
    }
    setLoading(false);
  };

  return (
    <div style={styles.bg}>
      <div className="stars"></div>
      <div style={styles.ashokChakra}></div>
      
      <div style={styles.card}>
        <h1 style={styles.header}>C-POWER 2.0</h1>
        <p style={styles.sub}>SAURABH KUSHWAHA LEGACY • SIDE J</p>
        
        <input 
          style={styles.input} 
          placeholder="नाम यहाँ सिद्ध करें..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          disabled={loading}
        />
        
        <button style={styles.btn} onClick={calculateSidh} disabled={loading}>
          {loading ? 'सिद्ध हो रहा है...' : 'सिद्ध करें 🚩'}
        </button>

        {result && (
          <div style={styles.resContainer}>
            <div style={{...styles.resBox, borderColor: result === 9 ? '#FF9933' : '#128807'}}>
              <h2 style={{color: '#FFF', fontSize: '2.2rem', margin: '5px 0'}}>अंक: {result}</h2>
              <p style={styles.oracle}>"{oracle}"</p>
            </div>
          </div>
        )}

        {/* 📜 अमर इतिहास (Live History from Firebase) */}
        <div style={styles.historySection}>
          <h4 style={styles.historyTitle}>अमर इतिहास (LIVE)</h4>
          {history.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <span>{item.name}</span>
              <span style={{color: item.val === 9 ? '#FF9933' : '#128807'}}> अंक: {item.val}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stars { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000 url(https://www.transparenttextures.com/patterns/stardust.png) repeat; z-index: 0; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative', padding: '20px', overflowX: 'hidden' },
  ashokChakra: { position: 'absolute', width: '350px', height: '350px', border: '1px dashed rgba(0, 0, 128, 0.1)', borderRadius: '50%', zIndex: 0, animation: 'rotate 30s linear infinite' },
  card: { zIndex: 10, textAlign: 'center', padding: '30px 15px', border: '1px solid #333', borderRadius: '30px', backgroundColor: 'rgba(0,0,0,0.9)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(10px)' },
  header: { fontSize: '2rem', color: '#FF3131', letterSpacing: '4px', margin: 0 },
  sub: { fontSize: '0.6rem', color: '#555', letterSpacing: '2px', marginBottom: '25px' },
  input: { width: '85%', padding: '12px', borderRadius: '12px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', textAlign: 'center' },
  btn: { marginTop: '15px', padding: '12px 35px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  resContainer: { marginTop: '20px' },
  resBox: { padding: '15px', border: '2px solid', borderRadius: '20px' },
  oracle: { fontStyle: 'italic', color: '#ddd', fontSize: '0.9rem' },
  historySection: { marginTop: '30px', borderTop: '1px solid #222', paddingTop: '15px' },
  historyTitle: { fontSize: '0.7rem', color: '#555', letterSpacing: '2px', marginBottom: '10px' },
  historyItem: { fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }
};

export default App;
