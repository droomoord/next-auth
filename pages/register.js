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

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    // validate:
    e.preventDefault();
    if (!email || !password || !password2) {
      return setMessage("Please fill out all fields");
    }
    if (password != password2) {
      return setMessage("Passwords don't match!");
    }
    const emailRegex = /^.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return setMessage("Please provide a valid email");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setMessage(
        "Passwords should have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number. Also no whitespaces!"
      );
    }

    // fetch
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/register", {
        email,
        password,
      });
      const { jwt } = res.data;
      Cookies.set("jwt", jwt);
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      setMessage("something went wrong");
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
      autoComplete: "new-password",
      onChange: setPassword,
    },
    {
      type: "password",
      name: "confirm password",
      value: password2,
      autoComplete: "new-password",
      onChange: setPassword2,
    },
  ];

  return (
    <>
      <div className="center">
        {loading ? (
          <CircularProgress color="warning" />
        ) : (
          <Paper elevation={3} style={{ padding: "2em" }}>
            <Form name="Sign Up" submit={submit} inputs={inputs} />
            <div>
              Already have an account? <Link href="/login">Log in</Link>
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

export default Register;

export const getServerSideProps = WithoutAuth(() => {
  return {
    props: {},
  };
});
