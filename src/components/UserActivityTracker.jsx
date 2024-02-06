import { useEffect } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const UserActivityTracker = () => {
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, 'users');

    const handleUserActivity = () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(usersRef, user.uid);
        update(userRef, {
          isActive: true,
        });
      }
    };

    const handleBeforeUnload = () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(usersRef, user.uid);
        update(userRef, {
          isActive: false,
        });
      }
    };

    const visibilityChangeListener = () => {
      if (!document.hidden) {
        handleUserActivity();
      } else {
        handleBeforeUnload();
      }
    };

    handleUserActivity();
    document.addEventListener('visibilitychange', visibilityChangeListener);

    return () => {
      handleBeforeUnload();
      document.removeEventListener('visibilitychange', visibilityChangeListener);
    };
  }, []);

  return null;
};

export default UserActivityTracker;
