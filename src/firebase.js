
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCx_8SefjMx9wP2iOjO16wAxY3PogWM4U0",
  authDomain: "netflex-clone-d0740.firebaseapp.com",
  projectId: "netflex-clone-d0740",
  storageBucket: "netflex-clone-d0740.appspot.com",
  messagingSenderId: "654303804073",
  appId: "1:654303804073:web:d19101cd6bfeb6126047b8"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};