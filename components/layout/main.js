import Navbar from "../../components/navbar";

const Main = ({ children, user }) => {
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
};

export default Main;
