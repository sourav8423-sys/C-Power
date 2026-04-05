import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, getCountFromServer } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC14P04-PEw4gURFZhYWXT8XGgBw1B219g",
  authDomain: "c-power-db.firebaseapp.com",
  projectId: "c-power-db",
  storageBucket: "c-power-db.firebasestorage.app",
  messagingSenderId: "869590340421",
  appId: "1:869590340421:web:f9b62b67d0b1b00cd5e42c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [totalSidhs, setTotalSidhs] = useState(0);
  const [liveFeed, setLiveFeed] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));

    // 📈 कुल सिद्धियों की गणना
    const getTotals = async () => {
      const snapshot = await getCountFromServer(collection(db, "sidh_records"));
      setTotalSidhs(snapshot.data().count);
    };
    getTotals();

    // 📜 लाइव फीड (Latest 5 Rituals)
    const q = query(collection(db, "sidh_records"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLiveFeed(snapshot.docs.map(d => d.data()));
    });
    return () => unsubscribe();
  }, []);

  const calculateSidh = async () => {
    if (!user) return alert("लॉगिन करें! 🚩");
    const name = user.displayName.toUpperCase();
    let val = (name.includes("SAURABH") || name === "INDIA") ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;
    setResult(val);
    await addDoc(collection(db, "sidh_records"), { name, val, photo: user.photoURL, timestamp: serverTimestamp() });
  };

  return (
    <div style={styles.bg}>
      <div style={styles.liveBar}>
        <span>🔥 अब तक कुल सिद्धियाँ: {totalSidhs}</span>
        <div style={styles.feedScroll}>
          {liveFeed.map((f, i) => (
            <span key={i} style={styles.feedItem}> ✨ {f.name} ({f.val === 9 ? 'सम्राट' : 'साधक'}) </span>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h1 style={styles.header}>GOD: Side D</h1>
        {!user ? (
          <button style={styles.loginBtn} onClick={() => signInWithPopup(auth, provider)}>Google प्रवेश 🔱</button>
        ) : (
          <div style={styles.profileBox}>
            <img src={user.photoURL} alt="P" style={styles.avatar} />
            <h3>प्रणाम, {user.displayName}</h3>
            <button style={styles.btn} onClick={calculateSidh}>सिद्धि जाग्रत करें 🚩</button>
          </div>
        )}
        {result && <div style={styles.resBox}>अंक: {result} | {result === 9 ? '👑 सम्राट' : '✨ साधक'}</div>}
      </div>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' },
  liveBar: { width: '100%', padding: '10px', background: 'linear-gradient(90deg, #FF3131, #FF9933)', position: 'fixed', top: 0, textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 100 },
  feedScroll: { marginTop: '5px', overflow: 'hidden', whiteSpace: 'nowrap' },
  feedItem: { marginLeft: '20px', opacity: 0.9 },
  card: { textAlign: 'center', padding: '30px', borderRadius: '30px', background: '#111', border: '1px solid #333', width: '320px' },
  header: { color: '#FF3131', letterSpacing: '3px' },
  loginBtn: { padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' },
  profileBox: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { width: '60px', borderRadius: '50%', border: '2px solid #FF3131', margin: '10px' },
  btn: { padding: '12px 30px', borderRadius: '20px', background: '#FF3131', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' },
  resBox: { marginTop: '20px', padding: '15px', border: '1px solid #FF9933', borderRadius: '15px', color: '#FFD700' }
};

export default App;
