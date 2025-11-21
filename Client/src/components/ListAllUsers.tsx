import { useEffect, useRef, useState } from "react";
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
  // Pass my custom User type
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // a ref is needed to reference an html element, only for the dialog
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchAllUsers();
      if (allUsers) setUsers(allUsers);
    };
    loadUsers();
  }, [reloadUsers]);

  const handleDelete = async (id: string) => {
    const result = await deleteUser(id);
    if (result) {
      const refreshed = await fetchAllUsers();
      if (refreshed) setUsers(refreshed);
      toast.success("User deleted!");
    } else {
      toast.error("Could not delete user");
    }
  };

  const openEditor = (user: User) => {
    setSelectedUser(user);
    dialogRef.current?.showModal(); // opens <dialog>
  };

  const closeEditor = () => {
    dialogRef.current?.close();
    setSelectedUser(null);
  };

  return (
    <section>
      <h2>Current Users</h2>

      {users.length > 0 ? (
        users.map((user) => (
          <article key={user._id}>
            <p className="user-name">
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </p>
            <p>{user.email}</p>

            <button onClick={() => handleDelete(user._id)}>Delete</button>
            <button onClick={() => openEditor(user)}>Edit</button>
          </article>
        ))
      ) : (
        <p>No existing users.</p>
      )}

      <dialog className="user-dialog" ref={dialogRef} id="editDialog">
        {selectedUser && (
          <EditUser user={selectedUser} onSubmit={closeEditor} />
        )}
      </dialog>
    </section>
  );
};

export default ListAllUsers;
