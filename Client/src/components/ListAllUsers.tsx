import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import deleteUser from "../services/deleteUser";

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
        // console.log("RESPONSE >>>", response);
        if (response.ok) {
          // TS: deconstruct and extract the users as an array of my User type
          const body: { users: User[] } = await response.json();
          console.log("Response.json > BODY >>>", body);
          setUsers(body.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [reloadUsers]);
  console.log("USERS >>>", users);

  const handleDelete = async (id: string) => {
    const result = await deleteUser(id);
    // ListAllusers({ reloadUsers });
    if (result) toast.success("User deleted!");
    if (!result) toast.error("Could not delete user");
  };
  return (
    <div>
      <h2>Current Users</h2>
      {users.map((user) => (
        <article key={user._id}>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </article>
      ))}
    </div>
  );
};

export default ListAllusers;
