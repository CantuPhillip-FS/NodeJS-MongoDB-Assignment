import CreateStudio from "../components/CreateStudio";
import SearchStudio from "../components/SearchStudio";
import NavBar from "../ui/NavBar";

const Studios = () => {
  return (
    <>
      <NavBar />
      <main>
        <SearchStudio />
        <CreateStudio />
      </main>
    </>
  );
};

export default Studios;
