import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    let unsubscribe;

    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if the user is admin
        const userEmail = currentUser.email;
        if (userEmail === 'admin@gmail.com') {
          setIsAdmin(true);
        }

        // Update user data (e.g., last login)
        const userRef = ref(db, `users/${currentUser.uid}`);
        update(userRef, {
          lastLogin: new Date().toISOString(),
          // Add any other user data you want to update
        });
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, isAdmin };
};

export default useAuth;
