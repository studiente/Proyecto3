
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDnQ55a2PeUzu6XBAQ4-O155WNHOvvoMCQ",
    authDomain: "formweb-b704f.firebaseapp.com",
    projectId: "formweb-b704f",
    storageBucket: "formweb-b704f.appspot.com",
    messagingSenderId: "107042748620",
    appId: "1:107042748620:web:3f2d8a0c03f4e94c1dea69",
    measurementId: "G-4C6XBQV8VV"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (product) => addDoc(collection(db, 'Productos'), product);

export const getData = (data) => onSnapshot(collection(db, 'Productos'), data);

export const remove = (id) => deleteDoc(doc(db, 'Productos', id));

export const getDocumento = (id) => getDoc(doc(db, 'Productos', id));

export const update = (id, product) => updateDoc(doc(db, 'Productos', id), product);

export const idrepetido = async (repetido) => {
    const consulta = await getDocs(query(collection(db, 'Productos'), where('productID', '==', repetido)));
    return !consulta.empty;
};
