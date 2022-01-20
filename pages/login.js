import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Form from "../components/form";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import WithoutAuth from "../HOC/withoutauth";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // validate
    if (!email || !password) {
      return setMessage("Please fill out all fields");
    }
    const emailRegex = /^.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return setMessage("Please provide a valid email");
    }

    // fetch
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      const { jwt } = res.data;
      Cookies.set("jwt", jwt);
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage("Wrong username/password combination");
    }
  }

  const inputs = [
    {
      type: "email",
      name: "email",
      value: email,
      autoComplete: "email",
      onChange: setEmail,
    },
    {
      type: "password",
      name: "password",
      value: password,
      autoComplete: "current-password",
      onChange: setPassword,
    },
  ];

  return (
    <>
      <div className="center">
        {loading ? (
          <CircularProgress color="warning" />
        ) : (
          <Paper elevation={3} style={{ padding: "2em" }}>
            <Form name="Sign In" submit={submit} inputs={inputs} />
            <div>
              Don{"'"}t have an account? <Link href="/register">Sign up</Link>
            </div>
          </Paper>
        )}
      </div>
      {message && (
        <Alert
          severity="warning"
          style={{
            position: "fixed",
            top: "0",
            width: "100%",
          }}
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default Login;

export const getServerSideProps = WithoutAuth(() => {
  return {
    props: {},
  };
});
