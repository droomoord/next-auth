import User from "../../models/user";
import Link from "next/link";

const Verify = ({ message }) => {
  return (
    <div style={{ color: "white" }} className="center">
      <strong>{message && message}</strong>
      <p>
        <Link href={"/dashboard"}>Continue to your dashboard</Link>
      </p>
    </div>
  );
};

export default Verify;

export const getServerSideProps = async (context) => {
  try {
    const { hash, id } = context.query;
    const user = await User.findById(id).select("verified");
    if (user.verified.isVerified) {
      return {
        props: {
          message: "This email is already verified!",
        },
      };
    }
    if (user.verified.hash == hash) {
      user.verified.isVerified = true;
      await user.save();
      return {
        props: {
          message: "Thank you for verifying your email!",
        },
      };
    }
    return {
      notFound: true,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
