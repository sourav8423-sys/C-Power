import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

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
  const [myHistory, setMyHistory] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // 📜 यूजर का व्यक्तिगत इतिहास (Archive) लोड करना
        const q = query(
          collection(db, "sidh_records"), 
          where("uid", "==", u.uid), 
          orderBy("timestamp", "desc")
        );
        onSnapshot(q, (snapshot) => {
          setMyHistory(snapshot.docs.map(d => d.data()));
        });
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const calculateSidh = async () => {
    if (!user) return;
    const name = user.displayName.toUpperCase();
    let val = (name.includes("SAURABH") || name === "INDIA") ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;
    setResult(val);
    
    // डेटाबेस में UID के साथ सुरक्षित करना
    await addDoc(collection(db, "sidh_records"), { 
      name, val, uid: user.uid, photo: user.photoURL, timestamp: serverTimestamp() 
    });
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1 style={styles.header}>GOD: Side D</h1>
        <p style={styles.sub}>THE DIVINE ARCHIVE • SAURABH KUSHWAHA</p>

        {!user ? (
          <button style={styles.loginBtn} onClick={() => signInWithPopup(auth, provider)}>Google प्रवेश 🔱</button>
        ) : (
          <div style={styles.profileSection}>
            <img src={user.photoURL} alt="P" style={styles.avatar} />
            <h3>प्रणाम, {user.displayName}</h3>
            <button style={styles.sidhBtn} onClick={calculateSidh}>सिद्धि जाग्रत करें 🚩</button>
            <button style={styles.logoutBtn} onClick={() => signOut(auth)}>प्रस्थान</button>

            <div style={styles.archiveBox}>
              <h4>📜 आपकी दिव्य यात्रा (Archive)</h4>
              <div style={styles.scrollArea}>
                {myHistory.map((item, i) => (
                  <div key={i} style={styles.archiveItem}>
                    <span>{item.val === 9 ? '👑 सम्राट' : '✨ साधक'}</span>
                    <span>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontFamily: 'Cinzel, serif' },
  card: { textAlign: 'center', padding: '30px', borderRadius: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid #333', width: '350px' },
  header: { color: '#FF3131', letterSpacing: '5px', margin: 0 },
  sub: { fontSize: '0.5rem', color: '#666', letterSpacing: '2px', marginBottom: '20px' },
  loginBtn: { padding: '15px 30px', borderRadius: '15px', border: 'none', background: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  profileSection: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { width: '80px', borderRadius: '50%', border: '2px solid #FF9933', marginBottom: '10px' },
  sidhBtn: { padding: '12px 40px', borderRadius: '50px', background: '#FF3131', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn: { background: 'none', color: '#444', border: 'none', marginTop: '10px', cursor: 'pointer', fontSize: '0.7rem' },
  archiveBox: { marginTop: '30px', width: '100%', borderTop: '1px solid #222', paddingTop: '15px' },
  scrollArea: { maxHeight: '150px', overflowY: 'auto', marginTop: '10px' },
  archiveItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', marginBottom: '5px', borderRadius: '10px', fontSize: '0.8rem' }
};

export default App;
