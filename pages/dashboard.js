import WithAuth from "../HOC/withauth";

import Navbar from "../components/navbar";

const Dashboard = ({ user }) => {
  if (!user.verified.isVerified) {
    return (
      <div className="center">
        <strong style={{ color: "white" }}>
          Please confirm your email first!
        </strong>
      </div>
    );
  }
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
  const { user } = context;
  return {
    props: {
      user: JSON.parse(user),
    },
  };
});
