import WithAuth from "../HOC/withauth";
import MainLayout from "../components/layout/main";

const Dashboard = ({ user }) => {
  return (
    <MainLayout user={user}>
      <div className="center">
        <h1 style={{ color: "white" }}>Dashboard for {user.email}</h1>
      </div>
    </MainLayout>
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
