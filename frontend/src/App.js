import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

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
  const [themeColor, setThemeColor] = useState('#FF3131');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  const calculateSidh = async () => {
    if (!user) return alert("कृपया पहले दिव्य प्रवेश (Login) करें! 🚩");
    const name = user.displayName.toUpperCase();
    let val = (name.includes("SAURABH") || name === "INDIA") ? 9 : (name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 9) || 9;
    
    setResult(val);
    setThemeColor(val === 9 ? '#FF9933' : '#111');
    await addDoc(collection(db, "sidh_records"), { name, val, photo: user.photoURL, timestamp: serverTimestamp() });
  };

  return (
    <div style={{...styles.bg, backgroundColor: themeColor}}>
      <div style={styles.card}>
        <h1 style={styles.header}>GOD: Side D</h1>
        <p style={styles.sub}>GOVERNANCE • SAURABH KUSHWAHA</p>
        
        {!user ? (
          <button style={styles.loginBtn} onClick={login}>Google से दिव्य प्रवेश करें 🔱</button>
        ) : (
          <div style={styles.profileBox}>
            <img src={user.photoURL} alt="Profile" style={styles.avatar} />
            <h3>प्रणाम, {user.displayName}!</h3>
            <button style={styles.btn} onClick={calculateSidh}>अपनी सिद्धि जाग्रत करें 🚩</button>
            <button style={styles.logoutLink} onClick={logout}>प्रस्थान (Logout)</button>
          </div>
        )}

        {result && (
          <div style={styles.resBox}>
            <h2 style={{fontSize: '3rem'}}>{result}</h2>
            <p>{result === 9 ? "सम्राट पद प्राप्त! 👑" : "साधक पद प्राप्त! ✨"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  bg: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', transition: '1s' },
  card: { textAlign: 'center', padding: '40px', borderRadius: '40px', backgroundColor: 'rgba(0,0,0,0.95)', width: '350px', border: '1px solid #333' },
  header: { fontSize: '2.5rem', color: '#FF3131', letterSpacing: '4px' },
  sub: { fontSize: '0.6rem', color: '#666', marginBottom: '30px' },
  loginBtn: { padding: '15px 30px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  profileBox: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #FF3131', marginBottom: '15px' },
  btn: { padding: '12px 40px', backgroundColor: '#FF3131', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' },
  logoutLink: { marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' },
  resBox: { marginTop: '25px', padding: '20px', border: '1px solid #FF9933', borderRadius: '25px' }
};

export default App;
