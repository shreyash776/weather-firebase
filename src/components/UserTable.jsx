import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, update } from 'firebase/database';
import { app } from '../firebase';
// import  UserActivityTracker  from './UserActivityTracker'; // Import the UserActivityTracker component

const UserTable = ({me}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase(app);
    const usersRef = ref(database, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = [];
      for (const userId in data) {
        const user = data[userId];
        const isActive = user.isActive || false;
        userList.push({ id: userId, ...user, isActive });
      }
      setUsers(userList);
      console.log(userList);
    });

    document.onvisibilitychange = () => {
      console.log('visibility', document.hidden ? 'hidden' : 'visible');
      const myDBRef = ref(database, `users/${me.uid}`);
        update(myDBRef, { isActive: !document.hidden});
    }

    return () => {
      off(usersRef);
    };
  }, []);
 
  return (
    <div className="table-container">
      {/* <UserActivityTracker /> Include the UserActivityTracker component */}
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
