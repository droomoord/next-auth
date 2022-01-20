import WithAuth from "../HOC/withauth";
import Navbar from "../components/navbar";

const Dashboard = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="center">
        <h1 style={{ color: "white" }}>Dashboard for {user.email}</h1>
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = WithAuth((context) => {
  const user = JSON.parse(context.user);
  return {
    props: {
      user,
    },
  };
});
