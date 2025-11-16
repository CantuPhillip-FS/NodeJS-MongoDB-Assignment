import { useEffect, useState } from "react";

const ListAllusers = () => {
  const [users, setUsers] = useState([]);

  // Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(baseUrl, { method: "GET" });
        console.log("RESPONSE >>>", response);
        if (response.ok) {
          const body = await response.json();
          console.log("BODY >>>", body);
          setUsers(body.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  console.log("USERS >>>", users);
  return (
    <div>
      <h2>Current Users</h2>
      {users.map((user) => (
        <ul>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li key={user._id}>{user.email}</li>
        </ul>
      ))}
    </div>
  );
};

export default ListAllusers;
