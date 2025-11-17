import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import deleteUser from "../services/deleteUser";
import fetchAllUsers from "../services/fetchAllUsers";

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
    const fetchUsers = async () => {
      const allUsers = await fetchAllUsers();
      if (!allUsers) return "No existing users found.";
      if (allUsers) return setUsers(allUsers);
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
      {users.length > 0 ? (
        users.map((user) => (
          <article key={user._id}>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </article>
        ))
      ) : (
        <p>No existing users.</p>
      )}
    </div>
  );
};

export default ListAllusers;
