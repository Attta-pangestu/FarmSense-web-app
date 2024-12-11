import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "./firebaseconfig";
  
  // Register
  export const registerUser = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Simpan data tambahan user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...userData,
        createdAt: new Date().toISOString()
      });
  
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login
  export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Logout
  export const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };