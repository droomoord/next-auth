import { useEffect } from "react";
import { useRouter } from "next/router";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const Verify = () => {
  const router = useRouter();
  useEffect(() => {
    const checkIfVerified = () => {
      router.replace("/dashboard");
    };
    window.addEventListener("focus", checkIfVerified);
  }, [router]);

  return (
    <div
      className="center"
      style={{
        color: "white",
        fontSize: "1.5em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <MarkEmailReadIcon color="secondary" style={{ fontSize: "1em" }} />
      <p style={{ textAlign: "center" }}>
        Please click on the link in the verification email!
      </p>
    </div>
  );
};

export default Verify;
