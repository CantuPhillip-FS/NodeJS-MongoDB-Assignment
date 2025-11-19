import toast from "react-hot-toast";
import putUpdateUser from "../services/putUpdateUser";

const EditUser = () => {
  const updateUser = async () => {
    // const id = "691b7bd769b1855cb6dcca96";
    // const body = {
    //   firstName: "Phil",
    //   lastName: "Cantu",
    //   email: "hello@phillipcantu.org",
    // };
    try {
      const response = await putUpdateUser(id, body);
      if (response) toast.success("User updated!");
    } catch (error) {
      console.log("ERROR >>>", error);
      toast.error(`User update failed: ${String(error)}`);
    }
  };
  updateUser();
  return <h2>Edit User</h2>;
};

export default EditUser;
