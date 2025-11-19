import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import deleteUser from "../services/deleteUser";
import fetchAllUsers from "../services/fetchAllUsers";
import EditUser from "./EditUser";

// TS: Must first define the User type otherwise it's type: never
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ListAllUsers = ({ reloadUsers }: { reloadUsers: number }) => {
  // Pass my customer User type
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState(false);

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
    if (result) {
      const fetchUsers = async () => {
        const allUsers = await fetchAllUsers();
        if (!allUsers) return "No existing users found.";
        if (allUsers) return setUsers(allUsers);
      };
      fetchUsers();
      toast.success("User deleted!");
    }
    if (!result) toast.error("Could not delete user");
  };

  const editUser = () => {
    if (!editing) return setEditing(true);
    if (editing) return setEditing(false);
  };

  return (
    <section>
      <h2>Current Users</h2>
      {/* Map Users or display message */}
      {users.length > 0 ? (
        users.map((user) => (
          <article key={user._id}>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
            <button onClick={editUser}>Edit</button>
          </article>
        ))
      ) : (
        <p>No existing users.</p>
      )}
      {editing &&
        users.map((user) => <EditUser user={user} onSubmit={editUser} />)}
    </section>
  );
};

export default ListAllUsers;
