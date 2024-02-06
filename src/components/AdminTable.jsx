import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth, deleteUser } from 'firebase/auth';
const AdminTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = [];
      for (const userId in data) {
        userList.push({ id: userId, ...data[userId] });
      }
      setUsers(userList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = (userId) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    remove(userRef)
      .then(() => {console.log('User data deleted successfully')
      // const auth = getAuth();
      // const user = auth.currentUser;
      // deleteUser(user, userId)
      //   .then(() => console.log('User deleted from Authentication'))
      //   .catch((error) => console.error('Error deleting user from Authentication:', error));
    })
   
      .catch((error) => console.error('Error deleting user data:', error));
  };

  return (
    <div className="table-container">
      <h2>Admin Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
