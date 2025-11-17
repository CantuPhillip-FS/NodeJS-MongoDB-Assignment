import { useEffect, useState } from "react";

// TS: Must first define the User type otherwise it's type: never
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ListAllusers = ({ reloadUsers }: { reloadUsers: number }) => {
  // Pass my customer User type
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Use Vite's built in .env processing
    const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;
    const fetchUsers = async () => {
      try {
        const response = await fetch(baseUrl, { method: "GET" });
        console.log("RESPONSE >>>", response);
        if (response.ok) {
          // TS: deconstruct and extract the users as an array of my User type
          const body: { users: User[] } = await response.json();
          console.log("BODY >>>", body);
          setUsers(body.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [reloadUsers]);
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
